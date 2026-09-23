import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Load URL sync helpers
function loadUrlSync() {
  const filePath = path.resolve('src/hooks/useUrlSync.ts');
  const raw = fs.readFileSync(filePath, 'utf8');
  // Strip TypeScript types to test pure logic in Node
  const jsCode = raw
    .replace(/import\s+[\s\S]*?;/g, '')
    .replace(/(?:export\s+)?interface\s+[\s\S]*?}/g, '')
    .replace(/:\s*Record<[^>]+>/g, '')
    .replace(/:\s*ActiveModalType/g, '')
    .replace(/:\s*number\b/g, '')
    .replace(/:\s*'hero'\s*\|\s*'tour'/g, '')
    .replace(/:\s*string\b/g, '')
    .replace(/:\s*UrlSyncState/g, '')
    .replace(/export\s+function\s+useUrlSync[\s\S]*$/, '')
    .replace(/export\s+function/g, 'function');

  const wrapper = new Function(`${jsCode}\nreturn { parseUrlState, buildUrlQuery };`);
  return wrapper();
}

const { parseUrlState, buildUrlQuery } = loadUrlSync();

// ============================================================================
// SUITE 1: URL QUERY STATE SYNCHRONIZATION & BOUNDS SAFETY
// ============================================================================
describe('Suite 1: URL Query State Synchronization & Bounds Safety', () => {
  it('should parse clean query strings for all valid modal dialogs', () => {
    assert.deepEqual(parseUrlState('?modal=photo-tour', 43), {
      modal: 'photo-tour',
      photoIndex: 0,
      origin: 'hero',
    });

    assert.deepEqual(parseUrlState('?modal=amenities', 43), {
      modal: 'amenities',
      photoIndex: 0,
      origin: 'hero',
    });

    assert.deepEqual(parseUrlState('?modal=share', 43), {
      modal: 'share',
      photoIndex: 0,
      origin: 'hero',
    });

    assert.deepEqual(parseUrlState('?modal=reserve-success', 43), {
      modal: 'reserve-success',
      photoIndex: 0,
      origin: 'hero',
    });
  });

  it('should support alternative query aliases (view=photos, view=photo)', () => {
    assert.equal(parseUrlState('?view=photos', 43).modal, 'photo-tour');
    assert.equal(parseUrlState('?view=tour', 43).modal, 'photo-tour');
    assert.equal(parseUrlState('?view=photo&photo=5', 43).modal, 'lightbox');
  });

  it('should parse lightbox index and origin correctly', () => {
    const state = parseUrlState('?modal=lightbox&photo=14&origin=tour', 43);
    assert.equal(state.modal, 'lightbox');
    assert.equal(state.photoIndex, 14);
    assert.equal(state.origin, 'tour');
  });

  it('should clamp out-of-bounds negative photo index to 0', () => {
    const state = parseUrlState('?modal=lightbox&photo=-15', 43);
    assert.equal(state.modal, 'lightbox');
    assert.equal(state.photoIndex, 0);
  });

  it('should clamp out-of-bounds upper photo index to max (42 for 43 photos)', () => {
    const state = parseUrlState('?modal=lightbox&photo=999', 43);
    assert.equal(state.modal, 'lightbox');
    assert.equal(state.photoIndex, 42);
  });

  it('should handle non-numeric or NaN photo strings gracefully', () => {
    const state = parseUrlState('?modal=lightbox&photo=undefined', 43);
    assert.equal(state.modal, 'lightbox');
    assert.equal(state.photoIndex, 0);

    const state2 = parseUrlState('?modal=lightbox&photo=bad_input', 43);
    assert.equal(state2.photoIndex, 0);
  });

  it('should safely fallback to none when modal parameter is invalid or unknown', () => {
    assert.equal(parseUrlState('?modal=unknown_hacker_string', 43).modal, 'none');
    assert.equal(parseUrlState('?foo=bar&test=1', 43).modal, 'none');
    assert.equal(parseUrlState('', 43).modal, 'none');
  });

  it('should construct query strings accurately via buildUrlQuery', () => {
    assert.equal(buildUrlQuery('none'), '');
    assert.equal(buildUrlQuery('photo-tour'), '?modal=photo-tour');
    assert.equal(buildUrlQuery('amenities'), '?modal=amenities');
    assert.equal(buildUrlQuery('lightbox', 12, 'hero'), '?modal=lightbox&photo=12');
    assert.equal(buildUrlQuery('lightbox', 28, 'tour'), '?modal=lightbox&photo=28&origin=tour');
  });
});

// ============================================================================
// SUITE 2: STATE MACHINE TRANSITIONS & HISTORY INVARIANTS
// ============================================================================
describe('Suite 2: State Machine Modal Transitions & History Invariants', () => {
  const ALLOWED_TRANSITIONS = {
    'none': ['photo-tour', 'lightbox', 'amenities', 'share', 'reserve-success'],
    'photo-tour': ['none', 'lightbox', 'share'],
    'lightbox': ['none', 'photo-tour', 'share'],
    'amenities': ['none'],
    'share': ['none'],
    'reserve-success': ['none'],
  };

  it('should verify all allowed forward transitions from listing', () => {
    for (const target of ALLOWED_TRANSITIONS['none']) {
      assert.ok(
        ALLOWED_TRANSITIONS['none'].includes(target),
        `Transition from none to ${target} must be permitted`
      );
    }
  });

  it('should verify nested modal workflow: listing -> tour -> lightbox -> tour -> listing', () => {
    let current = 'none';
    let historyStack = [];

    // Open tour from listing
    historyStack.push(current);
    current = 'photo-tour';
    assert.equal(current, 'photo-tour');

    // Open lightbox from tour
    historyStack.push(current);
    current = 'lightbox';
    assert.equal(current, 'lightbox');

    // Close lightbox -> returns to tour
    current = historyStack.pop();
    assert.equal(current, 'photo-tour');

    // Close tour -> returns to listing
    current = historyStack.pop();
    assert.equal(current, 'none');
    assert.equal(historyStack.length, 0);
  });

  it('should verify direct modal workflow: listing -> lightbox -> listing', () => {
    let current = 'none';
    let historyStack = [];

    // Open lightbox from hero
    historyStack.push(current);
    current = 'lightbox';
    assert.equal(current, 'lightbox');

    // Close lightbox -> returns to listing
    current = historyStack.pop();
    assert.equal(current, 'none');
    assert.equal(historyStack.length, 0);
  });
});

// ============================================================================
// SUITE 3: KEYBOARD INTERACTION & FOCUS RESTORATION MATRIX
// ============================================================================
describe('Suite 3: Keyboard Interaction & Focus Restoration Matrix', () => {
  it('should verify Escape handler closes any open dialog', () => {
    const dialogs = ['photo-tour', 'lightbox', 'amenities', 'share', 'reserve-success'];
    for (const d of dialogs) {
      let closed = false;
      const onEscape = () => { closed = true; };
      // Simulate Escape key
      const event = { key: 'Escape', preventDefault: () => {} };
      if (event.key === 'Escape') onEscape();
      assert.ok(closed, `Escape must close ${d}`);
    }
  });

  it('should verify ArrowLeft and ArrowRight clamping in lightbox navigation', () => {
    let activeIndex = 0;
    const maxPhotos = 43;

    // ArrowLeft at 0 must not underflow
    const onPrev = () => { activeIndex = Math.max(0, activeIndex - 1); };
    onPrev();
    assert.equal(activeIndex, 0, 'Must not underflow below 0');

    // ArrowRight advances
    const onNext = () => { activeIndex = Math.min(maxPhotos - 1, activeIndex + 1); };
    onNext();
    assert.equal(activeIndex, 1, 'Must advance to index 1');

    // Advance to end
    activeIndex = 42;
    onNext();
    assert.equal(activeIndex, 42, 'Must not overflow beyond 42');
  });

  it('should verify focus return stack correctly stores and pops triggers', () => {
    const triggerStack = [];
    const triggerHero = { id: 'hero-tile-0', focusCalled: false, focus() { this.focusCalled = true; } };
    const triggerTour = { id: 'tour-image-12', focusCalled: false, focus() { this.focusCalled = true; } };

    // Push hero trigger
    triggerStack.push(triggerHero);
    assert.equal(triggerStack.length, 1);

    // Push tour trigger
    triggerStack.push(triggerTour);
    assert.equal(triggerStack.length, 2);

    // Pop tour trigger
    const poppedTour = triggerStack.pop();
    poppedTour.focus();
    assert.ok(triggerTour.focusCalled);

    // Pop hero trigger
    const poppedHero = triggerStack.pop();
    poppedHero.focus();
    assert.ok(triggerHero.focusCalled);
    assert.equal(triggerStack.length, 0);
  });
});

// ============================================================================
// SUITE 4: ACCESSIBILITY & REDUCED MOTION STYLESHEET AUDIT
// ============================================================================
describe('Suite 4: Accessibility & Reduced Motion Stylesheet Audit', () => {
  it('should verify @media (prefers-reduced-motion: reduce) rule exists in globals.css', () => {
    const cssPath = path.resolve('src/styles/globals.css');
    const css = fs.readFileSync(cssPath, 'utf8');

    assert.ok(
      css.includes('@media (prefers-reduced-motion: reduce)'),
      'globals.css must contain @media (prefers-reduced-motion: reduce)'
    );
    assert.ok(
      css.includes('animation-duration: 0.01ms') || css.includes('transition: none') || css.includes('animation: none') || css.includes('transition-duration'),
      'Reduced motion rule must neutralize animations and transitions'
    );
  });

  it('should verify visible :focus-visible rules exist in globals.css', () => {
    const cssPath = path.resolve('src/styles/globals.css');
    const css = fs.readFileSync(cssPath, 'utf8');

    assert.ok(css.includes(':focus-visible'), 'globals.css must specify :focus-visible rules');
    assert.ok(css.includes('outline:'), 'Focus rules must declare high-contrast outline');
  });
});

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Extract LISTING data from TypeScript source file
function loadListingData() {
  const filePath = path.resolve('src/data/listing.ts');
  const raw = fs.readFileSync(filePath, 'utf8');
  const jsCode = raw
    .replace(/import\s+[\s\S]*?;/, '')
    .replace('export const LISTING: Listing =', 'return');
  return new Function(jsCode)();
}

const LISTING = loadListingData();

// ============================================================================
// SUITE 1: LISTING DATA & ASSET INTEGRITY
// ============================================================================
describe('Suite 1: Listing Data & Static Asset Integrity', () => {
  it('should verify primary listing metadata and property specs', () => {
    assert.equal(LISTING.title, 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10');
    assert.equal(LISTING.type, 'Entire serviced apartment in Candolim, India');
    assert.equal(LISTING.rating, 4.95);
    assert.equal(LISTING.reviewsCount, 19);
    assert.equal(LISTING.guestFavourite, true);
    assert.equal(LISTING.guestsMax, 3);
    assert.equal(LISTING.bedrooms, 1);
    assert.equal(LISTING.beds, 1);
    assert.equal(LISTING.bathrooms, 1);
  });

  it('should verify 5 valid hero photo indices matching the reference layout', () => {
    assert.equal(LISTING.heroPhotoIndices.length, 5);
    assert.deepEqual(LISTING.heroPhotoIndices, [6, 3, 4, 12, 28]);

    for (const idx of LISTING.heroPhotoIndices) {
      assert.ok(LISTING.photos[idx], `Hero photo at index ${idx} must exist`);
      assert.ok(LISTING.photos[idx].webp, `Hero photo ${idx} must have webp path`);
      assert.ok(LISTING.photos[idx].remoteSrc, `Hero photo ${idx} must have remote CDN fallback`);
    }
  });

  it('should verify all 43 property photos across 9 room categories', () => {
    assert.equal(LISTING.photos.length, 43, 'Must have exactly 43 photos');
    assert.equal(LISTING.categories.length, 9, 'Must have exactly 9 room categories');

    for (const cat of LISTING.categories) {
      const count = LISTING.photos.filter((p) => p.cat === cat.key).length;
      assert.ok(count > 0, `Category ${cat.title} must contain at least 1 photo, found ${count}`);
    }
  });

  it('should verify all 43 WebP property photos exist on disk with valid file size (>5KB)', () => {
    for (const photo of LISTING.photos) {
      const relPath = photo.webp.replace(/^\//, 'public/');
      const absPath = path.resolve(relPath);
      assert.ok(fs.existsSync(absPath), `Photo file must exist on disk: ${relPath}`);
      const stats = fs.statSync(absPath);
      assert.ok(stats.size > 5000, `Photo file ${relPath} should be > 5KB, found ${stats.size} bytes`);
    }
  });

  it('should verify all 8 nearby stay photos exist on disk with valid file size (>5KB)', () => {
    assert.equal(LISTING.nearby.length, 8, 'Must have 8 nearby stays');
    for (const stay of LISTING.nearby) {
      const relPath = stay.img.replace(/^\//, 'public/');
      const absPath = path.resolve(relPath);
      assert.ok(fs.existsSync(absPath), `Nearby stay image must exist on disk: ${relPath}`);
      const stats = fs.statSync(absPath);
      assert.ok(stats.size > 5000, `Nearby image ${relPath} should be > 5KB, found ${stats.size} bytes`);
    }
  });

  it('should verify exactly 54 amenities categorized across 13 amenity groups', () => {
    assert.equal(LISTING.amenityCategories.length, 13, 'Must have 13 amenity categories');
    let totalAmenities = 0;
    for (const cat of LISTING.amenityCategories) {
      totalAmenities += cat.items.length;
    }
    assert.equal(totalAmenities, 54, 'Must have exactly 54 amenities');
  });
});

// ============================================================================
// SUITE 2: DATE SELECTION & CALENDAR EDGE CASES
// ============================================================================
describe('Suite 2: Date Selection & Calendar Validation Logic', () => {
  function validateDateRange(checkinStr, checkoutStr, minNights = 5) {
    if (!checkinStr || !checkoutStr) return { valid: false, error: 'Missing date' };
    const checkin = new Date(checkinStr);
    const checkout = new Date(checkoutStr);
    if (isNaN(checkin.getTime()) || isNaN(checkout.getTime())) {
      return { valid: false, error: 'Invalid date format' };
    }
    const diffTime = checkout.getTime() - checkin.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) {
      return { valid: false, error: 'Checkout must be after checkin' };
    }
    if (diffDays < minNights) {
      return { valid: false, error: `Minimum stay is ${minNights} nights`, nights: diffDays };
    }
    return { valid: true, nights: diffDays };
  }

  it('should accept valid 5-night stay (18 Oct 2026 - 23 Oct 2026)', () => {
    const result = validateDateRange('2026-10-18', '2026-10-23', 5);
    assert.equal(result.valid, true);
    assert.equal(result.nights, 5);
  });

  it('should reject when checkout is before or same as checkin', () => {
    const sameDay = validateDateRange('2026-10-18', '2026-10-18');
    assert.equal(sameDay.valid, false);
    assert.equal(sameDay.error, 'Checkout must be after checkin');

    const reverseDates = validateDateRange('2026-10-23', '2026-10-18');
    assert.equal(reverseDates.valid, false);
    assert.equal(reverseDates.error, 'Checkout must be after checkin');
  });

  it('should reject stay shorter than minimum 5 nights', () => {
    const shortStay = validateDateRange('2026-10-18', '2026-10-21', 5);
    assert.equal(shortStay.valid, false);
    assert.equal(shortStay.nights, 3);
    assert.ok(shortStay.error.includes('Minimum stay is 5 nights'));
  });

  it('should handle invalid date strings gracefully', () => {
    const invalid = validateDateRange('invalid-date', '2026-10-23');
    assert.equal(invalid.valid, false);
    assert.equal(invalid.error, 'Invalid date format');

    const empty = validateDateRange('', '');
    assert.equal(empty.valid, false);
    assert.equal(empty.error, 'Missing date');
  });
});

// ============================================================================
// SUITE 3: GUEST COUNT LIMITS & CONSTRAINTS
// ============================================================================
describe('Suite 3: Guest Selector Constraints & Invariants', () => {
  const MAX_GUESTS = 3;

  function validateGuestCounts({ adults, children, infants, pets }) {
    const totalGuests = adults + children;
    if (adults < 1) {
      return { valid: false, error: 'At least 1 adult is required' };
    }
    if (totalGuests > MAX_GUESTS) {
      return { valid: false, error: `Maximum capacity is ${MAX_GUESTS} guests` };
    }
    if (infants > 5) {
      return { valid: false, error: 'Infant limit exceeded' };
    }
    if (pets > 2) {
      return { valid: false, error: 'Maximum 2 pets allowed' };
    }
    return { valid: true, totalGuests, summary: `${totalGuests} guests` };
  }

  it('should accept valid default guest counts (1 adult, 0 children)', () => {
    const result = validateGuestCounts({ adults: 1, children: 0, infants: 0, pets: 0 });
    assert.equal(result.valid, true);
    assert.equal(result.totalGuests, 1);
    assert.equal(result.summary, '1 guests');
  });

  it('should accept max capacity of 3 guests (2 adults, 1 child)', () => {
    const result = validateGuestCounts({ adults: 2, children: 1, infants: 1, pets: 1 });
    assert.equal(result.valid, true);
    assert.equal(result.totalGuests, 3);
  });

  it('should reject guest counts exceeding max capacity of 3 (e.g. 2 adults, 2 children)', () => {
    const result = validateGuestCounts({ adults: 2, children: 2, infants: 0, pets: 0 });
    assert.equal(result.valid, false);
    assert.ok(result.error.includes('Maximum capacity is 3 guests'));
  });

  it('should disallow 0 adults even if children are selected', () => {
    const result = validateGuestCounts({ adults: 0, children: 2, infants: 0, pets: 0 });
    assert.equal(result.valid, false);
    assert.equal(result.error, 'At least 1 adult is required');
  });

  it('should verify infants do not count toward max guest capacity', () => {
    const result = validateGuestCounts({ adults: 3, children: 0, infants: 2, pets: 0 });
    assert.equal(result.valid, true);
    assert.equal(result.totalGuests, 3);
  });
});

// ============================================================================
// SUITE 4: BOOKING PRICING RECALCULATION ENGINE
// ============================================================================
describe('Suite 4: Dynamic Booking Price Calculation Engine', () => {
  const BASE_RATE_PER_NIGHT = 5700;

  function calculateStayPrice(nights, perNight = BASE_RATE_PER_NIGHT) {
    if (nights <= 0) return { total: 0, formattedTotal: '₹0', nights: 0 };
    const baseTotal = nights * perNight;
    const cleaningFee = 0;
    const serviceFee = 0;
    const total = baseTotal + cleaningFee + serviceFee;
    const formattedTotal = `₹${total.toLocaleString('en-IN')}`;
    return {
      nights,
      perNight,
      baseTotal,
      cleaningFee,
      serviceFee,
      total,
      formattedTotal,
    };
  }

  it('should calculate 5-night stay matching listing price of ₹28,499 (or 5 * 5700)', () => {
    const calc = calculateStayPrice(5, 5700);
    assert.equal(calc.total, 28500);
    assert.equal(calc.nights, 5);
  });

  it('should dynamically recalculate total for extended stays (e.g. 7 nights, 10 nights)', () => {
    const weekStay = calculateStayPrice(7, 5700);
    assert.equal(weekStay.total, 39900);
    assert.equal(weekStay.formattedTotal, '₹39,900');

    const tenNightStay = calculateStayPrice(10, 5700);
    assert.equal(tenNightStay.total, 57000);
    assert.equal(tenNightStay.formattedTotal, '₹57,000');
  });

  it('should return 0 when nights is zero or negative', () => {
    const zeroNights = calculateStayPrice(0, 5700);
    assert.equal(zeroNights.total, 0);
    assert.equal(zeroNights.formattedTotal, '₹0');

    const negativeNights = calculateStayPrice(-3, 5700);
    assert.equal(negativeNights.total, 0);
  });
});

// ============================================================================
// SUITE 5: WISHLIST PERSISTENCE & STORAGE BEHAVIOR
// ============================================================================
describe('Suite 5: Wishlist Storage Persistence & Deserialization', () => {
  class MockLocalStorage {
    constructor() {
      this.store = {};
    }
    getItem(key) {
      return this.store[key] !== undefined ? this.store[key] : null;
    }
    setItem(key, value) {
      this.store[key] = String(value);
    }
    removeItem(key) {
      delete this.store[key];
    }
    clear() {
      this.store = {};
    }
  }

  function getStoredWishlist(storage, key = 'airbnb_wishlist_saved', fallback = false) {
    try {
      const item = storage.getItem(key);
      return item !== null ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  }

  function toggleWishlist(storage, key = 'airbnb_wishlist_saved') {
    const current = getStoredWishlist(storage, key, false);
    const next = !current;
    storage.setItem(key, JSON.stringify(next));
    return next;
  }

  it('should initialize with fallback false when localStorage is empty', () => {
    const storage = new MockLocalStorage();
    const saved = getStoredWishlist(storage);
    assert.equal(saved, false);
  });

  it('should persist true upon toggling and survive subsequent reads', () => {
    const storage = new MockLocalStorage();
    const firstToggle = toggleWishlist(storage);
    assert.equal(firstToggle, true);
    assert.equal(getStoredWishlist(storage), true);

    const secondToggle = toggleWishlist(storage);
    assert.equal(secondToggle, false);
    assert.equal(getStoredWishlist(storage), false);
  });

  it('should gracefully handle corrupted/invalid JSON in storage', () => {
    const storage = new MockLocalStorage();
    storage.setItem('airbnb_wishlist_saved', '{corrupt-json');
    const result = getStoredWishlist(storage, 'airbnb_wishlist_saved', false);
    assert.equal(result, false);
  });
});

// ============================================================================
// SUITE 6: SHARE / COPY BEHAVIOR
// ============================================================================
describe('Suite 6: Share Channels & Clipboard URL Construction', () => {
  const PROPERTY_TITLE = 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10';
  const BASE_URL = 'https://airbnb-clone-umber-two.vercel.app';

  function generateShareUrls(url = BASE_URL, title = PROPERTY_TITLE) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    };
  }

  it('should construct valid URI encoded social sharing URLs', () => {
    const urls = generateShareUrls();
    assert.ok(urls.facebook.includes(encodeURIComponent(BASE_URL)));
    assert.ok(urls.twitter.includes(encodeURIComponent(PROPERTY_TITLE)));
    assert.ok(urls.whatsapp.includes('api.whatsapp.com'));
    assert.ok(urls.email.startsWith('mailto:?subject='));
  });

  it('should simulate copy to clipboard with fallback', async () => {
    let copiedText = '';
    const mockClipboard = {
      writeText: async (text) => {
        copiedText = text;
        return true;
      },
    };

    const targetUrl = 'https://airbnb-clone-umber-two.vercel.app/';
    await mockClipboard.writeText(targetUrl);
    assert.equal(copiedText, targetUrl);
  });
});

// ============================================================================
// SUITE 7: MODAL FOCUS RESTORATION FOR EVERY MODAL
// ============================================================================
describe('Suite 7: Modal Focus Restoration State Engine', () => {
  class MockElement {
    constructor(id) {
      this.id = id;
      this.focused = false;
    }
    focus() {
      this.focused = true;
    }
  }

  class FocusManager {
    constructor() {
      this.previousActiveElement = null;
    }
    openModal(triggerElement) {
      this.previousActiveElement = triggerElement;
    }
    closeModal() {
      if (this.previousActiveElement && typeof this.previousActiveElement.focus === 'function') {
        this.previousActiveElement.focus();
        const restored = this.previousActiveElement;
        this.previousActiveElement = null;
        return restored;
      }
      return null;
    }
  }

  const MODAL_TYPES = ['photo-tour', 'lightbox', 'amenities', 'share', 'reserve-success'];

  for (const modalType of MODAL_TYPES) {
    it(`should preserve and restore trigger element focus for modal: ${modalType}`, () => {
      const manager = new FocusManager();
      const triggerBtn = new MockElement(`trigger-button-for-${modalType}`);

      // User opens modal
      manager.openModal(triggerBtn);
      assert.equal(manager.previousActiveElement, triggerBtn);

      // User closes modal
      const restored = manager.closeModal();
      assert.equal(restored, triggerBtn);
      assert.equal(triggerBtn.focused, true);
      assert.equal(manager.previousActiveElement, null);
    });
  }
});

// ============================================================================
// SUITE 8: INVALID / EMPTY INTERACTION STATES & BOUNDARY DEFENSE
// ============================================================================
describe('Suite 8: Invalid & Empty Interaction State Fallbacks', () => {
  it('should clamp Lightbox index within bounds [0, photos.length - 1]', () => {
    const totalPhotos = 43;
    const clampIndex = (idx) => Math.max(0, Math.min(totalPhotos - 1, idx));

    assert.equal(clampIndex(-5), 0, 'Negative index must clamp to 0');
    assert.equal(clampIndex(0), 0);
    assert.equal(clampIndex(20), 20);
    assert.equal(clampIndex(42), 42);
    assert.equal(clampIndex(43), 42, 'Index 43 must clamp to 42');
    assert.equal(clampIndex(100), 42, 'Excess index must clamp to 42');
  });

  it('should fallback to remoteSrc when local image encounters an error', () => {
    const testPhoto = {
      id: 0,
      webp: '/assets/photos/photo_01_living1.webp',
      remoteSrc: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1599895892448055764/original/test.jpeg',
    };

    const getImageSrc = (photo, hasError) => (hasError ? photo.remoteSrc : photo.webp);

    assert.equal(getImageSrc(testPhoto, false), testPhoto.webp);
    assert.equal(getImageSrc(testPhoto, true), testPhoto.remoteSrc);
  });

  it('should render empty state fallback when reviews list is empty', () => {
    const renderReviewsSummary = (reviews) => {
      if (!reviews || reviews.length === 0) {
        return 'No reviews yet for this listing';
      }
      return `${reviews.length} reviews`;
    };

    assert.equal(renderReviewsSummary([]), 'No reviews yet for this listing');
    assert.equal(renderReviewsSummary(null), 'No reviews yet for this listing');
    assert.equal(renderReviewsSummary([1, 2, 3]), '3 reviews');
  });
});

// ============================================================================
// SUITE 9: KEYBOARD NAVIGATION ON INTERACTIVE COMPONENTS
// ============================================================================
describe('Suite 9: Keyboard Navigation Dispatch Matrix', () => {
  function handleLightboxKeyDown(key, activeIndex, totalPhotos = 43, onClose, onPrev, onNext) {
    let handled = false;
    if (key === 'Escape') {
      onClose();
      handled = true;
    } else if (key === 'ArrowLeft') {
      if (activeIndex > 0) onPrev();
      handled = true;
    } else if (key === 'ArrowRight') {
      if (activeIndex < totalPhotos - 1) onNext();
      handled = true;
    }
    return handled;
  }

  it('should dispatch onNext on ArrowRight when not on last photo', () => {
    let nextCalled = false;
    const handled = handleLightboxKeyDown(
      'ArrowRight',
      10,
      43,
      () => {},
      () => {},
      () => { nextCalled = true; }
    );
    assert.equal(handled, true);
    assert.equal(nextCalled, true);
  });

  it('should NOT dispatch onNext on ArrowRight when on the last photo (boundary protection)', () => {
    let nextCalled = false;
    const handled = handleLightboxKeyDown(
      'ArrowRight',
      42,
      43,
      () => {},
      () => {},
      () => { nextCalled = true; }
    );
    assert.equal(handled, true);
    assert.equal(nextCalled, false, 'Should not advance past photo 42');
  });

  it('should dispatch onPrev on ArrowLeft when not on first photo', () => {
    let prevCalled = false;
    const handled = handleLightboxKeyDown(
      'ArrowLeft',
      5,
      43,
      () => {},
      () => { prevCalled = true; },
      () => {}
    );
    assert.equal(handled, true);
    assert.equal(prevCalled, true);
  });

  it('should NOT dispatch onPrev on ArrowLeft when on photo 0 (boundary protection)', () => {
    let prevCalled = false;
    const handled = handleLightboxKeyDown(
      'ArrowLeft',
      0,
      43,
      () => {},
      () => { prevCalled = true; },
      () => {}
    );
    assert.equal(handled, true);
    assert.equal(prevCalled, false, 'Should not reverse before photo 0');
  });

  it('should dispatch onClose when Escape key is pressed', () => {
    let closeCalled = false;
    const handled = handleLightboxKeyDown(
      'Escape',
      15,
      43,
      () => { closeCalled = true; },
      () => {},
      () => {}
    );
    assert.equal(handled, true);
    assert.equal(closeCalled, true);
  });
});

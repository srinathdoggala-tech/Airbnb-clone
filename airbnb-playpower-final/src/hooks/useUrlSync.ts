import { useEffect, useRef } from 'react';
import { ActiveModalType } from '../types/listing';

export interface UrlSyncState {
  modal: ActiveModalType;
  photoIndex: number;
  origin: 'hero' | 'tour';
}

const VALID_MODALS: Record<string, ActiveModalType> = {
  'photo-tour': 'photo-tour',
  'photos': 'photo-tour',
  'tour': 'photo-tour',
  'lightbox': 'lightbox',
  'photo': 'lightbox',
  'amenities': 'amenities',
  'share': 'share',
  'reserve-success': 'reserve-success',
  'reserve': 'reserve-success',
};

/**
 * Pure function to parse URL query string into safe application state.
 * Never throws; guarantees graceful fallbacks and bounds clamping.
 */
export function parseUrlState(searchString: string, maxPhotos: number = 43): UrlSyncState {
  if (!searchString || typeof searchString !== 'string') {
    return { modal: 'none', photoIndex: 0, origin: 'hero' };
  }

  const cleanQuery = searchString.startsWith('?') ? searchString.slice(1) : searchString;
  const params = new URLSearchParams(cleanQuery);

  const rawModal = params.get('modal') || params.get('view') || '';
  const modal = VALID_MODALS[rawModal.toLowerCase()] || 'none';

  const rawPhoto = params.get('photo') || params.get('index') || '0';
  let photoIndex = parseInt(rawPhoto, 10);
  if (isNaN(photoIndex)) {
    photoIndex = 0;
  } else {
    // Clamp within valid bounds [0, maxPhotos - 1]
    photoIndex = Math.max(0, Math.min(Math.max(0, maxPhotos - 1), photoIndex));
  }

  const rawOrigin = params.get('origin') || '';
  const origin: 'hero' | 'tour' = rawOrigin.toLowerCase() === 'tour' ? 'tour' : 'hero';

  return { modal, photoIndex, origin };
}

/**
 * Pure function to construct a URL query string from state.
 */
export function buildUrlQuery(
  modal: ActiveModalType,
  photoIndex: number = 0,
  origin: 'hero' | 'tour' = 'hero'
): string {
  if (modal === 'none') {
    return '';
  }

  const params = new URLSearchParams();
  params.set('modal', modal);

  if (modal === 'lightbox') {
    params.set('photo', String(photoIndex));
    if (origin === 'tour') {
      params.set('origin', 'tour');
    }
  }

  return `?${params.toString()}`;
}

interface UseUrlSyncOptions {
  activeModal: ActiveModalType;
  lightboxIndex: number;
  lightboxOrigin: 'hero' | 'tour';
  totalPhotos: number;
  onStateChange: (state: UrlSyncState) => void;
}

/**
 * useUrlSync Hook
 * Keeps active modal & lightbox index synchronized with browser URL parameters and history.
 * Supports deep linking, browser Back/Forward (popstate), and bounds validation.
 */
export function useUrlSync({
  activeModal,
  lightboxIndex,
  lightboxOrigin,
  totalPhotos,
  onStateChange,
}: UseUrlSyncOptions) {
  const isNavigatingFromPopState = useRef(false);

  // 1. Initial Load: Read URL search parameters on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initial = parseUrlState(window.location.search, totalPhotos);
    if (initial.modal !== 'none') {
      onStateChange(initial);
    }
  }, [totalPhotos, onStateChange]);

  // 2. Synchronize React state changes -> URL pushState
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isNavigatingFromPopState.current) {
      isNavigatingFromPopState.current = false;
      return;
    }

    const currentUrlState = parseUrlState(window.location.search, totalPhotos);
    const hasChanged =
      currentUrlState.modal !== activeModal ||
      (activeModal === 'lightbox' && currentUrlState.photoIndex !== lightboxIndex) ||
      (activeModal === 'lightbox' && currentUrlState.origin !== lightboxOrigin);

    if (hasChanged) {
      const query = buildUrlQuery(activeModal, lightboxIndex, lightboxOrigin);
      const newUrl = `${window.location.pathname}${query}${window.location.hash}`;
      window.history.pushState(
        { modal: activeModal, photoIndex: lightboxIndex, origin: lightboxOrigin },
        '',
        newUrl
      );
    }
  }, [activeModal, lightboxIndex, lightboxOrigin, totalPhotos]);

  // 3. Listen to browser Back/Forward (popstate)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      isNavigatingFromPopState.current = true;
      const stateFromUrl = parseUrlState(window.location.search, totalPhotos);
      onStateChange(stateFromUrl);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [totalPhotos, onStateChange]);
}

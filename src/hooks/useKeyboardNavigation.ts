import { useEffect } from 'react';

interface KeyboardNavOptions {
  onEscape?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  isActive?: boolean;
}

/**
 * useKeyboardNavigation
 * Captures Escape, ArrowLeft, and ArrowRight keys for interactive overlays
 * and lightboxes.
 */
export function useKeyboardNavigation({
  onEscape,
  onPrev,
  onNext,
  isActive = true,
}: KeyboardNavOptions) {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          onEscape?.();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onPrev?.();
          break;
        case 'ArrowRight':
          e.preventDefault();
          onNext?.();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, onEscape, onPrev, onNext]);
}

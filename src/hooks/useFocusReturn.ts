import { useEffect, useRef } from 'react';

/**
 * useFocusReturn
 * Remembers the element that triggered an overlay modal and returns focus
 * to it upon modal dismissal.
 */
export function useFocusReturn(isOpen: boolean) {
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement | null;
    } else if (triggerRef.current) {
      // Defer focus restoration slightly to allow DOM unmount
      const elementToFocus = triggerRef.current;
      setTimeout(() => {
        if (elementToFocus && typeof elementToFocus.focus === 'function') {
          elementToFocus.focus();
        }
      }, 0);
      triggerRef.current = null;
    }
  }, [isOpen]);
}

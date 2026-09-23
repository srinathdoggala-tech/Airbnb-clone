import { useEffect, useRef } from 'react';

/**
 * useFocusReturn
 * Remembers the element that triggered an overlay modal and returns focus
 * to it upon modal dismissal.
 */
export function useFocusReturn(activeModal: string) {
  const triggerStack = useRef<HTMLElement[]>([]);
  const prevModalRef = useRef<string>('none');

  useEffect(() => {
    const prev = prevModalRef.current;
    const current = activeModal;
    prevModalRef.current = current;

    if (current !== 'none' && prev === 'none') {
      // Opening first modal: save active trigger element
      const activeEl = document.activeElement as HTMLElement | null;
      if (activeEl && activeEl !== document.body) {
        triggerStack.current.push(activeEl);
      }
    } else if (current !== 'none' && prev !== 'none' && current !== prev) {
      // Nested modal opening (e.g. tour -> lightbox)
      const activeEl = document.activeElement as HTMLElement | null;
      if (activeEl && activeEl !== document.body) {
        triggerStack.current.push(activeEl);
      }
    } else if (current === 'none' && triggerStack.current.length > 0) {
      // Fully closing modals: restore initial trigger
      const elementToFocus = triggerStack.current.pop();
      setTimeout(() => {
        if (elementToFocus && typeof elementToFocus.focus === 'function') {
          elementToFocus.focus();
        }
      }, 0);
      triggerStack.current = [];
    } else if (current !== 'none' && current === 'photo-tour' && prev === 'lightbox' && triggerStack.current.length > 1) {
      // Returning from lightbox back to photo tour
      const tourTrigger = triggerStack.current.pop();
      setTimeout(() => {
        if (tourTrigger && typeof tourTrigger.focus === 'function') {
          tourTrigger.focus();
        }
      }, 0);
    }
  }, [activeModal]);
}

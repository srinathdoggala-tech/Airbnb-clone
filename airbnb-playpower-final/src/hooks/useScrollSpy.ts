import { useState, useEffect } from 'react';
import { NavSectionType } from '../types/listing';

interface ScrollSpyOptions {
  thresholdPx?: number;
  sectionIds?: { id: string; key: NavSectionType }[];
}

/**
 * useScrollSpy
 * Tracks window scroll position to determine sticky bar visibility
 * and active section tab highlighting.
 */
export function useScrollSpy({
  thresholdPx = 520,
  sectionIds = [
    { id: 'photos', key: 'photos' },
    { id: 'amenities', key: 'amenities' },
    { id: 'reviews', key: 'reviews' },
    { id: 'location', key: 'location' },
  ],
}: ScrollSpyOptions = {}) {
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<NavSectionType>('photos');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsStickyVisible(scrollY > thresholdPx);

          // Find current active section
          const scrollPosition = scrollY + 120;
          for (let i = sectionIds.length - 1; i >= 0; i--) {
            const section = document.getElementById(sectionIds[i].id);
            if (section && section.offsetTop <= scrollPosition) {
              setActiveSection(sectionIds[i].key);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [thresholdPx, sectionIds]);

  return { isStickyVisible, activeSection };
}

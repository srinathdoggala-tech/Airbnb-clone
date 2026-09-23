import React from 'react';
import styles from './StickyNav.module.css';
import { NavSectionType, PriceInfo } from '../../types/listing';
import { StarIcon } from '../common/Icons';

interface StickyNavProps {
  isVisible: boolean;
  activeSection: NavSectionType;
  price: PriceInfo;
  rating: number;
  reviewsCount: number;
  onReserveClick: () => void;
}

export const StickyNav: React.FC<StickyNavProps> = ({
  isVisible,
  activeSection,
  price,
  rating,
  reviewsCount,
  onReserveClick,
}) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`${styles.stickyBar} ${isVisible ? styles.visible : ''}`}
      aria-label="Listing section navigation"
      aria-hidden={!isVisible}
    >
      <div className={styles.stickyInner}>
        {/* Navigation Tabs */}
        <div className={styles.tabs} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeSection === 'photos'}
            className={`${styles.tab} ${activeSection === 'photos' ? styles.activeTab : ''}`}
            onClick={() => scrollToSection('photos')}
          >
            Photos
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeSection === 'amenities'}
            className={`${styles.tab} ${activeSection === 'amenities' ? styles.activeTab : ''}`}
            onClick={() => scrollToSection('amenities')}
          >
            Amenities
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeSection === 'reviews'}
            className={`${styles.tab} ${activeSection === 'reviews' ? styles.activeTab : ''}`}
            onClick={() => scrollToSection('reviews')}
          >
            Reviews
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeSection === 'location'}
            className={`${styles.tab} ${activeSection === 'location' ? styles.activeTab : ''}`}
            onClick={() => scrollToSection('location')}
          >
            Location
          </button>
        </div>

        {/* Price & Reserve CTA */}
        <div className={styles.recap}>
          <div className={styles.priceInfo}>
            <div>
              <span className={styles.priceAmount}>{price.perNight}</span>{' '}
              <span className={styles.nightLabel}>night</span>
            </div>
            <div className={styles.ratingRecap}>
              <StarIcon size={11} fill="#222222" />
              <span>{rating.toFixed(2)} · {reviewsCount} reviews</span>
            </div>
          </div>

          <button
            type="button"
            className={styles.reserveBtn}
            onClick={onReserveClick}
            aria-label="Reserve this property"
          >
            Reserve
          </button>
        </div>
      </div>
    </nav>
  );
};

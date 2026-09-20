import React, { useState } from 'react';
import styles from './NearbyStays.module.css';
import { NearbyStay } from '../../types/listing';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '../common/Icons';

interface NearbyStaysCarouselProps {
  stays: NearbyStay[];
}

export const NearbyStaysCarousel: React.FC<NearbyStaysCarouselProps> = ({ stays }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(stays.length / itemsPerPage);

  const visibleStays = stays.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <section className={styles.nearbySection} aria-labelledby="nearby-title">
      <div className={styles.headerRow}>
        <h2 id="nearby-title" className={styles.sectionTitle}>
          Explore other options in and around Candolim
        </h2>

        <div className={styles.controls}>
          <span className={styles.pageIndicator} aria-live="polite">
            {currentPage + 1} / {totalPages}
          </span>
          <button
            type="button"
            className={styles.arrowBtn}
            onClick={handlePrev}
            disabled={currentPage === 0}
            aria-label="Previous stays"
          >
            <ChevronLeftIcon size={14} />
          </button>
          <button
            type="button"
            className={styles.arrowBtn}
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            aria-label="Next stays"
          >
            <ChevronRightIcon size={14} />
          </button>
        </div>
      </div>

      <div className={styles.carouselGrid} role="region" aria-label="Nearby property listings">
        {visibleStays.map((stay, i) => (
          <article key={i} className={styles.stayCard}>
            <div className={styles.imageWrapper}>
              <img
                src={stay.img}
                alt={stay.title}
                className={styles.stayImage}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className={styles.cardMetaRow}>
              <span className={styles.stayTitle} title={stay.title}>
                {stay.title}
              </span>
              <div className={styles.ratingGroup}>
                <StarIcon size={12} fill="#222222" />
                <span>{stay.rating}</span>
              </div>
            </div>

            <div className={styles.stayPrice}>
              <span className={styles.priceHighlight}>{stay.price}</span> night
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

import React from 'react';
import styles from './Reviews.module.css';
import { Review } from '../../types/listing';
import { StarIcon } from '../common/Icons';
import { ReviewCard } from './ReviewCard';

interface ReviewsSectionProps {
  rating: number;
  reviewsCount: number;
  reviews: Review[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  rating,
  reviewsCount,
  reviews,
}) => {
  const categories = [
    { label: 'Cleanliness', score: '4.9', percent: 98 },
    { label: 'Accuracy', score: '4.9', percent: 98 },
    { label: 'Check-in', score: '5.0', percent: 100 },
    { label: 'Communication', score: '5.0', percent: 100 },
    { label: 'Location', score: '4.8', percent: 96 },
    { label: 'Value', score: '4.8', percent: 96 },
  ];

  return (
    <section id="reviews" className={styles.reviewsSection} aria-labelledby="reviews-title">
      <div className={styles.headerRow}>
        <StarIcon size={24} fill="#222222" />
        <h2 id="reviews-title" style={{ fontSize: 'inherit', fontWeight: 'inherit', margin: 0 }}>
          {rating.toFixed(2)} · {reviewsCount} reviews
        </h2>
      </div>

      {/* Category breakdown */}
      <div className={styles.ratingsGrid} role="group" aria-label="Rating breakdown by category">
        {categories.map((c, i) => (
          <div key={i} className={styles.ratingCategoryRow}>
            <span>{c.label}</span>
            <div className={styles.ratingBarContainer}>
              <div className={styles.ratingBar} aria-hidden="true">
                <div
                  className={styles.ratingBarFill}
                  style={{ width: `${c.percent}%` }}
                />
              </div>
              <span className={styles.ratingScore}>{c.score}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Reviews list */}
      <div className={styles.reviewsGrid}>
        {reviews.map((r, i) => (
          <ReviewCard key={i} review={r} />
        ))}
      </div>
    </section>
  );
};

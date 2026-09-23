import React, { useState } from 'react';
import styles from './Reviews.module.css';
import { Review } from '../../types/listing';
import { StarIcon } from '../common/Icons';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = review.text.length > 180 || review.more;

  const displayText = !isExpanded && isLong ? `${review.text.slice(0, 160)}...` : review.text;

  return (
    <article className={styles.reviewCard} aria-label={`Review by ${review.name}`}>
      <div className={styles.reviewerRow}>
        <div className={styles.reviewerAvatar} aria-hidden="true">
          {review.name.charAt(0)}
        </div>
        <div className={styles.reviewerMeta}>
          <span className={styles.reviewerName}>{review.name}</span>
          <span className={styles.reviewerTenure}>{review.tenure}</span>
        </div>
      </div>

      <div className={styles.reviewRatingDate}>
        <div className="flex items-center gap-xs">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} size={9} fill="#222222" />
          ))}
        </div>
        <span>·</span>
        <span>{review.when}</span>
      </div>

      <p className={styles.reviewText}>{displayText}</p>

      {isLong && (
        <button
          type="button"
          className={styles.showMoreReviewBtn}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </article>
  );
};

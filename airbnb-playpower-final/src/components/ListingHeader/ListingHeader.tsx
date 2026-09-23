import React from 'react';
import styles from './ListingHeader.module.css';
import { ShareIcon, HeartIcon } from '../common/Icons';

interface ListingHeaderProps {
  title: string;
  isSaved: boolean;
  onShareClick: () => void;
  onSaveToggle: () => void;
}

export const ListingHeader: React.FC<ListingHeaderProps> = ({
  title,
  isSaved,
  onShareClick,
  onSaveToggle,
}) => {
  return (
    <section className={styles.listingHeader} aria-labelledby="listing-title">
      <div className={styles.titleRow}>
        <h1 id="listing-title" className={styles.title}>
          {title}
        </h1>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={onShareClick}
            aria-label="Share this property"
          >
            <ShareIcon size={16} />
            <span>Share</span>
          </button>

          <button
            type="button"
            className={styles.actionBtn}
            onClick={onSaveToggle}
            aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
            aria-pressed={isSaved}
          >
            <HeartIcon
              size={16}
              filled={isSaved}
              className={isSaved ? styles.savedIcon : undefined}
            />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

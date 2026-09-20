import React, { useState } from 'react';
import styles from './ListingDetails.module.css';
import { ChevronDownIcon, ChevronUpIcon } from '../common/Icons';

interface DescriptionProps {
  description: string;
}

export const Description: React.FC<DescriptionProps> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className={styles.descriptionSection} aria-label="About this space">
      <h2 className={styles.sectionTitle}>About this space</h2>

      <div
        className={`${styles.descriptionContent} ${!isExpanded ? styles.descriptionClamped : ''}`}
      >
        <p>{description}</p>
        {!isExpanded && <div className={styles.fadeOverlay} aria-hidden="true" />}
      </div>

      <button
        type="button"
        className={styles.showMoreBtn}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span>{isExpanded ? 'Show less' : 'Show more'}</span>
        {isExpanded ? <ChevronUpIcon size={14} /> : <ChevronDownIcon size={14} />}
      </button>
    </section>
  );
};

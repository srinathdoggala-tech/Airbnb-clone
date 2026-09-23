import React from 'react';
import styles from './ListingDetails.module.css';
import { Listing } from '../../types/listing';
import { LaurelWreathIcon, StarIcon } from '../common/Icons';

interface OverviewProps {
  listing: Listing;
}

export const Overview: React.FC<OverviewProps> = ({ listing }) => {
  return (
    <section className={styles.overviewSection} aria-label="Property Overview">
      <h2 className={styles.typeTitle}>{listing.type}</h2>
      <p className={styles.specsLine}>{listing.specs}</p>

      {/* Guest Favourite Laurel Badge */}
      {listing.guestFavourite && (
        <div className={styles.guestFavouriteBadge} role="region" aria-label="Guest favourite rating badge">
          <div className={styles.badgeLeft}>
            <LaurelWreathIcon size={38} className={styles.wreathIcon} />
            <div className={styles.badgeTextGroup}>
              <span className={styles.badgeTitle}>Guest favourite</span>
              <span className={styles.badgeSubtitle}>
                One of the most loved homes on Airbnb based on ratings, reviews, and reliability
              </span>
            </div>
          </div>

          <div className={styles.badgeScores}>
            <div className={styles.scoreItem}>
              <span className={styles.scoreValue}>{listing.rating.toFixed(2)}</span>
              <div className="flex items-center gap-xs">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} size={10} fill="#222222" />
                ))}
              </div>
            </div>
            <div className={styles.scoreDivider} aria-hidden="true" />
            <div className={styles.scoreItem}>
              <span className={styles.scoreValue}>{listing.reviewsCount}</span>
              <span className={styles.scoreLabel}>Reviews</span>
            </div>
          </div>
        </div>
      )}

      {/* Host Mini Profile */}
      <div className={styles.hostMiniRow}>
        <div className={styles.hostAvatar} aria-hidden="true">
          {listing.host.name.charAt(0)}
        </div>
        <div className={styles.hostDetails}>
          <span className={styles.hostName}>Hosted by {listing.host.name}</span>
          <span className={styles.hostTenure}>{listing.host.yearsHosting}</span>
        </div>
      </div>
    </section>
  );
};

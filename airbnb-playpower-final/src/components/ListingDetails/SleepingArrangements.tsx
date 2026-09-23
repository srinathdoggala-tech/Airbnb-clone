import React from 'react';
import styles from './ListingDetails.module.css';
import { BedIcon } from '../common/Icons';

export const SleepingArrangements: React.FC = () => {
  return (
    <section className={styles.sleepSection} aria-label="Where you will sleep">
      <h2 className={styles.sectionTitle}>Where you'll sleep</h2>
      <div className={styles.bedCard}>
        <BedIcon size={28} className={styles.bedCardIcon} />
        <span className={styles.bedRoomName}>Bedroom</span>
        <span className={styles.bedType}>1 double bed</span>
      </div>
    </section>
  );
};

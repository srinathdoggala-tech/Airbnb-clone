import React from 'react';
import styles from './ListingDetails.module.css';
import { JacuzziIcon, LocationPinIcon, ShieldCheckIcon, KeyIcon } from '../common/Icons';

export const Highlights: React.FC = () => {
  const highlights = [
    {
      icon: <JacuzziIcon size={24} className={styles.highlightIcon} />,
      title: 'Private Jacuzzi',
      desc: 'Unwind in your personal hot tub, perfect for relaxing after a day at the beach.',
    },
    {
      icon: <KeyIcon size={24} className={styles.highlightIcon} />,
      title: 'Self check-in',
      desc: 'Check yourself in smoothly with building staff assistance.',
    },
    {
      icon: <LocationPinIcon size={24} className={styles.highlightIcon} />,
      title: 'Great location',
      desc: '95% of recent guests gave the location a 5-star rating.',
    },
    {
      icon: <ShieldCheckIcon size={24} className={styles.highlightIcon} />,
      title: 'Experienced host',
      desc: 'Mirashya Homes has 1,463 reviews for other places.',
    },
  ];

  return (
    <section className={styles.highlightsSection} aria-label="Key highlights">
      {highlights.map((h, i) => (
        <div key={i} className={styles.highlightItem}>
          {h.icon}
          <div>
            <h3 className={styles.highlightTitle}>{h.title}</h3>
            <p className={styles.highlightDesc}>{h.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

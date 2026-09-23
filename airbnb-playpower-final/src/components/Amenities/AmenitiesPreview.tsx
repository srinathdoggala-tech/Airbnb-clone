import React from 'react';
import styles from './Amenities.module.css';
import { AmenityCategory } from '../../types/listing';
import { CheckIcon } from '../common/Icons';

interface AmenitiesPreviewProps {
  categories: AmenityCategory[];
  totalCount: number;
  onShowAllClick: () => void;
}

export const AmenitiesPreview: React.FC<AmenitiesPreviewProps> = ({
  categories,
  totalCount,
  onShowAllClick,
}) => {
  // Extract 10 prominent amenities for the preview grid
  const previewItems = [
    'Private Jacuzzi',
    'Free parking on premises',
    'Pool',
    'Wifi',
    'Kitchen',
    'Air conditioning',
    'Washing machine',
    'Dedicated workspace',
    'TV',
    'Shared gym in building',
  ];

  return (
    <section id="amenities" className={styles.amenitiesSection} aria-labelledby="amenities-title">
      <h2 id="amenities-title" className={styles.sectionTitle}>
        What this place offers
      </h2>

      <div className={styles.amenitiesGrid}>
        {previewItems.map((label, i) => (
          <div key={i} className={styles.amenityItem}>
            <CheckIcon size={18} className={styles.amenityIcon} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        className={styles.showAllBtn}
        onClick={onShowAllClick}
        aria-label={`Show all ${totalCount} amenities`}
      >
        Show all {totalCount} amenities
      </button>
    </section>
  );
};

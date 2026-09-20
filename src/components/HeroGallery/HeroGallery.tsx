import React, { useState } from 'react';
import styles from './HeroGallery.module.css';
import { Photo } from '../../types/listing';
import { GridIcon } from '../common/Icons';

interface HeroGalleryProps {
  photos: Photo[];
  heroIndices: number[];
  totalPhotosCount: number;
  onPhotoClick: (globalIndex: number) => void;
  onShowAllClick: () => void;
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({
  photos,
  heroIndices,
  totalPhotosCount,
  onPhotoClick,
  onShowAllClick,
}) => {
  // Dual-tier image fallback state
  const [imageSrcs, setImageSrcs] = useState<Record<number, string>>({});

  const handleImageError = (index: number, fallbackUrl: string) => {
    setImageSrcs((prev) => ({
      ...prev,
      [index]: fallbackUrl,
    }));
  };

  const heroPhotos = heroIndices.map((idx) => photos[idx] || photos[0]);

  return (
    <section
      id="photos"
      className={styles.galleryContainer}
      aria-label="Property photo gallery"
    >
      <div className={styles.galleryGrid}>
        {heroPhotos.map((photo, i) => {
          const globalIdx = heroIndices[i];
          const isPrimary = i === 0;
          const currentSrc = imageSrcs[globalIdx] || photo.webp;

          return (
            <button
              key={photo.id}
              type="button"
              className={`${styles.tile} ${isPrimary ? styles.tilePrimary : ''}`}
              onClick={() => onPhotoClick(globalIdx)}
              aria-label={`View photo ${i + 1} of 5: ${photo.label}`}
            >
              <img
                src={currentSrc}
                alt={photo.label}
                className={styles.tileImage}
                loading={isPrimary ? 'eager' : 'lazy'}
                decoding="async"
                onError={() => handleImageError(globalIdx, photo.remoteSrc)}
              />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className={styles.showAllBtn}
        onClick={onShowAllClick}
        aria-label={`Show all ${totalPhotosCount} photos in full-screen tour`}
      >
        <GridIcon size={14} />
        <span>Show all {totalPhotosCount} photos</span>
      </button>
    </section>
  );
};

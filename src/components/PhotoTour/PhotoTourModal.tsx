import React, { useState, useEffect } from 'react';
import styles from './PhotoTour.module.css';
import { Category, Photo } from '../../types/listing';
import { ChevronLeftIcon, ShareIcon, HeartIcon } from '../common/Icons';
import { CategoryNav } from './CategoryNav';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

interface PhotoTourModalProps {
  isOpen: boolean;
  categories: Category[];
  photos: Photo[];
  isSaved: boolean;
  onClose: () => void;
  onPhotoClick: (globalIndex: number) => void;
  onShareClick: () => void;
  onSaveToggle: () => void;
}

export const PhotoTourModal: React.FC<PhotoTourModalProps> = ({
  isOpen,
  categories,
  photos,
  isSaved,
  onClose,
  onPhotoClick,
  onShareClick,
  onSaveToggle,
}) => {
  const [activeCategoryKey, setActiveCategoryKey] = useState(categories[0]?.key || '');
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const containerRef = useFocusTrap(isOpen);
  useKeyboardNavigation({ onEscape: onClose, isActive: isOpen });

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectCategory = (key: string) => {
    setActiveCategoryKey(key);
    const element = document.getElementById(`tour-cat-${key}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div
      ref={containerRef}
      className={styles.tourOverlay}
      role="dialog"
      aria-modal="true"
      aria-label="Full property photo tour"
      tabIndex={-1}
    >
      {/* Sticky Top Header */}
      <header className={styles.tourHeader}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={onClose}
          aria-label="Back to listing page"
        >
          <ChevronLeftIcon size={16} />
          <span>Photos</span>
        </button>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={onShareClick}
            aria-label="Share property"
          >
            <ShareIcon size={16} />
            <span>Share</span>
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={onSaveToggle}
            aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <HeartIcon size={16} filled={isSaved} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </header>

      {/* Category Navigation Pills */}
      <CategoryNav
        categories={categories}
        activeKey={activeCategoryKey}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Tour Body with Room Sections */}
      <main className={styles.tourBody}>
        {categories.map((cat) => {
          const categoryPhotos = photos.filter((p) => p.cat === cat.key);
          if (categoryPhotos.length === 0) return null;

          return (
            <section
              key={cat.key}
              id={`tour-cat-${cat.key}`}
              className={styles.categorySection}
              aria-labelledby={`heading-cat-${cat.key}`}
            >
              <div className={styles.sectionHeader}>
                <h2 id={`heading-cat-${cat.key}`} className={styles.categoryTitle}>
                  {cat.title}
                </h2>
                {cat.amenities && (
                  <p className={styles.categoryAmenities}>{cat.amenities}</p>
                )}
              </div>

              <div className={styles.photoGrid}>
                {categoryPhotos.map((photo, index) => {
                  const isFeature = index === 0;
                  const useRemoteFallback = imageErrors[photo.id];
                  const imgSrc = useRemoteFallback ? photo.remoteSrc : photo.webp;

                  return (
                    <button
                      key={photo.id}
                      type="button"
                      className={`${styles.photoTile} ${
                        isFeature ? styles.featureTile : styles.pairedTile
                      }`}
                      onClick={() => onPhotoClick(photo.id)}
                      aria-label={`View full photo: ${photo.label}`}
                    >
                      <img
                        src={imgSrc}
                        alt={photo.label}
                        className={styles.tourImage}
                        loading={isFeature ? 'eager' : 'lazy'}
                        decoding="async"
                        onError={() => handleImageError(photo.id)}
                      />
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
};

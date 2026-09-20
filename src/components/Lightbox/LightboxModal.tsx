import React, { useState, useEffect } from 'react';
import styles from './Lightbox.module.css';
import { Photo } from '../../types/listing';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon, ShareIcon, HeartIcon } from '../common/Icons';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

interface LightboxModalProps {
  isOpen: boolean;
  photos: Photo[];
  activeIndex: number;
  isSaved: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onShareClick: () => void;
  onSaveToggle: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  photos,
  activeIndex,
  isSaved,
  onClose,
  onPrev,
  onNext,
  onShareClick,
  onSaveToggle,
}) => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const containerRef = useFocusTrap(isOpen);
  useKeyboardNavigation({
    onEscape: onClose,
    onPrev,
    onNext,
    isActive: isOpen,
  });

  // Lock body scroll while open
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

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[activeIndex] || photos[0];
  const isFirst = activeIndex <= 0;
  const isLast = activeIndex >= photos.length - 1;

  const useFallback = imageErrors[currentPhoto.id];
  const imageSource = useFallback ? currentPhoto.remoteSrc : currentPhoto.webp;

  return (
    <div
      ref={containerRef}
      className={styles.lightboxOverlay}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo lightbox: ${currentPhoto.label}`}
      tabIndex={-1}
    >
      {/* Top Bar */}
      <header className={styles.topBar}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close photo lightbox"
        >
          <CloseIcon size={14} />
          <span>Close</span>
        </button>

        <div className={styles.counterTitle} aria-live="polite">
          {activeIndex + 1} / {photos.length}
        </div>

        <div className={styles.topActions}>
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

      {/* Main Image Stage */}
      <main className={styles.stage}>
        {/* Previous Button */}
        <button
          type="button"
          className={styles.navArrowBtn}
          onClick={onPrev}
          disabled={isFirst}
          aria-label="Previous photo"
        >
          <ChevronLeftIcon size={20} />
        </button>

        {/* Focused Photo Viewport */}
        <div key={currentPhoto.id} className={styles.imageViewport}>
          <img
            src={imageSource}
            alt={currentPhoto.label}
            className={styles.lightboxImage}
            loading="eager"
            onError={() => setImageErrors((prev) => ({ ...prev, [currentPhoto.id]: true }))}
          />
        </div>

        {/* Next Button */}
        <button
          type="button"
          className={styles.navArrowBtn}
          onClick={onNext}
          disabled={isLast}
          aria-label="Next photo"
        >
          <ChevronRightIcon size={20} />
        </button>
      </main>
    </div>
  );
};

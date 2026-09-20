import React from 'react';
import styles from './Amenities.module.css';
import { AmenityCategory } from '../../types/listing';
import { CloseIcon, CheckIcon } from '../common/Icons';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

interface AmenitiesModalProps {
  isOpen: boolean;
  categories: AmenityCategory[];
  onClose: () => void;
}

export const AmenitiesModal: React.FC<AmenitiesModalProps> = ({
  isOpen,
  categories,
  onClose,
}) => {
  const containerRef = useFocusTrap(isOpen);
  useKeyboardNavigation({ onEscape: onClose, isActive: isOpen });

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalBackdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={containerRef}
        className={styles.modalContent}
        role="dialog"
        aria-modal="true"
        aria-labelledby="amenities-modal-title"
        tabIndex={-1}
      >
        <div className={styles.modalHeader}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close amenities dialog"
          >
            <CloseIcon size={16} />
          </button>
          <h2 id="amenities-modal-title" className={styles.categoryTitle} style={{ border: 'none', margin: 0 }}>
            What this place offers
          </h2>
          <div style={{ width: 36 }} aria-hidden="true" />
        </div>

        <div className={styles.modalBody}>
          {categories.map((cat, idx) => (
            <div key={idx} className={styles.categoryGroup}>
              <h3 className={styles.categoryTitle}>{cat.title}</h3>
              <div className={styles.categoryItems}>
                {cat.items.map((item, itemIdx) => {
                  const isAvailable = item.avail !== false;
                  const label = String(item.label);

                  return (
                    <div key={itemIdx} className={styles.modalAmenityRow}>
                      <span
                        className={`${styles.amenityLabel} ${!isAvailable ? styles.notAvailable : ''}`}
                      >
                        {label}
                      </span>
                      {isAvailable ? (
                        <CheckIcon size={16} className={styles.amenityIcon} />
                      ) : (
                        <span className={styles.badgeNotIncluded}>Not included</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

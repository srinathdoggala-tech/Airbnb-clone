import React from 'react';
import styles from './common.module.css';
import { CloseIcon, CheckIcon } from './Icons';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

interface ReservationModalProps {
  isOpen: boolean;
  title: string;
  checkinDate: string;
  checkoutDate: string;
  totalPrice: string;
  guestCountText: string;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  title,
  checkinDate,
  checkoutDate,
  totalPrice,
  guestCountText,
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
        className={styles.modalCard}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reserve-modal-title"
        tabIndex={-1}
      >
        <div className={styles.modalHeader}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close reservation dialog"
          >
            <CloseIcon size={14} />
          </button>
          <h2 id="reserve-modal-title" className={styles.modalTitle}>
            Reservation Confirmed!
          </h2>
          <div style={{ width: 32 }} aria-hidden="true" />
        </div>

        <div className={styles.modalBody}>
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                backgroundColor: '#008A05',
                color: '#FFFFFF',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}
              aria-hidden="true"
            >
              <CheckIcon size={28} />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
              You're all set for Candolim!
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>
              Your reservation request for <strong>{title}</strong> has been received by Mirashya Homes.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '14px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Dates</span>
              <strong>{checkinDate} – {checkoutDate} (5 nights)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Guests</span>
              <strong>{guestCountText}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Total amount</span>
              <strong style={{ color: 'var(--color-brand)' }}>{totalPrice}</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: 'var(--color-text-primary)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

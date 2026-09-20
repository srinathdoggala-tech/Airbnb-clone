import React from 'react';
import styles from './BookingCard.module.css';

interface DatePickerPopoverProps {
  isOpen: boolean;
  checkinDate: string;
  checkoutDate: string;
  nightsCount: number;
  onClose: () => void;
}

export const DatePickerPopover: React.FC<DatePickerPopoverProps> = ({
  isOpen,
  checkinDate,
  checkoutDate,
  nightsCount,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={styles.popover}
      role="dialog"
      aria-label="Select dates"
      style={{ padding: '20px' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 600 }}>{nightsCount} nights</h4>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          {checkinDate} - {checkoutDate}
        </p>
        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
          Minimum stay: 5 nights. Dates are confirmed for Candolim, Goa.
        </div>
      </div>

      <button
        type="button"
        className={styles.popoverCloseBtn}
        onClick={onClose}
        aria-label="Close date picker"
      >
        Close
      </button>
    </div>
  );
};

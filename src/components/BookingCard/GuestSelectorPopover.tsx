import React from 'react';
import styles from './BookingCard.module.css';
import { GuestCounts } from '../../types/listing';
import { PlusIcon, MinusIcon } from '../common/Icons';

interface GuestSelectorPopoverProps {
  isOpen: boolean;
  counts: GuestCounts;
  maxGuests: number;
  onChange: (counts: GuestCounts) => void;
  onClose: () => void;
}

export const GuestSelectorPopover: React.FC<GuestSelectorPopoverProps> = ({
  isOpen,
  counts,
  maxGuests,
  onChange,
  onClose,
}) => {
  if (!isOpen) return null;

  const totalAdultsChildren = counts.adults + counts.children;
  const canAddGuest = totalAdultsChildren < maxGuests;

  const updateCount = (type: keyof GuestCounts, delta: number) => {
    const updated = { ...counts };
    if (type === 'adults') {
      const next = updated.adults + delta;
      if (next >= 1 && (delta < 0 || canAddGuest)) {
        updated.adults = next;
      }
    } else if (type === 'children') {
      const next = updated.children + delta;
      if (next >= 0 && (delta < 0 || canAddGuest)) {
        updated.children = next;
      }
    } else if (type === 'infants') {
      const next = updated.infants + delta;
      if (next >= 0 && next <= 5) {
        updated.infants = next;
      }
    } else if (type === 'pets') {
      const next = updated.pets + delta;
      if (next >= 0 && next <= 2) {
        updated.pets = next;
      }
    }
    onChange(updated);
  };

  return (
    <div
      className={styles.popover}
      role="dialog"
      aria-label="Select number of guests"
    >
      {/* Adults */}
      <div className={styles.guestRow}>
        <div>
          <div className={styles.guestTypeTitle}>Adults</div>
          <div className={styles.guestTypeSubtitle}>Age 13+</div>
        </div>
        <div className={styles.counterGroup}>
          <button
            type="button"
            className={styles.counterBtn}
            disabled={counts.adults <= 1}
            onClick={() => updateCount('adults', -1)}
            aria-label="Decrease adults"
          >
            <MinusIcon size={12} />
          </button>
          <span className={styles.counterValue} aria-live="polite">
            {counts.adults}
          </span>
          <button
            type="button"
            className={styles.counterBtn}
            disabled={!canAddGuest}
            onClick={() => updateCount('adults', 1)}
            aria-label="Increase adults"
          >
            <PlusIcon size={12} />
          </button>
        </div>
      </div>

      {/* Children */}
      <div className={styles.guestRow}>
        <div>
          <div className={styles.guestTypeTitle}>Children</div>
          <div className={styles.guestTypeSubtitle}>Ages 2–12</div>
        </div>
        <div className={styles.counterGroup}>
          <button
            type="button"
            className={styles.counterBtn}
            disabled={counts.children <= 0}
            onClick={() => updateCount('children', -1)}
            aria-label="Decrease children"
          >
            <MinusIcon size={12} />
          </button>
          <span className={styles.counterValue} aria-live="polite">
            {counts.children}
          </span>
          <button
            type="button"
            className={styles.counterBtn}
            disabled={!canAddGuest}
            onClick={() => updateCount('children', 1)}
            aria-label="Increase children"
          >
            <PlusIcon size={12} />
          </button>
        </div>
      </div>

      {/* Infants */}
      <div className={styles.guestRow}>
        <div>
          <div className={styles.guestTypeTitle}>Infants</div>
          <div className={styles.guestTypeSubtitle}>Under 2</div>
        </div>
        <div className={styles.counterGroup}>
          <button
            type="button"
            className={styles.counterBtn}
            disabled={counts.infants <= 0}
            onClick={() => updateCount('infants', -1)}
            aria-label="Decrease infants"
          >
            <MinusIcon size={12} />
          </button>
          <span className={styles.counterValue} aria-live="polite">
            {counts.infants}
          </span>
          <button
            type="button"
            className={styles.counterBtn}
            disabled={counts.infants >= 5}
            onClick={() => updateCount('infants', 1)}
            aria-label="Increase infants"
          >
            <PlusIcon size={12} />
          </button>
        </div>
      </div>

      {/* Pets */}
      <div className={styles.guestRow}>
        <div>
          <div className={styles.guestTypeTitle}>Pets</div>
          <div className={styles.guestTypeSubtitle}>Bringing a pet?</div>
        </div>
        <div className={styles.counterGroup}>
          <button
            type="button"
            className={styles.counterBtn}
            disabled={counts.pets <= 0}
            onClick={() => updateCount('pets', -1)}
            aria-label="Decrease pets"
          >
            <MinusIcon size={12} />
          </button>
          <span className={styles.counterValue} aria-live="polite">
            {counts.pets}
          </span>
          <button
            type="button"
            className={styles.counterBtn}
            disabled={counts.pets >= 2}
            onClick={() => updateCount('pets', 1)}
            aria-label="Increase pets"
          >
            <PlusIcon size={12} />
          </button>
        </div>
      </div>

      <button
        type="button"
        className={styles.popoverCloseBtn}
        onClick={onClose}
        aria-label="Close guest selection"
      >
        Close
      </button>
    </div>
  );
};

import React, { useState } from 'react';
import styles from './BookingCard.module.css';
import { PriceInfo, GuestCounts } from '../../types/listing';
import { StarIcon, ChevronDownIcon, ChevronUpIcon } from '../common/Icons';
import { GuestSelectorPopover } from './GuestSelectorPopover';
import { DatePickerPopover } from './DatePickerPopover';
import { PricingBreakdown } from './PricingBreakdown';

interface BookingCardProps {
  price: PriceInfo;
  rating: number;
  reviewsCount: number;
  maxGuests: number;
  guestCounts: GuestCounts;
  onGuestsChange: (counts: GuestCounts) => void;
  onReserveClick: () => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  price,
  rating,
  reviewsCount,
  maxGuests,
  guestCounts,
  onGuestsChange,
  onReserveClick,
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isGuestSelectorOpen, setIsGuestSelectorOpen] = useState(false);

  const totalGuests = guestCounts.adults + guestCounts.children;
  const guestSummary = `${totalGuests} guest${totalGuests > 1 ? 's' : ''}${
    guestCounts.infants > 0 ? `, ${guestCounts.infants} infant${guestCounts.infants > 1 ? 's' : ''}` : ''
  }${guestCounts.pets > 0 ? `, ${guestCounts.pets} pet${guestCounts.pets > 1 ? 's' : ''}` : ''}`;

  return (
    <aside className={styles.cardWrapper} aria-label="Booking and reservation card">
      <div className={styles.stickyCard}>
        {/* Header: Price & Rating */}
        <div className={styles.cardHeader}>
          <div className={styles.priceGroup}>
            <span className={styles.pricePerNight}>{price.perNight}</span>
            <span className={styles.nightLabel}>night</span>
          </div>

          <div className={styles.ratingGroup}>
            <StarIcon size={12} fill="#222222" />
            <span>{rating.toFixed(2)}</span>
            <span>·</span>
            <a href="#reviews" className={styles.reviewCountLink}>
              {reviewsCount} reviews
            </a>
          </div>
        </div>

        {/* Inputs Box */}
        <div className={styles.inputsBox}>
          {/* Check-in & Checkout */}
          <div className={styles.dateRow}>
            <button
              type="button"
              className={styles.dateField}
              onClick={() => {
                setIsDatePickerOpen(!isDatePickerOpen);
                setIsGuestSelectorOpen(false);
              }}
              aria-label="Change check-in date"
            >
              <span className={styles.fieldLabel}>CHECK-IN</span>
              <span className={styles.fieldValue}>{price.checkin || '18/10/2026'}</span>
            </button>

            <button
              type="button"
              className={styles.dateField}
              onClick={() => {
                setIsDatePickerOpen(!isDatePickerOpen);
                setIsGuestSelectorOpen(false);
              }}
              aria-label="Change checkout date"
            >
              <span className={styles.fieldLabel}>CHECKOUT</span>
              <span className={styles.fieldValue}>{price.checkout || '23/10/2026'}</span>
            </button>
          </div>

          {/* Guest Selector */}
          <button
            type="button"
            className={styles.guestField}
            onClick={() => {
              setIsGuestSelectorOpen(!isGuestSelectorOpen);
              setIsDatePickerOpen(false);
            }}
            aria-label="Change number of guests"
            aria-expanded={isGuestSelectorOpen}
          >
            <div className={styles.guestFieldLeft}>
              <span className={styles.fieldLabel}>GUESTS</span>
              <span className={styles.fieldValue}>{guestSummary}</span>
            </div>
            {isGuestSelectorOpen ? <ChevronUpIcon size={14} /> : <ChevronDownIcon size={14} />}
          </button>

          {/* Popovers */}
          <DatePickerPopover
            isOpen={isDatePickerOpen}
            checkinDate={price.checkin || '18/10/2026'}
            checkoutDate={price.checkout || '23/10/2026'}
            nightsCount={price.nights}
            onClose={() => setIsDatePickerOpen(false)}
          />

          <GuestSelectorPopover
            isOpen={isGuestSelectorOpen}
            counts={guestCounts}
            maxGuests={maxGuests}
            onChange={onGuestsChange}
            onClose={() => setIsGuestSelectorOpen(false)}
          />
        </div>

        {/* Reserve CTA */}
        <button
          type="button"
          className={styles.reserveBtn}
          onClick={onReserveClick}
          aria-label="Reserve this accommodation"
        >
          Reserve
        </button>
        <p className={styles.noChargeNotice}>You won't be charged yet</p>

        {/* Pricing Breakdown */}
        <PricingBreakdown price={price} />

        {/* Cancellation disclaimer */}
        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '12px' }}>
          Free cancellation before {price.freeCancelDate}
        </div>
      </div>
    </aside>
  );
};

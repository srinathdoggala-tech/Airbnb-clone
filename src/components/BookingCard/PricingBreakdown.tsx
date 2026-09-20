import React from 'react';
import styles from './BookingCard.module.css';
import { PriceInfo } from '../../types/listing';

interface PricingBreakdownProps {
  price: PriceInfo;
}

export const PricingBreakdown: React.FC<PricingBreakdownProps> = ({ price }) => {
  return (
    <div className={styles.pricingTable}>
      <div className={styles.pricingRow}>
        <span className={styles.pricingLabelUnderline}>
          {price.perNight} x {price.nights} nights
        </span>
        <span>{price.amount}</span>
      </div>

      <div className={styles.pricingRow}>
        <span className={styles.pricingLabelUnderline}>Cleaning fee</span>
        <span>₹0</span>
      </div>

      <div className={styles.pricingRow}>
        <span className={styles.pricingLabelUnderline}>Airbnb service fee</span>
        <span>₹0</span>
      </div>

      <div className={styles.totalRow}>
        <span>Total before taxes</span>
        <span>{price.amount}</span>
      </div>
    </div>
  );
};

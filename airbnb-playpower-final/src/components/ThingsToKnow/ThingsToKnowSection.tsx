import React from 'react';
import styles from './ThingsToKnow.module.css';

export const ThingsToKnowSection: React.FC = () => {
  return (
    <section className={styles.thingsSection} aria-labelledby="things-to-know-title">
      <h2 id="things-to-know-title" className={styles.sectionTitle}>
        Things to know
      </h2>

      <div className={styles.columnsGrid}>
        {/* Column 1: House rules */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>House rules</h3>
          <p className={styles.ruleItem}>Check-in after 2:00 pm</p>
          <p className={styles.ruleItem}>Checkout before 11:00 am</p>
          <p className={styles.ruleItem}>3 guests maximum</p>
          <p className={styles.ruleItem}>Pets allowed</p>
        </div>

        {/* Column 2: Safety & property */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Safety & property</h3>
          <p className={styles.ruleItem}>Exterior security cameras on property</p>
          <p className={styles.ruleItem}>Carbon monoxide alarm not reported</p>
          <p className={styles.ruleItem}>Smoke alarm not reported</p>
        </div>

        {/* Column 3: Cancellation policy */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Cancellation policy</h3>
          <p className={styles.ruleItem}>Free cancellation before 17 October.</p>
          <p className={styles.ruleItem}>
            Review the Host's full cancellation policy which applies even if you cancel for illness or disruptions caused by COVID-19.
          </p>
        </div>
      </div>
    </section>
  );
};

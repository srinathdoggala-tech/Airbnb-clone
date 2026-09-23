import React from 'react';
import styles from './Footer.module.css';
import { GlobeIcon } from '../common/Icons';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.footerColumns}>
          <div className={styles.columnGroup}>
            <span className={styles.columnHeading}>Support</span>
            <a href="#help" className={styles.footerLink}>Help Centre</a>
            <a href="#aircover" className={styles.footerLink}>AirCover</a>
            <a href="#antidiscrimination" className={styles.footerLink}>Anti-discrimination</a>
            <a href="#disability" className={styles.footerLink}>Disability support</a>
            <a href="#cancellation" className={styles.footerLink}>Cancellation options</a>
          </div>

          <div className={styles.columnGroup}>
            <span className={styles.columnHeading}>Hosting</span>
            <a href="#host" className={styles.footerLink}>Airbnb your home</a>
            <a href="#aircover-host" className={styles.footerLink}>AirCover for Hosts</a>
            <a href="#resources" className={styles.footerLink}>Hosting resources</a>
            <a href="#community" className={styles.footerLink}>Community forum</a>
            <a href="#responsible" className={styles.footerLink}>Hosting responsibly</a>
          </div>

          <div className={styles.columnGroup}>
            <span className={styles.columnHeading}>Airbnb</span>
            <a href="#newsroom" className={styles.footerLink}>Newsroom</a>
            <a href="#features" className={styles.footerLink}>New features</a>
            <a href="#careers" className={styles.footerLink}>Careers</a>
            <a href="#investors" className={styles.footerLink}>Investors</a>
            <a href="#emergency" className={styles.footerLink}>Airbnb.org emergency stays</a>
          </div>

          <div className={styles.columnGroup}>
            <span className={styles.columnHeading}>Candolim Stays</span>
            <a href="#apartments" className={styles.footerLink}>Serviced apartments</a>
            <a href="#jacuzzi" className={styles.footerLink}>Jacuzzi stays</a>
            <a href="#beach" className={styles.footerLink}>Beachfront rentals</a>
            <a href="#goa" className={styles.footerLink}>Goa vacation homes</a>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.bottomLeft}>
            <span>© 2026 Airbnb, Inc.</span>
            <span>·</span>
            <a href="#privacy" className={styles.footerLink}>Privacy</a>
            <span>·</span>
            <a href="#terms" className={styles.footerLink}>Terms</a>
            <span>·</span>
            <a href="#sitemap" className={styles.footerLink}>Sitemap</a>
            <span>·</span>
            <a href="#company" className={styles.footerLink}>Company details</a>
          </div>

          <div className={styles.bottomRight}>
            <div className={styles.localeGroup}>
              <GlobeIcon size={16} />
              <span>English (IN)</span>
            </div>
            <div className={styles.localeGroup}>
              <span>₹ INR</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

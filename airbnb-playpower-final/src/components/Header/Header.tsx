import React from 'react';
import styles from './Header.module.css';
import { AirbnbLogo, SearchIcon, GlobeIcon, MenuIcon, UserAvatarIcon } from '../common/Icons';

interface HeaderProps {
  onSearchClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.headerInner}>
        {/* Brand Logo */}
        <a href="/" className={styles.brand} aria-label="Airbnb Home">
          <AirbnbLogo size={34} />
          <span className={styles.brandText}>airbnb</span>
        </a>

        {/* Center Search Pill */}
        <div
          className={styles.searchPill}
          onClick={onSearchClick}
          role="search"
          aria-label="Search places and dates"
        >
          <button type="button" className={styles.searchItem} aria-label="Search destinations">
            Anywhere
          </button>
          <div className={styles.searchDivider} aria-hidden="true" />
          <button type="button" className={styles.searchItem} aria-label="Search check-in and checkout week">
            Any week
          </button>
          <div className={styles.searchDivider} aria-hidden="true" />
          <button type="button" className={styles.searchItemMuted} aria-label="Add number of guests">
            Add guests
          </button>
          <div className={styles.searchBtn} aria-hidden="true">
            <SearchIcon size={14} />
          </div>
        </div>

        {/* Right User Actions */}
        <nav className={styles.userSection} aria-label="User Navigation">
          <a href="#host" className={styles.hostLink}>
            Airbnb your home
          </a>
          <button type="button" className={styles.iconBtn} aria-label="Choose a language and currency">
            <GlobeIcon size={16} />
          </button>
          <button
            type="button"
            className={styles.userMenuBtn}
            aria-label="User navigation menu"
            aria-haspopup="menu"
          >
            <MenuIcon size={16} />
            <UserAvatarIcon size={30} />
          </button>
        </nav>
      </div>
    </header>
  );
};

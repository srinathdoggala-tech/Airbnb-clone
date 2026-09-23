import React from 'react';
import styles from './PhotoTour.module.css';
import { Category } from '../../types/listing';

interface CategoryNavProps {
  categories: Category[];
  activeKey: string;
  onSelectCategory: (key: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeKey,
  onSelectCategory,
}) => {
  return (
    <nav className={styles.categoryNavStrip} aria-label="Room photo categories">
      {categories.map((cat) => {
        const isActive = cat.key === activeKey;
        return (
          <button
            key={cat.key}
            type="button"
            className={`${styles.categoryPill} ${isActive ? styles.activeCategoryPill : ''}`}
            onClick={() => onSelectCategory(cat.key)}
            aria-current={isActive ? 'true' : undefined}
          >
            {cat.title}
          </button>
        );
      })}
    </nav>
  );
};

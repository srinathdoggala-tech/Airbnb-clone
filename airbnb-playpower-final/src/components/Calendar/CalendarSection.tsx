import React from 'react';
import styles from './Calendar.module.css';

interface CalendarSectionProps {
  checkinDate: string;
  checkoutDate: string;
  nightsCount: number;
  dateRangeText: string;
  onDateSelect?: (checkin: string, checkout: string) => void;
  onClearDates?: () => void;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  nightsCount,
  dateRangeText,
  onClearDates,
}) => {
  // October 2026: starts on Thursday (day index 4: Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6), 31 days
  const octOffset = 4;
  const octDays = Array.from({ length: 31 }, (_, i) => i + 1);

  // November 2026: starts on Sunday (day index 0), 30 days
  const novOffset = 0;
  const novDays = Array.from({ length: 30 }, (_, i) => i + 1);

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Default range: Oct 18 - Oct 23
  const startDay = 18;
  const endDay = 23;

  return (
    <section className={styles.calendarSection} aria-labelledby="calendar-title">
      <h2 id="calendar-title" className={styles.calendarTitle}>
        {nightsCount} nights in Candolim
      </h2>
      <p className={styles.calendarSubtitle}>{dateRangeText}</p>

      <div className={styles.monthsContainer}>
        {/* Month 1: October 2026 */}
        <div className={styles.monthBlock} role="group" aria-label="October 2026">
          <h3 className={styles.monthHeader}>October 2026</h3>
          <div className={styles.weekdaysRow}>
            {weekdays.map((day, idx) => (
              <span key={idx} aria-hidden="true">{day}</span>
            ))}
          </div>
          <div className={styles.daysGrid} role="grid">
            {/* Empty padding cells */}
            {Array.from({ length: octOffset }).map((_, i) => (
              <div key={`oct-pad-${i}`} className={styles.emptyCell} role="gridcell" />
            ))}

            {octDays.map((day) => {
              const isStart = day === startDay;
              const isEnd = day === endDay;
              const isInRange = day > startDay && day < endDay;
              const isPast = day < 15; // illustrative past days

              let cellClasses = styles.dayCell;
              if (isStart) cellClasses += ` ${styles.selectedStart}`;
              if (isEnd) cellClasses += ` ${styles.selectedEnd}`;
              if (isInRange) cellClasses += ` ${styles.inRange}`;
              if (isPast) cellClasses += ` ${styles.disabled}`;

              return (
                <button
                  key={`oct-${day}`}
                  type="button"
                  role="gridcell"
                  disabled={isPast}
                  className={cellClasses}
                  aria-label={`October ${day}, 2026${isStart ? ', check-in date' : isEnd ? ', checkout date' : ''}`}
                >
                  <span className={styles.dayNumber}>{day}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Month 2: November 2026 */}
        <div className={styles.monthBlock} role="group" aria-label="November 2026">
          <h3 className={styles.monthHeader}>November 2026</h3>
          <div className={styles.weekdaysRow}>
            {weekdays.map((day, idx) => (
              <span key={idx} aria-hidden="true">{day}</span>
            ))}
          </div>
          <div className={styles.daysGrid} role="grid">
            {/* Empty padding cells */}
            {Array.from({ length: novOffset }).map((_, i) => (
              <div key={`nov-pad-${i}`} className={styles.emptyCell} role="gridcell" />
            ))}

            {novDays.map((day) => (
              <button
                key={`nov-${day}`}
                type="button"
                role="gridcell"
                className={styles.dayCell}
                aria-label={`November ${day}, 2026`}
              >
                <span className={styles.dayNumber}>{day}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.calendarFooter}>
        <button
          type="button"
          className={styles.clearBtn}
          onClick={onClearDates}
          aria-label="Clear selected date range"
        >
          Clear dates
        </button>
      </div>
    </section>
  );
};

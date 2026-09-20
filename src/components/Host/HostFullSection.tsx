import React from 'react';
import styles from './Host.module.css';
import { HostInfo } from '../../types/listing';
import { ShieldCheckIcon } from '../common/Icons';

interface HostFullSectionProps {
  host: HostInfo;
}

export const HostFullSection: React.FC<HostFullSectionProps> = ({ host }) => {
  return (
    <section id="host" className={styles.hostSection} aria-labelledby="host-section-title">
      <h2 id="host-section-title" className={styles.sectionTitle}>
        Meet your host
      </h2>

      <div className={styles.hostGrid}>
        {/* Host Profile Card */}
        <div className={styles.hostCard} role="region" aria-label="Host identity card">
          <div className={styles.avatarLarge} aria-hidden="true">
            {host.name.charAt(0)}
          </div>
          <h3 className={styles.hostCardName}>{host.name}</h3>
          <span className={styles.superhostBadge}>Superhost · {host.yearsHosting}</span>

          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statVal}>{host.stats.reviews}</span>
              <span className={styles.statLbl}>Reviews</span>
            </div>
            <div className={styles.statDivider} aria-hidden="true" />
            <div className={styles.statItem}>
              <span className={styles.statVal}>{host.stats.rating}</span>
              <span className={styles.statLbl}>Rating</span>
            </div>
            <div className={styles.statDivider} aria-hidden="true" />
            <div className={styles.statItem}>
              <span className={styles.statVal}>{host.stats.years}</span>
              <span className={styles.statLbl}>Years hosting</span>
            </div>
          </div>
        </div>

        {/* Host Bio & Co-hosts */}
        <div className={styles.hostInfoCol}>
          <div className={styles.factsList}>
            {host.facts.map((fact, i) => (
              <div key={i} className={styles.factItem}>
                {fact}
              </div>
            ))}
          </div>

          <div className={styles.detailsList}>
            {host.details.map((det, i) => (
              <div key={i}>{det}</div>
            ))}
          </div>

          {/* Co-hosts */}
          {host.coHosts.length > 0 && (
            <div className={styles.coHostsGroup}>
              <h4 className={styles.coHostsTitle}>Co-hosts</h4>
              <div className={styles.coHostsAvatars}>
                {host.coHosts.map((coHost, i) => (
                  <div key={i} className={styles.coHostItem}>
                    <div className={styles.coHostAvatar} aria-hidden="true">
                      {coHost.avatar}
                    </div>
                    <span>{coHost.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            <ShieldCheckIcon size={20} />
            <span>To protect your payment, never transfer money or communicate outside of the Airbnb website or app.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

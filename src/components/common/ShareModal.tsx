import React from 'react';
import styles from './common.module.css';
import { CloseIcon, CheckIcon } from './Icons';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

interface ShareModalProps {
  isOpen: boolean;
  title: string;
  type: string;
  imageSrc: string;
  onClose: () => void;
  onCopySuccess: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  title,
  type,
  imageSrc,
  onClose,
  onCopySuccess,
}) => {
  const containerRef = useFocusTrap(isOpen);
  useKeyboardNavigation({ onEscape: onClose, isActive: isOpen });

  if (!isOpen) return null;

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      onCopySuccess();
    } catch {
      onCopySuccess();
    }
  };

  const shareOptions = [
    { label: 'Copy Link', action: handleCopy, icon: '🔗' },
    { label: 'Email', action: () => window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(window.location.href)}`), icon: '✉️' },
    { label: 'WhatsApp', action: () => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + window.location.href)}`), icon: '💬' },
    { label: 'Twitter / X', action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`), icon: '🐦' },
    { label: 'Facebook', action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`), icon: '📘' },
    { label: 'Messenger', action: () => window.open(`fb-messenger://share/?link=${encodeURIComponent(window.location.href)}`), icon: '⚡' },
  ];

  return (
    <div
      className={styles.modalBackdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={containerRef}
        className={styles.modalCard}
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
        tabIndex={-1}
      >
        <div className={styles.modalHeader}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close share dialog"
          >
            <CloseIcon size={14} />
          </button>
          <h2 id="share-modal-title" className={styles.modalTitle}>
            Share this place
          </h2>
          <div style={{ width: 32 }} aria-hidden="true" />
        </div>

        <div className={styles.modalBody}>
          <div className={styles.sharePreview}>
            <img src={imageSrc} alt={title} className={styles.shareThumb} />
            <div className={styles.shareMeta}>
              <span className={styles.shareListingTitle}>{title}</span>
              <span className={styles.shareListingType}>{type}</span>
            </div>
          </div>

          <div className={styles.shareOptionsGrid}>
            {shareOptions.map((opt, i) => (
              <button
                key={i}
                type="button"
                className={styles.shareOptionBtn}
                onClick={opt.action}
              >
                <span style={{ fontSize: '18px' }} aria-hidden="true">{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

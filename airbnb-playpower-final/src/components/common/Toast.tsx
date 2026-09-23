import React, { useEffect } from 'react';
import styles from './common.module.css';
import { CheckIcon } from './Icons';

interface ToastProps {
  message: string | null;
  onClear: () => void;
  durationMs?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  onClear,
  durationMs = 2800,
}) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClear, durationMs);
    return () => clearTimeout(timer);
  }, [message, onClear, durationMs]);

  if (!message) return null;

  return (
    <div className={styles.toast} role="status" aria-live="polite">
      <CheckIcon size={16} />
      <span>{message}</span>
    </div>
  );
};

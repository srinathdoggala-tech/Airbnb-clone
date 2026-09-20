import React, { useState, useEffect } from 'react';

export default function ShareModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add('_pINcte');
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.classList.remove('_pINcte');
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://airbnb-clone-umber-two.vercel.app/';
  const title = 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10';

  const handleCopyLink = () => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(currentUrl);
      }
    } catch {
      // Fallback
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareOptions = [
    {
      name: copied ? 'Link copied!' : 'Copy Link',
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', height: '24px', width: '24px', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }}>
          <path d="M12 10H8a6 6 0 0 0 0 12h4m8-12h4a6 6 0 0 1 0 12h-4m-10-6h12" />
        </svg>
      ),
      action: handleCopyLink,
      highlight: copied
    },
    {
      name: 'Email',
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', height: '24px', width: '24px', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }}>
          <rect x="2" y="5" width="28" height="22" rx="4" />
          <path d="M2 9l14 10L30 9" />
        </svg>
      ),
      action: () => {
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(currentUrl)}`);
      }
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }}>
          <path d="M16 2a13.9 13.9 0 0 0-12 21l-1.9 6.9 7.1-1.9A14 14 0 1 0 16 2zm6.9 19.8c-.3.8-1.7 1.6-2.4 1.7-.6.1-1.4.2-4.5-1.1a16.2 16.2 0 0 1-7-6.2c-.8-1.1-1.4-2.4-1.4-3.8 0-1.5.8-2.2 1.1-2.5.3-.3.6-.4.9-.4h.7c.2 0 .5 0 .7.6.3.7.9 2.3 1 2.5.1.2.1.4 0 .6-.1.2-.2.4-.4.6-.2.2-.4.4-.6.6-.2.2-.4.4-.2.8.3.5.7 1.2 1.4 1.8 1 1 2 1.5 2.6 1.8.3.2.6.2.8 0 .3-.3 1-1.2 1.3-1.6.3-.4.6-.3.9-.2.4.1 2.3 1.1 2.7 1.3.4.2.7.3.8.5.1.2.1 1.2-.2 2z" />
        </svg>
      ),
      action: () => {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this place on Airbnb: ${currentUrl}`)}`, '_blank');
      }
    },
    {
      name: 'Messenger',
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }}>
          <path d="M16 2C8.3 2 2 7.8 2 15c0 4.1 2 7.7 5.2 10v5l4.8-2.6c1.3.4 2.6.6 4 .6 7.7 0 14-5.8 14-13S23.7 2 16 2zm1.4 17.5l-3.6-3.8-7 3.8 7.7-8.2 3.6 3.8 6.9-3.8-7.6 8.2z" />
        </svg>
      ),
      action: () => {
        window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(currentUrl)}&app_id=292706998438&redirect_uri=${encodeURIComponent(currentUrl)}`, '_blank');
      }
    },
    {
      name: 'Facebook',
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }}>
          <path d="M29 0H3C1.3 0 0 1.3 0 3v26c0 1.7 1.3 3 3 3h13V19.6h-4.2v-4.9H16v-3.6c0-4.1 2.5-6.4 6.2-6.4 1.8 0 3.3.1 3.7.2v4.3h-2.6c-2 0-2.4 1-2.4 2.4v3.1h4.8l-.6 4.9h-4.2V32h8.1c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z" />
        </svg>
      ),
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
      }
    },
    {
      name: 'Twitter',
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      action: () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this place on Airbnb: ${title}`)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
      }
    },
    {
      name: 'Messages',
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', height: '24px', width: '24px', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }}>
          <path d="M4 6h24a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H10l-6 5V8a2 2 0 0 1 2-2z" />
        </svg>
      ),
      action: () => {
        window.open(`sms:?&body=${encodeURIComponent(`Check out this place on Airbnb: ${currentUrl}`)}`);
      }
    },
    {
      name: 'Embed code',
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', height: '24px', width: '24px', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }}>
          <path d="M10 9L3 16l7 7M22 9l7 7-7 7M18 5l-4 22" />
        </svg>
      ),
      action: () => {
        const embed = `<iframe src="${currentUrl}" width="600" height="400" frameborder="0"></iframe>`;
        if (navigator.clipboard) navigator.clipboard.writeText(embed);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  ];

  return (
    <div className={`_yBjuYG ${isOpen ? '_PjnNJs' : ''}`} id="shareModal" aria-hidden={!isOpen} onClick={onClose}>
      <div
        className="_mdAcnz"
        style={{ maxWidth: '568px', width: '100%', borderRadius: '16px' }}
        role="dialog"
        aria-modal="true"
        aria-label="Share this place"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="_zwFSmY" style={{ borderBottom: '1px solid var(--line-soft)', position: 'relative' }}>
          <button
            className="_bNHEUf _cqnRCd"
            type="button"
            aria-label="Close"
            onClick={onClose}
            style={{ position: 'absolute', left: '20px' }}
          >
            <span>
              <svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '16px', width: '16px', fill: 'none', stroke: 'currentColor', strokeWidth: '3' }}>
                <path d="m6 6 20 20M26 6 6 26" />
              </svg>
            </span>
          </button>
          <div style={{ width: '100%', textAlign: 'center', fontSize: '16px', fontWeight: 600 }}>
            Share this place
          </div>
        </div>

        <div style={{ padding: '24px', overflowY: 'auto' }}>
          {/* Listing summary preview card */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '12px',
              border: '1px solid var(--line)',
              borderRadius: '12px',
              marginBottom: '24px',
              background: '#fff'
            }}
          >
            <img
              src="/assets/photos/photo_07_living2.webp"
              alt="Romantic Jacuzzi 1BHK Candolim"
              style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover' }}
            />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '15px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                Romantic Jacuzzi 1BHK Candolim | Mirashya UG10
              </div>
              <div style={{ fontSize: '13px', color: 'var(--muted2)', marginTop: '2px' }}>
                ★ 4.95 · 19 reviews · Candolim, Goa, India
              </div>
            </div>
          </div>

          {/* Share options grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {shareOptions.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={opt.action}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 16px',
                  border: '1px solid var(--line)',
                  borderRadius: '12px',
                  background: opt.highlight ? 'var(--grey100)' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: opt.highlight ? 'var(--rausch)' : 'var(--ink)',
                  transition: 'background .15s ease, border-color .15s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--grey100)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = opt.highlight ? 'var(--grey100)' : '#fff'; }}
              >
                <span style={{ display: 'flex', alignItems: 'center', color: opt.highlight ? 'var(--rausch)' : 'var(--ink)' }}>
                  {opt.icon}
                </span>
                <span>{opt.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

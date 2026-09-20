import React, { useState } from 'react';
import styles from './Location.module.css';
import { PlusIcon, MinusIcon } from '../common/Icons';

export const LocationSection: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.25, 2));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.25, 0.75));

  return (
    <section id="location" className={styles.locationSection} aria-labelledby="location-title">
      <h2 id="location-title" className={styles.sectionTitle}>
        Where you'll be
      </h2>
      <p className={styles.locationSubtitle}>Candolim, Goa, India</p>

      {/* Styled Interactive Map */}
      <div className={styles.mapContainer} role="region" aria-label="Map showing property location">
        <svg
          className={styles.mapSvg}
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
          style={{ transform: `scale(${zoomLevel})`, transition: 'transform 250ms ease-out' }}
          aria-hidden="true"
        >
          {/* Background Land */}
          <rect width="1000" height="500" fill="#F4F3F0" />

          {/* Water Area (Arabian Sea on Left) */}
          <path
            d="M0 0 L240 0 C220 120 280 220 250 340 C230 420 270 470 290 500 L0 500 Z"
            fill="#C5E8F8"
          />

          {/* Green Parks / Coastal Reserve */}
          <path
            d="M260 80 Q320 60 360 120 Q310 180 260 140 Z"
            fill="#D9ECD0"
          />
          <path
            d="M620 240 Q700 200 780 280 Q710 360 630 310 Z"
            fill="#D9ECD0"
          />

          {/* Major Highway / Roads */}
          <path
            d="M240 0 Q320 200 350 500"
            stroke="#FFFFFF"
            strokeWidth="12"
            fill="none"
          />
          <path
            d="M240 0 Q320 200 350 500"
            stroke="#F9D976"
            strokeWidth="6"
            fill="none"
          />

          {/* Secondary Arteries */}
          <path
            d="M320 180 L800 120"
            stroke="#FFFFFF"
            strokeWidth="8"
            fill="none"
          />
          <path
            d="M340 320 L950 360"
            stroke="#FFFFFF"
            strokeWidth="8"
            fill="none"
          />
          <path
            d="M500 0 L500 500"
            stroke="#FFFFFF"
            strokeWidth="6"
            fill="none"
          />

          {/* Road Labels */}
          <text x="70" y="240" fill="#4A90E2" fontSize="14" fontWeight="600" fontFamily="sans-serif">
            Arabian Sea
          </text>
          <text x="260" y="200" fill="#555555" fontSize="12" fontWeight="500" fontFamily="sans-serif">
            Candolim Beach Rd
          </text>
          <text x="440" y="110" fill="#666666" fontSize="11" fontFamily="sans-serif">
            Aguada - Siolim Rd
          </text>
        </svg>

        {/* Pin Marker */}
        <div className={styles.markerPin}>
          <div className={styles.pinBubble}>
            <span>Romantic Jacuzzi 1BHK</span>
          </div>
          <div className={styles.pinDot} />
        </div>

        {/* Zoom Controls */}
        <div className={styles.mapControls}>
          <button
            type="button"
            className={styles.mapControlBtn}
            onClick={handleZoomIn}
            aria-label="Zoom in on map"
          >
            <PlusIcon size={14} />
          </button>
          <button
            type="button"
            className={styles.mapControlBtn}
            onClick={handleZoomOut}
            aria-label="Zoom out on map"
          >
            <MinusIcon size={14} />
          </button>
        </div>
      </div>

      <p className={styles.neighborhoodText}>
        Candolim is one of Goa's most beloved coastal neighborhoods, offering a serene blend of tranquil beaches, water sports, vibrant local shacks, and celebrated cafes. Historic Fort Aguada and Sinquerim Beach are just minutes away, making it an ideal retreat for relaxation and exploration.
      </p>
    </section>
  );
};

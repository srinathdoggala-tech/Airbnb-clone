import React from 'react';

export default function ListingHeader({ onShare, onToggleSave, isSaved }) {
  return (
    <section className="_DbxOEt" id="photos">
      <h1 className="_WQsVLm">Romantic Jacuzzi 1BHK Candolim | Mirashya UG10</h1>
      <div className="_aZSeca">
        <button className="_EmrQRK" type="button" id="shareBtn" onClick={onShare}>
          <span className="_oQmVpq">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '100%', width: '100%', fill: 'none', stroke: 'currentColor', strokeWidth: '2', overflow: 'visible' }}>
              <path d="m27 18v9c0 1.1046-.8954 2-2 2h-18c-1.10457 0-2-.8954-2-2v-9m11-15v21m-10-11 9.2929-9.29289c.3905-.39053 1.0237-.39053 1.4142 0l9.2929 9.29289" fill="none" />
            </svg>
          </span>
          <span className="_uOQIyx">Share</span>
        </button>
        <button
          className={`_EmrQRK ${isSaved ? '_nfavct' : ''}`}
          type="button"
          id="saveBtn"
          onClick={onToggleSave}
        >
          <span className="_oQmVpq">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: 'block',
                height: '100%',
                width: '100%',
                fill: isSaved ? '#ff385c' : 'none',
                stroke: isSaved ? '#ff385c' : 'currentColor',
                strokeWidth: '2',
                overflow: 'visible',
                transition: 'fill .2s ease, stroke .2s ease'
              }}
            >
              <path d="m15.9998 28.6668c7.1667-4.8847 14.3334-10.8844 14.3334-18.1088 0-1.84951-.6993-3.69794-2.0988-5.10877-1.3996-1.4098-3.2332-2.11573-5.0679-2.11573-1.8336 0-3.6683.70593-5.0668 2.11573l-2.0999 2.11677-2.0988-2.11677c-1.3995-1.4098-3.2332-2.11573-5.06783-2.11573-1.83364 0-3.66831.70593-5.06683 2.11573-1.39955 1.41083-2.09984 3.25926-2.09984 5.10877 0 7.2244 7.16667 13.2241 14.3333 18.1088z" />
            </svg>
          </span>
          <span className="_uOQIyx">{isSaved ? 'Saved' : 'Save'}</span>
        </button>
      </div>
    </section>
  );
}

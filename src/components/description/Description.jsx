import React, { useState } from 'react';

export default function Description() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="_YidPyi" style={{ borderTop: '1px solid var(--line-soft)' }}>
      <div className="_yWMtoE">
        <span>Some info has been automatically translated. <a href="#original" onClick={(e) => e.preventDefault()}>Show original</a></span>
      </div>
      <p id="descText" className={isExpanded ? '' : '_kfKUOt'}>
        🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it’s ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴
      </p>
      <button className="_yWwrkC" id="descMore" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Show less' : 'Show more'}{' '}
        <span className="_VUbbfz">
          <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{ display: 'block', height: '100%', width: '100%', fill: 'currentColor' }}>
            <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fillRule="evenodd" />
          </svg>
        </span>
      </button>
    </div>
  );
}

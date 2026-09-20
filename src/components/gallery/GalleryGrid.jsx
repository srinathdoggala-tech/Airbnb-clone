import React from 'react';

export default function GalleryGrid({ onPhotoClick, onShowAllPhotos }) {
  return (
    <section className="_Zndiww" id="_Zndiww" aria-label="Photos of this place">
      <div className="_DPzomV" id="heroGrid">
        <button className="_toiEJx" type="button" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 1" onClick={() => onPhotoClick(6)}>
          <img src="/assets/photos/photo_07_living2.webp" alt="" decoding="async" loading="eager" />
        </button>
        <button className="_toiEJx" type="button" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 2" onClick={() => onPhotoClick(3)}>
          <img src="/assets/photos/photo_04_living2.webp" alt="" decoding="async" loading="lazy" />
        </button>
        <button className="_toiEJx" type="button" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 3" onClick={() => onPhotoClick(4)}>
          <img src="/assets/photos/photo_05_living2.webp" alt="" decoding="async" loading="lazy" />
        </button>
        <button className="_toiEJx" type="button" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 4" onClick={() => onPhotoClick(12)}>
          <img src="/assets/photos/photo_13_bedroom.webp" alt="" decoding="async" loading="lazy" />
        </button>
        <button className="_toiEJx" type="button" aria-label="Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 image 5" onClick={() => onPhotoClick(28)}>
          <img src="/assets/photos/photo_29_exterior.webp" alt="" decoding="async" loading="lazy" />
        </button>
      </div>
      <button className="_ujAXFb" type="button" id="showAllPhotos" onClick={onShowAllPhotos}>
        <span className="_Ljuvbv">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '100%', width: '100%', fill: 'currentColor' }}>
            <path fillRule="evenodd" d="M3 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"></path>
          </svg>
        </span> Show all photos
      </button>
    </section>
  );
}

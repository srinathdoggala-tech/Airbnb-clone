import React, { useState, useRef } from 'react';

const stays = [
  {
    title: 'Beautiful Studio with a view to die for',
    price: '₹23,600',
    rating: '4.91',
    img: '/assets/images/similar/s1.jpeg'
  },
  {
    title: 'NAQAB - 1bhk with private pool',
    price: '₹42,218',
    rating: '4.95',
    img: '/assets/images/similar/s2.jpeg'
  },
  {
    title: 'Greentique Luxury Flat with plunge pool, Calangute',
    price: '₹44,506',
    rating: '4.94',
    img: '/assets/images/similar/s3.jpeg'
  },
  {
    title: 'The Tropical Studio | 5 mins to Beach',
    price: '₹22,824',
    rating: '4.96',
    img: '/assets/images/similar/s4.jpeg'
  },
  {
    title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute',
    price: '₹39,942',
    rating: '4.95',
    img: '/assets/images/similar/s5.jpeg'
  },
  {
    title: 'Kanso by Earthen Window | Jacuzzi | Terrace | Pool',
    price: '₹45,648',
    rating: '5.0',
    img: '/assets/images/similar/s6.jpeg'
  },
  {
    title: 'Luxury Apt | Private Pool | 6 Mins from Beach',
    price: '₹48,786',
    rating: '4.93',
    img: '/assets/images/similar/s2.jpeg'
  },
  {
    title: 'Serendipity Cottage - Calm Stay in Calangute-Baga.',
    price: '₹22,824',
    rating: '4.92',
    img: '/assets/images/similar/s4.jpeg'
  }
];

export default function NearbyStays() {
  const [currentPage, setCurrentPage] = useState(1);
  const trackRef = useRef(null);

  const handlePrev = () => {
    if (trackRef.current) {
      trackRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    }
    setCurrentPage(1);
  };

  const handleNext = () => {
    if (trackRef.current) {
      const maxScroll = trackRef.current.scrollWidth - trackRef.current.clientWidth;
      trackRef.current.scrollTo({
        left: maxScroll > 0 ? maxScroll : 600,
        behavior: 'smooth'
      });
    }
    setCurrentPage(2);
  };

  const handleScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 10) return;
    if (scrollLeft >= maxScroll / 2) {
      setCurrentPage(2);
    } else {
      setCurrentPage(1);
    }
  };

  return (
    <section className="_WNEjqG">
      <div className="_cixxXf">
        <h2 className="_XZmvOH" style={{ margin: '0px' }}>More stays nearby</h2>
        <div className="_FFRFIT">
          <span className="_klVRbI">{currentPage} / 2</span>
          <button
            className="_kxdode"
            id="simPrev"
            disabled={currentPage === 1}
            onClick={handlePrev}
            aria-label="Previous stays"
          >
            <span className="ico">
              <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{ display: 'block', height: '100%', width: '100%', fill: 'currentColor' }}>
                <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fillRule="evenodd" />
              </svg>
            </span>
          </button>
          <button
            className="_kxdode"
            id="simNext"
            disabled={currentPage === 2}
            onClick={handleNext}
            aria-label="Next stays"
          >
            <span className="ico">
              <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{ display: 'block', height: '100%', width: '100%', fill: 'currentColor' }}>
                <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fillRule="evenodd" />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div
        className="_duSenM"
        id="simTrack"
        ref={trackRef}
        onScroll={handleScroll}
      >
        {stays.map((stay, idx) => (
          <div className="_YyLznY" key={idx}>
            <img src={stay.img} alt={stay.title} loading="lazy" />
            <div className="_JwWFHq">{stay.title}</div>
            <div className="p">
              {stay.price} &nbsp;{' '}
              <span className="star">
                <svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '100%', width: '100%', fill: 'currentColor' }}>
                  <path fillRule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z" />
                </svg>
              </span>{' '}
              {stay.rating}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


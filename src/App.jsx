import React, { useState, useEffect } from 'react';
import Header from './components/header/Header';
import StickyTabs from './components/navigation/StickyTabs';
import ListingHeader from './components/listing-header/ListingHeader';
import GalleryGrid from './components/gallery/GalleryGrid';
import Overview from './components/overview/Overview';
import Highlights from './components/highlights/Highlights';
import Description from './components/description/Description';
import SleepingArrangements from './components/sleep/SleepingArrangements';
import Amenities from './components/amenities/Amenities';
import CalendarSection from './components/calendar/CalendarSection';
import BookingCard from './components/booking/BookingCard';
import Reviews from './components/reviews/Reviews';
import LocationMap from './components/location/LocationMap';
import HostSection from './components/host/HostSection';
import ThingsToKnow from './components/things-to-know/ThingsToKnow';
import NearbyStays from './components/nearby/NearbyStays';
import PhotoTourModal from './components/photo-tour/PhotoTourModal';
import LightboxModal from './components/lightbox/LightboxModal';
import AmenitiesModal from './components/amenities/AmenitiesModal';
import ShareModal from './components/common/ShareModal';
import Toast from './components/common/Toast';
import { LISTING } from './data/listingData';

export default function App() {
  // Wishlist Save State
  const [isSaved, setIsSaved] = useState(() => {
    try {
      return localStorage.getItem('airbnb_saved_ug10') === 'true';
    } catch {
      return false;
    }
  });

  // Toast Notification State
  const [toast, setToast] = useState({ text: '', visible: false });
  const showToast = (text) => {
    setToast({ text, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2200);
  };

  // Sticky Tabs State
  const [stickyVisible, setStickyVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('photos');

  // Overlays State
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(() => {
    try {
      return new URLSearchParams(window.location.search).get('modal') === 'PHOTO_TOUR_SCROLLABLE';
    } catch {
      return false;
    }
  });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Sync photo tour modal state with browser URL (?modal=PHOTO_TOUR_SCROLLABLE)
  useEffect(() => {
    const handlePopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        setIsPhotoTourOpen(params.get('modal') === 'PHOTO_TOUR_SCROLLABLE');
      } catch {
        // Ignore
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenPhotoTour = () => {
    setIsPhotoTourOpen(true);
    try {
      const url = new URL(window.location);
      url.searchParams.set('modal', 'PHOTO_TOUR_SCROLLABLE');
      window.history.pushState({}, '', url);
    } catch {
      // Ignore
    }
  };

  const handleClosePhotoTour = () => {
    setIsPhotoTourOpen(false);
    try {
      const url = new URL(window.location);
      url.searchParams.delete('modal');
      window.history.pushState({}, '', url);
    } catch {
      // Ignore
    }
  };

  // Scroll spy & Sticky Header visibility
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('heroGrid');
      if (hero) {
        const bottom = hero.getBoundingClientRect().bottom;
        setStickyVisible(bottom < 80);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Section Observer for tabs
    const sectionIds = ['photos', 'amenities', 'reviews', 'location'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -50% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleTabClick = (id) => {
    setActiveTab(id);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleSave = () => {
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);
    try {
      localStorage.setItem('airbnb_saved_ug10', String(nextSaved));
    } catch {
      // Ignore
    }
    showToast(nextSaved ? 'Saved to wishlist' : 'Removed from wishlist');
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleReserve = () => {
    showToast("You won't be charged yet");
  };

  const handleClaimPromo = () => {
    showToast('10% discount promo claimed!');
  };

  const handleOpenLightbox = (index) => {
    const validIdx = typeof index === 'number' ? index : 0;
    setLightboxIndex(validIdx);
    setIsLightboxOpen(true);
  };

  const handleLightboxPrev = () => {
    if (lightboxIndex > 0) setLightboxIndex((prev) => prev - 1);
  };

  const handleLightboxNext = () => {
    if (lightboxIndex < 42) setLightboxIndex((prev) => prev + 1);
  };

  const currentPhoto = LISTING.photos[lightboxIndex] || LISTING.photos[0];
  const currentCategoryTitle = LISTING.categories?.find((c) => c.key === currentPhoto?.cat)?.title || currentPhoto?.label || 'Photo';
  const currentPhotoSrc = currentPhoto?.webp || currentPhoto?.remoteSrc || `/assets/photos/photo_${String(lightboxIndex + 1).padStart(2, '0')}_${currentPhoto?.cat || 'living1'}.webp`;
  const currentFallbackSrc = currentPhoto?.remoteSrc || currentPhoto?.src;

  return (
    <>
      <a className="_DLLasj" href="#main">Skip to content</a>
      
      <Header />

      <StickyTabs
        stickyVisible={stickyVisible}
        activeTab={activeTab}
        onTabClick={handleTabClick}
        onReserveClick={handleReserve}
      />

      <main id="main">
        <div className="_zcNtKV">
          <ListingHeader
            onShare={handleShare}
            onToggleSave={handleToggleSave}
            isSaved={isSaved}
          />

          <GalleryGrid
            onPhotoClick={handleOpenLightbox}
            onShowAllPhotos={handleOpenPhotoTour}
          />

          <div className="_lhKJir">
            <div className="_joiPBF" id="contentLeft">
              <Overview />
              <Highlights />
              <Description />
              <SleepingArrangements />
              <Amenities onShowAllAmenities={() => setIsAmenitiesModalOpen(true)} />
              <CalendarSection onClearDates={() => {}} />
            </div>

            <aside className="_iJTxKe">
              <BookingCard
                onReserve={handleReserve}
                onClaimDiscount={handleClaimPromo}
                onReport={() => {}}
              />
            </aside>
          </div>

          <div className="_SPYgTj" id="wideSections">
            <Reviews onShowAllReviews={() => {}} />
            <LocationMap />
            <HostSection onMessageHost={() => {}} />
            <ThingsToKnow />
            <NearbyStays />
          </div>
        </div>
      </main>

      {/* Full-Screen Overlays */}
      <PhotoTourModal
        isOpen={isPhotoTourOpen}
        onClose={handleClosePhotoTour}
        onPhotoClick={(idx) => {
          handleClosePhotoTour();
          handleOpenLightbox(idx);
        }}
        onShare={handleShare}
        onSave={handleToggleSave}
        isSaved={isSaved}
      />

      <LightboxModal
        isOpen={isLightboxOpen}
        currentIndex={lightboxIndex}
        totalPhotos={43}
        categoryName={currentCategoryTitle}
        currentPhotoSrc={currentPhotoSrc}
        fallbackSrc={currentFallbackSrc}
        onClose={() => setIsLightboxOpen(false)}
        onGridClick={() => {
          setIsLightboxOpen(false);
          handleOpenPhotoTour();
        }}
        onPrev={handleLightboxPrev}
        onNext={handleLightboxNext}
      />

      <AmenitiesModal
        isOpen={isAmenitiesModalOpen}
        onClose={() => setIsAmenitiesModalOpen(false)}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      <Toast text={toast.text} visible={toast.visible} />
    </>
  );
}

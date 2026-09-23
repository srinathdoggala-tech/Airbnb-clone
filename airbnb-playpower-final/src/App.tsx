import React, { useState, useCallback } from 'react';
import styles from './App.module.css';
import { LISTING } from './data/listing';
import { ActiveModalType, GuestCounts } from './types/listing';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useFocusReturn } from './hooks/useFocusReturn';
import { useUrlSync, UrlSyncState } from './hooks/useUrlSync';

// Components
import { Header } from './components/Header/Header';
import { StickyNav } from './components/Navigation/StickyNav';
import { ListingHeader } from './components/ListingHeader/ListingHeader';
import { HeroGallery } from './components/HeroGallery/HeroGallery';
import { Overview } from './components/ListingDetails/Overview';
import { Highlights } from './components/ListingDetails/Highlights';
import { Description } from './components/ListingDetails/Description';
import { SleepingArrangements } from './components/ListingDetails/SleepingArrangements';
import { AmenitiesPreview } from './components/Amenities/AmenitiesPreview';
import { AmenitiesModal } from './components/Amenities/AmenitiesModal';
import { CalendarSection } from './components/Calendar/CalendarSection';
import { BookingCard } from './components/BookingCard/BookingCard';
import { ReviewsSection } from './components/Reviews/ReviewsSection';
import { LocationSection } from './components/Location/LocationSection';
import { HostFullSection } from './components/Host/HostFullSection';
import { ThingsToKnowSection } from './components/ThingsToKnow/ThingsToKnowSection';
import { NearbyStaysCarousel } from './components/NearbyStays/NearbyStaysCarousel';
import { Footer } from './components/Footer/Footer';
import { PhotoTourModal } from './components/PhotoTour/PhotoTourModal';
import { LightboxModal } from './components/Lightbox/LightboxModal';
import { ShareModal } from './components/common/ShareModal';
import { ReservationModal } from './components/common/ReservationModal';
import { Toast } from './components/common/Toast';

export const App: React.FC = () => {
  // Overlays & Modals
  const [activeModal, setActiveModal] = useState<ActiveModalType>('none');
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [lightboxOrigin, setLightboxOrigin] = useState<'hero' | 'tour'>('hero');

  // Wishlist state persisted in browser localStorage
  const [isSaved, setIsSaved] = useLocalStorage<boolean>('airbnb_wishlist_saved', false);

  // Guest count state
  const [guestCounts, setGuestCounts] = useState<GuestCounts>({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll spy for sticky bar & tab tracking
  const { isStickyVisible, activeSection } = useScrollSpy({ thresholdPx: 520 });

  // Focus return management
  useFocusReturn(activeModal);

  // Memoized URL state handler to prevent render loops
  const handleUrlStateChange = useCallback((state: UrlSyncState) => {
    setActiveModal(state.modal);
    setLightboxIndex(state.photoIndex);
    setLightboxOrigin(state.origin);
  }, []);

  // Bidirectional URL search parameter & browser history synchronization
  useUrlSync({
    activeModal,
    lightboxIndex,
    lightboxOrigin,
    totalPhotos: LISTING.photos.length,
    onStateChange: handleUrlStateChange,
  });

  // Handlers
  const handlePhotoClickFromHero = (globalIndex: number) => {
    setLightboxIndex(globalIndex);
    setLightboxOrigin('hero');
    setActiveModal('lightbox');
  };

  const handlePhotoClickFromTour = (globalIndex: number) => {
    setLightboxIndex(globalIndex);
    setLightboxOrigin('tour');
    setActiveModal('lightbox');
  };

  const handleCloseLightbox = () => {
    if (lightboxOrigin === 'tour') {
      setActiveModal('photo-tour');
    } else {
      setActiveModal('none');
    }
  };

  const handlePrevPhoto = () => {
    setLightboxIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextPhoto = () => {
    setLightboxIndex((prev) => Math.min(LISTING.photos.length - 1, prev + 1));
  };

  const handleSaveToggle = () => {
    setIsSaved((prev) => {
      const next = !prev;
      setToastMessage(next ? 'Saved to wishlist!' : 'Removed from wishlist');
      return next;
    });
  };

  const handleShareClick = () => {
    setActiveModal('share');
  };

  const handleShareSuccess = () => {
    setToastMessage('Link copied to clipboard!');
  };

  const handleReserveClick = () => {
    setActiveModal('reserve-success');
  };

  const guestSummary = `${guestCounts.adults + guestCounts.children} guests`;

  return (
    <div className="app-root">
      {/* Top Global Navigation */}
      <Header onSearchClick={() => setToastMessage('Search feature active for Candolim')} />

      {/* Sticky Subnavigation Bar */}
      <StickyNav
        isVisible={isStickyVisible}
        activeSection={activeSection}
        price={LISTING.price}
        rating={LISTING.rating}
        reviewsCount={LISTING.reviewsCount}
        onReserveClick={handleReserveClick}
      />

      {/* Main Page Content */}
      <main className="container">
        {/* Listing Title & Actions */}
        <ListingHeader
          title={LISTING.title}
          isSaved={isSaved}
          onShareClick={handleShareClick}
          onSaveToggle={handleSaveToggle}
        />

        {/* 5-Photo Asymmetric Hero Gallery */}
        <HeroGallery
          photos={LISTING.photos}
          heroIndices={LISTING.heroPhotoIndices}
          totalPhotosCount={LISTING.photos.length}
          onPhotoClick={handlePhotoClickFromHero}
          onShowAllClick={() => setActiveModal('photo-tour')}
        />

        {/* 2-Column Split: Content & Sticky Reservation Card */}
        <div className={styles.mainLayout}>
          <div className={styles.leftColumn}>
            {/* Overview Specs & Guest Favourite Badge */}
            <Overview listing={LISTING} />

            {/* Jacuzzi, Wifi, Key Highlights */}
            <Highlights />

            {/* Description with Expand/Collapse */}
            <Description description={LISTING.description} />

            {/* Sleeping Arrangements */}
            <SleepingArrangements />

            {/* Amenities Preview */}
            <AmenitiesPreview
              categories={LISTING.amenityCategories}
              totalCount={54}
              onShowAllClick={() => setActiveModal('amenities')}
            />

            {/* Dual-Month Interactive Calendar */}
            <CalendarSection
              checkinDate={LISTING.price.checkin || '18/10/2026'}
              checkoutDate={LISTING.price.checkout || '23/10/2026'}
              nightsCount={LISTING.price.nights}
              dateRangeText={LISTING.price.dateRangeText}
              onClearDates={() => setToastMessage('Dates reset to original selection')}
            />
          </div>

          <div className={styles.rightColumn}>
            {/* Sticky Floating Reservation Card */}
            <BookingCard
              price={LISTING.price}
              rating={LISTING.rating}
              reviewsCount={LISTING.reviewsCount}
              maxGuests={LISTING.guestsMax}
              guestCounts={guestCounts}
              onGuestsChange={setGuestCounts}
              onReserveClick={handleReserveClick}
            />
          </div>
        </div>

        {/* Full-Width Bottom Modules */}
        <ReviewsSection
          rating={LISTING.rating}
          reviewsCount={LISTING.reviewsCount}
          reviews={LISTING.reviews}
        />

        <LocationSection />

        <HostFullSection host={LISTING.host} />

        <ThingsToKnowSection />

        <NearbyStaysCarousel stays={LISTING.nearby} />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Overlays & Modals */}
      <PhotoTourModal
        isOpen={activeModal === 'photo-tour'}
        categories={LISTING.categories}
        photos={LISTING.photos}
        isSaved={isSaved}
        onClose={() => setActiveModal('none')}
        onPhotoClick={handlePhotoClickFromTour}
        onShareClick={handleShareClick}
        onSaveToggle={handleSaveToggle}
      />

      <LightboxModal
        isOpen={activeModal === 'lightbox'}
        photos={LISTING.photos}
        activeIndex={lightboxIndex}
        isSaved={isSaved}
        onClose={handleCloseLightbox}
        onPrev={handlePrevPhoto}
        onNext={handleNextPhoto}
        onShareClick={handleShareClick}
        onSaveToggle={handleSaveToggle}
      />

      <AmenitiesModal
        isOpen={activeModal === 'amenities'}
        categories={LISTING.amenityCategories}
        onClose={() => setActiveModal('none')}
      />

      <ShareModal
        isOpen={activeModal === 'share'}
        title={LISTING.title}
        type={LISTING.type}
        imageSrc={LISTING.photos[0]?.webp || ''}
        onClose={() => setActiveModal('none')}
        onCopySuccess={handleShareSuccess}
      />

      <ReservationModal
        isOpen={activeModal === 'reserve-success'}
        title={LISTING.title}
        checkinDate={LISTING.price.checkin || '18/10/2026'}
        checkoutDate={LISTING.price.checkout || '23/10/2026'}
        totalPrice={LISTING.price.amount}
        guestCountText={guestSummary}
        onClose={() => setActiveModal('none')}
      />

      {/* Global Toast */}
      <Toast message={toastMessage} onClear={() => setToastMessage(null)} />
    </div>
  );
};

export default App;

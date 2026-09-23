export interface AmenityItem {
  label: string;
  avail: boolean;
  icon?: string;
}

export interface AmenityCategory {
  title: string;
  items: AmenityItem[];
}

export interface Photo {
  id: number;
  cat: string;
  label: string;
  webp: string;
  remoteSrc: string;
}

export interface CoHost {
  name: string;
  avatar: string;
}

export interface Review {
  name: string;
  tenure: string;
  when: string;
  text: string;
  more: boolean;
}

export interface NearbyStay {
  title: string;
  price: string;
  rating: string;
  img: string;
}

export interface PriceInfo {
  amount: string;
  perNight: string;
  nights: number;
  dateRangeText: string;
  freeCancelDate: string;
  totalNumber?: number;
  checkin?: string;
  checkout?: string;
}

export interface HostInfo {
  name: string;
  monogram: string;
  yearsHosting: string;
  verified: boolean;
  stats: {
    reviews: string;
    rating: string;
    years: string;
  };
  facts: string[];
  coHosts: CoHost[];
  details: string[];
}

export interface Category {
  key: string;
  title: string;
  amenities: string;
}

export interface Listing {
  id: string;
  title: string;
  type: string;
  specs: string;
  guestsMax: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  rating: number;
  reviewsCount: number;
  guestFavourite: boolean;
  price: PriceInfo;
  host: HostInfo;
  description: string;
  heroPhotoIndices: number[];
  categories: Category[];
  photos: Photo[];
  reviews: Review[];
  amenityCategories: AmenityCategory[];
  nearby: NearbyStay[];
}

export interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export type ActiveModalType = 'none' | 'photo-tour' | 'lightbox' | 'amenities' | 'share' | 'reserve-success';
export type NavSectionType = 'photos' | 'amenities' | 'reviews' | 'location';

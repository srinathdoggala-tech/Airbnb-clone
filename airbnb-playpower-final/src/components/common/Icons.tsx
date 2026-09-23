import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  fill?: string;
}

export const AirbnbLogo: React.FC<IconProps> = ({ size = 32, className, ...props }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.479.96 3.396l.011.315c0 4.34-3.465 7.806-7.806 7.806-2.67 0-4.992-1.341-6.386-3.388-1.393 2.047-3.716 3.388-6.386 3.388C4.465 32 1 28.534 1 24.194c0-.986.262-1.955.776-3.21l.34-.754c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C11.037 2.044 12.492 1 14.5 1H16zm0 2h-1.5c-1.332 0-2.316.643-3.329 2.443l-.532 1.025C8.683 10.3 4.54 18.974 3.567 21.246l-.286.634c-.46 1.116-.681 1.897-.681 2.314 0 3.207 2.599 5.806 5.806 5.806 2.52 0 4.673-1.611 5.485-3.923l.115-.357h3.988l.115.357c.812 2.312 2.965 3.923 5.485 3.923 3.207 0 5.806-2.599 5.806-5.806 0-.417-.221-1.198-.681-2.314l-.286-.634c-.973-2.272-5.116-10.946-7.072-14.778l-.532-1.025C19.816 3.643 18.832 3 17.5 3H16zm0 15c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0 2c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 16, className, ...props }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" className={className} aria-hidden="true" {...props}>
    <path d="M13 3C7.477 3 3 7.477 3 13s4.477 10 10 10c2.392 0 4.588-.845 6.308-2.257l7.985 7.964 1.414-1.414-7.964-7.985C22.155 17.588 23 15.392 23 13c0-5.523-4.477-10-10-10zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8z" />
  </svg>
);

export const GlobeIcon: React.FC<IconProps> = ({ size = 16, className, ...props }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" className={className} aria-hidden="true" {...props}>
    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm6.874 7.333H12.3a13.3 13.3 0 0 0-.962-4.423A6.685 6.685 0 0 1 14.874 7.333zM8 1.347c.753 1.258 1.353 3.033 1.583 4.986H6.417C6.647 3.38 7.247 1.605 8 1.347zm-3.338 1.563c-.412 1.348-.75 2.87-.962 4.423H1.126a6.685 6.685 0 0 1 3.536-4.423zM1.126 8.667h2.574c.212 1.553.55 3.075.962 4.423A6.685 6.685 0 0 1 1.126 8.667zM8 14.653c-.753-1.258-1.353-3.033-1.583-4.986h3.166C9.353 11.62 8.753 13.395 8 14.653zm3.338-1.563c.412-1.348.75-2.87.962-4.423h2.574a6.685 6.685 0 0 1-3.536 4.423z" />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ size = 16, className, ...props }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" className={className} aria-hidden="true" {...props}>
    <path d="M2 5h28v3H2zm0 10h28v3H2zm0 10h28v3H2z" />
  </svg>
);

export const UserAvatarIcon: React.FC<IconProps> = ({ size = 30, className, ...props }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="#717171" className={className} aria-hidden="true" {...props}>
    <path d="M16 1a15 15 0 1 0 15 15A15 15 0 0 0 16 1zm0 4a5 5 0 1 1-5 5 5 5 0 0 1 5-5zm0 24a13.9 13.9 0 0 1-9.28-3.55 10 10 0 0 1 18.56 0A13.9 13.9 0 0 1 16 29z" />
  </svg>
);

export const ShareIcon: React.FC<IconProps> = ({ size = 16, className, ...props }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" className={className} aria-hidden="true" {...props}>
    <path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9M16 3v18M9 10l7-7 7 7" />
  </svg>
);

export const HeartIcon: React.FC<IconProps & { filled?: boolean }> = ({ size = 16, filled = false, className, ...props }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill={filled ? '#FF385C' : 'rgba(0, 0, 0, 0.5)'}
    stroke={filled ? '#FF385C' : '#FFFFFF'}
    strokeWidth="2"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05A6.98 6.98 0 0 0 9 4a6.98 6.98 0 0 0-7 7c0 7 7 12.27 14 17z" />
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ size = 14, className, fill = '#222222', ...props }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill={fill} className={className} aria-hidden="true" {...props}>
    <path d="M15.088 4.15a1 1 0 0 1 1.824 0l3.07 6.617a1 1 0 0 0 .761.554l7.26 1.001a1 1 0 0 1 .557 1.713l-5.28 5.088a1 1 0 0 0-.29.894l1.282 7.214a1 1 0 0 1-1.458 1.059L16.5 24.87a1 1 0 0 0-.94 0l-6.524 3.42a1 1 0 0 1-1.458-1.06l1.282-7.213a1 1 0 0 0-.29-.894l-5.28-5.088a1 1 0 0 1 .557-1.713l7.26-1.001a1 1 0 0 0 .76-.554l3.072-6.618z" />
  </svg>
);

export const LaurelWreathIcon: React.FC<IconProps> = ({ size = 32, className, ...props }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="currentColor" className={className} aria-hidden="true" {...props}>
    <path d="M14 6a8 8 0 0 0-4 7c0 3.5 2 6 5 7-1.5 2.5-3 5-3 8 0 5 3 9 7 11-1 3-3 5-6 6l1 2c4-1 7-4 8-8 1 .5 2 1 3 1a12 12 0 0 0 9-4c-2-1-3-3-4-5-2 1-4 1-6 0-3-1-5-4-5-7 2-1 3-3 4-6-1-1-2-3-2-5 0-3 2-6 5-7l-1-2c-4 1-7 4-8 8l-4-7zM34 6l-4 7c-1-4-4-7-8-8l-1 2c3 1 5 4 5 7 0 2-1 4-2 5 1 3 2 5 4 6-1 3-3 6-5 7-2 1-4 1-6 0-1 2-2 4-4 5a12 12 0 0 0 9 4c1 0 2-.5 3-1 1 4 4 7 8 8l1-2c-3-1-5-3-6-6 4-2 7-6 7-11 0-3-1.5-5.5-3-8 3-1 5-3.5 5-7a8 8 0 0 0-4-7z" />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ size = 16, className, ...props }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="3" className={className} aria-hidden="true" {...props}>
    <path d="M20 28L8 16 20 4" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 16, className, ...props }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="3" className={className} aria-hidden="true" {...props}>
    <path d="M12 4l12 12-12 12" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ size = 16, className, ...props }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="3" className={className} aria-hidden="true" {...props}>
    <path d="M4 12l12 12 12-12" />
  </svg>
);

export const ChevronUpIcon: React.FC<IconProps> = ({ size = 16, className, ...props }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="3" className={className} aria-hidden="true" {...props}>
    <path d="M4 20l12-12 12 12" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 16, className, ...props }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="3" className={className} aria-hidden="true" {...props}>
    <path d="M6 6l20 20M26 6L6 26" />
  </svg>
);

export const GridIcon: React.FC<IconProps> = ({ size = 16, className, ...props }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" className={className} aria-hidden="true" {...props}>
    <circle cx="2.5" cy="2.5" r="1.5" />
    <circle cx="8" cy="2.5" r="1.5" />
    <circle cx="13.5" cy="2.5" r="1.5" />
    <circle cx="2.5" cy="8" r="1.5" />
    <circle cx="8" cy="8" r="1.5" />
    <circle cx="13.5" cy="8" r="1.5" />
    <circle cx="2.5" cy="13.5" r="1.5" />
    <circle cx="8" cy="13.5" r="1.5" />
    <circle cx="13.5" cy="13.5" r="1.5" />
  </svg>
);

export const BedIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true" {...props}>
    <path d="M3 26V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3h10a2 2 0 0 1 2 2v13M3 21h26M7 11h4M3 26h26" />
  </svg>
);

export const JacuzziIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true" {...props}>
    <path d="M4 14h24v8a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6v-8zm5-4c0-2 1-3 2-4s1 2 2 4m5-4c0-2 1-3 2-4s1 2 2 4" />
  </svg>
);

export const LocationPinIcon: React.FC<IconProps> = ({ size = 20, className, ...props }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" className={className} aria-hidden="true" {...props}>
    <path d="M16 2a11 11 0 0 0-11 11c0 8.25 11 17 11 17s11-8.75 11-17A11 11 0 0 0 16 2zm0 15a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 16, className, ...props }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="3" className={className} aria-hidden="true" {...props}>
    <path d="M4 16l8 8 16-16" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ size = 16, className, ...props }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" className={className} aria-hidden="true" {...props}>
    <path d="M16 6v20M6 16h20" />
  </svg>
);

export const MinusIcon: React.FC<IconProps> = ({ size = 16, className, ...props }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" className={className} aria-hidden="true" {...props}>
    <path d="M6 16h20" />
  </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true" {...props}>
    <path d="M16 3L4 7v8c0 8 6 13 12 14 6-1 12-6 12-14V7L16 3zm-4 13l3 3 6-6" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true" {...props}>
    <path d="M16 3l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7zM25 21l1.5 3.5L30 26l-3.5 1.5L25 31l-1.5-3.5L20 26l3.5-1.5L25 21z" />
  </svg>
);

export const KeyIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true" {...props}>
    <path d="M20 4a7 7 0 0 0-6.9 8.1L4 21.2V27h5.8l2-2v-2h2v-2h2.1l1.2-1.2A7 7 0 1 0 20 4zm2 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2z" />
  </svg>
);

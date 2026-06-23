import type { FC } from 'react';

interface DiamondLogoProps {
  size?: number;
  className?: string;
}

const DiamondLogo: FC<DiamondLogoProps> = ({ size = 40, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 4 L40 18 L24 44 L8 18 Z" fill="#0F2B1E" stroke="#39FF8E" strokeWidth="1.5" />
      <path d="M24 4 L40 18 L24 24 Z" fill="#39FF8E" fillOpacity="0.85" />
      <path d="M24 4 L8 18 L24 24 Z" fill="#1FCB6B" />
      <path d="M8 18 L24 44 L24 24 Z" fill="#0A1F16" />
      <path d="M40 18 L24 44 L24 24 Z" fill="#134029" />
    </svg>
  );
};

export default DiamondLogo;

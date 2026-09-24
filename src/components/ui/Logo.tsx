import React from 'react';

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: 'wordmark' | 'icon';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'wordmark',
  size = 'md',
  className = '',
  alt = 'Act AI',
  ...props
}) => {
  const sizeClasses = {
    wordmark: {
      sm: 'h-5 w-auto',
      md: 'h-7 w-auto',
      lg: 'h-9 w-auto',
    },
    icon: {
      sm: 'size-5',
      md: 'size-7',
      lg: 'size-9',
    },
  };

  const src = variant === 'icon' ? '/assets/act-ai-icon.svg' : '/assets/act-ai-logo.svg';
  const width = variant === 'icon' ? 512 : 639;
  const height = variant === 'icon' ? 512 : 184;

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`select-none transition-[filter] duration-200 [filter:invert(var(--logo-invert))] ${sizeClasses[variant][size]} ${className}`}
      {...props}
    />
  );
};

export default Logo;

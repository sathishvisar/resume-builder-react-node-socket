import React from 'react';
import clsx from 'clsx';

type Size = 'large' | 'medium' | 'small';
type Shape = 'square' | 'rounded' | 'pill';
type Color = 'green' | 'blue' | 'secondary' | 'transparent';
type ButtonType = 'button';

interface CustomButtonProps {
  size?: Size;
  shape?: Shape;
  color?: Color;
  type?: ButtonType;
  href?: string;
  shadow?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const sizeMap: Record<Size, string> = {
  large: 'text-lg px-4 py-4',
  medium: 'text-base px-4 py-2.5',
  small: 'text-body-s px-4 py-2',
};

const shapeMap: Record<Shape, string> = {
  square: 'rounded-none',
  rounded: 'rounded-md',
  pill: 'rounded-full',
};

const colorMap: Record<Color, string> = {
  secondary: 'bg-gray-200 text-gray-800',
  green: 'bg-green-500 text-white',
  blue: 'bg-primary-brand text-white',
  transparent: 'bg-transparent text-gray-800'
};

export const Button: React.FC<CustomButtonProps> = ({
  size = 'medium',
  shape = 'rounded',
  color = 'blue',
  shadow = false,
  children,
  className,
  onClick,
}) => {
  const baseClasses = clsx(
    'inline-flex items-center justify-center transition duration-200 cursor-pointer',
    sizeMap[size],
    shapeMap[shape],
    colorMap[color],
    shadow && 'shadow-md hover:shadow-lg',
    className
  );

  return (
    <button onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
};



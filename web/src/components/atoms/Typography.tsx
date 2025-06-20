import React from 'react';
import clsx from 'clsx';
import { JSX } from 'react';

// Strict variant types
type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type DisplayVariant = 'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6';
type BodyTextVariant = 'body-xxl' | 'body-xl' | 'body-l' | 'body-m' | 'body-s' | 'body-xs';

// Base props
interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

// Heading Component
interface HProps extends TypographyProps {
  variant: HeadingVariant;
}

export const Heading = ({ variant, children, className }: HProps) => {
  const Tag = variant as keyof JSX.IntrinsicElements;
  return (
    <Tag className={clsx(`text-${variant} font-manrope`, className)}>
      {children}
    </Tag>
  );
};

// Display Component
interface DProps extends TypographyProps {
  variant: DisplayVariant;
}

export const Display = ({ variant, children, className }: DProps) => {
  return (
    <div className={clsx(`text-${variant} font-manrope`, className)}>
      {children}
    </div>
  );
};

// BodyText Component
interface BodyTextProps extends TypographyProps {
  variant: BodyTextVariant;
  as?: keyof JSX.IntrinsicElements; // Default: 'p'
}

export const BodyText = ({ variant, children, className, as = 'p' }: BodyTextProps) => {
  const Tag = as;
  return (
    <Tag className={clsx(`text-${variant} font-manrope`, className)}>
      {children}
    </Tag>
  );
};

// Navigation Component
interface NavigationProps extends TypographyProps {
  href?: string;
  as?: 'a' | 'span';
  onClick?: any;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
}

export const Navigation = ({ children, className, href, as, ...rest }: NavigationProps) => {
  const baseClass = clsx(
    'text-navigation cursor-pointer',
    className
  );

  const Component = href ? 'a' : as || 'span';
  return (
    <Component  {...(href ? { href } : {})} className={baseClass} {...rest}>
      {children}
    </Component>
  );
};

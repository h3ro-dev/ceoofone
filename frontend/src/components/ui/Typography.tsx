import React from 'react';
import { cn } from '@/utils/cn';

// Display Component
export interface DisplayProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const Display = React.forwardRef<HTMLHeadingElement, DisplayProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        className={cn(
          'text-display font-extrabold leading-tight tracking-tight text-neutral-charcoal',
          className
        )}
        {...props}
      >
        {children}
      </h1>
    );
  }
);
Display.displayName = 'Display';

// Heading Components
type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
};

export const H1 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        className={cn(
          'text-h1 font-bold leading-tight tracking-tight text-neutral-charcoal',
          className
        )}
        {...props}
      >
        {children}
      </h1>
    );
  }
);
H1.displayName = 'H1';

export const H2 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          'text-h2 font-bold leading-tight tracking-tight text-neutral-charcoal',
          className
        )}
        {...props}
      >
        {children}
      </h2>
    );
  }
);
H2.displayName = 'H2';

export const H3 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          'text-h3 font-semibold leading-snug text-neutral-charcoal',
          className
        )}
        {...props}
      >
        {children}
      </h3>
    );
  }
);
H3.displayName = 'H3';

export const H4 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h4
        ref={ref}
        className={cn(
          'text-h4 font-semibold leading-snug text-neutral-charcoal',
          className
        )}
        {...props}
      >
        {children}
      </h4>
    );
  }
);
H4.displayName = 'H4';

// Body Text Components
type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  children: React.ReactNode;
};

export const BodyLarge = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          'text-bodyLarge leading-relaxed text-neutral-darkGray',
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);
BodyLarge.displayName = 'BodyLarge';

export const Body = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          'text-body leading-relaxed text-neutral-darkGray',
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);
Body.displayName = 'Body';

export const BodySmall = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          'text-bodySmall leading-relaxed text-neutral-mediumGray',
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);
BodySmall.displayName = 'BodySmall';

export const Caption = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          'text-caption leading-loose text-neutral-mediumGray',
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);
Caption.displayName = 'Caption';

// Export all typography components
export default {
  Display,
  H1,
  H2,
  H3,
  H4,
  BodyLarge,
  Body,
  BodySmall,
  Caption,
};
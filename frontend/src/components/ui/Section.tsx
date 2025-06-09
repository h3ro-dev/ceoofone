import React from 'react';
import { cn } from '@/utils/cn';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  paddingY?: 'sm' | 'md' | 'lg' | 'xl';
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, children, containerSize = 'lg', paddingY = 'lg', ...props }, ref) => {
    const containerSizes = {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      xl: 'max-w-[1400px]',
      full: 'max-w-full',
    };
    
    const paddingSizes = {
      sm: 'py-8 md:py-12',
      md: 'py-12 md:py-16',
      lg: 'py-16 md:py-24',
      xl: 'py-20 md:py-32',
    };
    
    return (
      <section
        ref={ref}
        className={cn(
          paddingSizes[paddingY],
          className
        )}
        {...props}
      >
        <div className={cn(
          'mx-auto px-4 sm:px-6 lg:px-8',
          containerSizes[containerSize]
        )}>
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section;
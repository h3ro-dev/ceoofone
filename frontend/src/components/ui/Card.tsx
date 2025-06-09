import React from 'react';
import { cn } from '@/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'feature';
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    const variants = {
      primary: 'bg-white border border-neutral-lightGray rounded-lg p-6 shadow-card hover:shadow-cardHover hover:-translate-y-1 transition-all duration-300',
      feature: 'bg-white border-2 border-primary-blue rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300',
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
'use client';

import React from 'react';
import { cn } from '@/utils/cn';
import { useBooking } from '@/contexts/BookingContext';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isBookingTrigger?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, isBookingTrigger, onClick, ...props }, ref) => {
    const { openModal } = useBooking();
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isBookingTrigger) {
        e.preventDefault();
        openModal();
      } else if (onClick) {
        onClick(e);
      }
    };
    
    const variants = {
      primary: 'bg-primary-orange text-white hover:bg-opacity-90 hover:-translate-y-0.5 shadow-buttonOrange hover:shadow-lg focus:ring-primary-orange',
      secondary: 'bg-primary-blue text-white hover:bg-opacity-90 shadow-button hover:shadow-lg focus:ring-primary-blue',
      ghost: 'bg-transparent text-primary-blue border-2 border-primary-blue hover:bg-primary-blue hover:text-white focus:ring-primary-blue',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm rounded-md',
      md: 'px-6 py-3 text-base rounded-lg',
      lg: 'px-8 py-4 text-lg rounded-lg',
    };
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import BookingForm, { BookingFormData } from './BookingForm';
import { notifyLead, buildBookingPayload } from '@/utils/notifyLead';
import { useBooking } from '@/contexts/BookingContext';
import { useAnalytics } from '@/hooks/useAnalytics';

const BookingModal: React.FC = () => {
  const { isModalOpen, closeModal } = useBooking();
  const { trackBookingModal, trackConversion } = useAnalytics();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleClose = () => {
    trackBookingModal('close');
    closeModal();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleClose();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      // Track modal open
      trackBookingModal('open');
      return () => document.removeEventListener('keydown', handleEscape);
    }
    return undefined;
  }, [isModalOpen, trackBookingModal]);

  const handleSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    // Track form submission start
    trackBookingModal('start', { formData: data });

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      const result = await response.json();
      console.log('Booking submitted:', result);
      
      // Fire-and-forget Slack notifier (centralized proxy)
      try {
        const payload = buildBookingPayload({
          name: data.name,
          email: data.email,
          company: data.company,
          challenge: data.challenge,
          challengeDetails: data.challengeDetails,
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
          timezone: data.timezone,
        });
        // Do not await to avoid blocking UX
        notifyLead('booking', payload);
      } catch (e) {
        console.warn('notifyLead skipped', e);
      }
      
      // Track successful submission and conversion
      trackBookingModal('submit', { bookingId: result.data?.id });
      trackConversion('booking', 1, { 
        email: data.email,
        company: data.company,
        challenge: data.challenge,
        timezone: data.timezone 
      });

      setShowSuccess(true);
      
      // Close modal after showing success message
      setTimeout(() => {
        setShowSuccess(false);
        handleClose();
      }, 3000);
    } catch (err) {
      console.error('Error submitting booking:', err);
      setError('Something went wrong. Please try again.');
      
      // Track error
      trackBookingModal('error', { error: err instanceof Error ? err.message : 'Unknown error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted || !isModalOpen) return null;

  const modalContent = (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300',
          isModalOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className={cn(
            'relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl pointer-events-auto',
            'transform transition-all duration-300',
            'max-h-[90vh] overflow-hidden flex flex-col',
            isModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
            'md:max-h-[85vh]'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-lightGray">
            <div>
              <h2 className="text-2xl font-bold text-neutral-charcoal">
                Book Your Strategy Session
              </h2>
              <p className="text-sm text-neutral-mediumGray mt-1">
                Transform your leadership in just 45 minutes
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-neutral-softGray rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6 text-neutral-mediumGray"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {showSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
                <div className="w-20 h-20 bg-semantic-success bg-opacity-20 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-10 h-10 text-semantic-success"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-neutral-charcoal mb-2">
                  Success! Your Session is Booked
                </h3>
                <p className="text-neutral-mediumGray text-center max-w-md">
                  Check your email for confirmation details. We're looking forward to helping you
                  achieve extraordinary results.
                </p>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-6 p-4 bg-semantic-error bg-opacity-10 border border-semantic-error rounded-lg">
                    <p className="text-semantic-error">{error}</p>
                  </div>
                )}
                <BookingForm onSubmit={handleSubmit} onClose={closeModal} />
              </>
            )}
          </div>

          {/* Mobile Full-Screen Adjustments */}
          <style jsx>{`
            @media (max-width: 640px) {
              .fixed > div:last-child {
                max-width: 100%;
                max-height: 100%;
                height: 100%;
                border-radius: 0;
              }
            }
          `}</style>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};

export default BookingModal;

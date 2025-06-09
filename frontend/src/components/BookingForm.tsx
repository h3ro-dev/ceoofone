'use client';

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import Button from '@/components/ui/Button';

export interface BookingFormData {
  // Step 1
  name: string;
  email: string;
  company: string;
  // Step 2
  challenge: string;
  challengeDetails: string;
  // Step 3
  preferredDate: string;
  preferredTime: string;
  timezone: string;
}

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => Promise<void>;
  onClose: () => void;
}

const challenges = [
  'Scaling my business',
  'Work-life balance',
  'Team management',
  'Strategic planning',
  'Time management',
  'Revenue growth',
  'Process optimization',
  'Other'
];

const timeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM'
];

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    company: '',
    challenge: '',
    challengeDetails: '',
    preferredDate: '',
    preferredTime: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<BookingFormData> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.company.trim()) newErrors.company = 'Company is required';
    } else if (step === 2) {
      if (!formData.challenge) newErrors.challenge = 'Please select a challenge';
      if (!formData.challengeDetails.trim()) newErrors.challengeDetails = 'Please provide more details';
    } else if (step === 3) {
      if (!formData.preferredDate) newErrors.preferredDate = 'Please select a date';
      if (!formData.preferredTime) newErrors.preferredTime = 'Please select a time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const updateFormData = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300',
                  currentStep >= step
                    ? 'bg-primary-blue text-white'
                    : 'bg-neutral-lightGray text-neutral-mediumGray'
                )}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={cn(
                    'w-16 h-1 transition-all duration-300',
                    currentStep > step ? 'bg-primary-blue' : 'bg-neutral-lightGray'
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <h3 className="text-xl font-semibold mb-4">Let's Get to Know You</h3>
            <p className="text-neutral-mediumGray mb-6">
              Tell us about yourself so we can personalize your strategy session.
            </p>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border-2 rounded-lg transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-20',
                errors.name ? 'border-semantic-error' : 'border-neutral-lightGray focus:border-primary-blue'
              )}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-semantic-error text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border-2 rounded-lg transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-20',
                errors.email ? 'border-semantic-error' : 'border-neutral-lightGray focus:border-primary-blue'
              )}
              placeholder="john@company.com"
            />
            {errors.email && (
              <p className="text-semantic-error text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2">
              Company *
            </label>
            <input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => updateFormData('company', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border-2 rounded-lg transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-20',
                errors.company ? 'border-semantic-error' : 'border-neutral-lightGray focus:border-primary-blue'
              )}
              placeholder="Acme Inc."
            />
            {errors.company && (
              <p className="text-semantic-error text-sm mt-1">{errors.company}</p>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Challenge Information */}
      {currentStep === 2 && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <h3 className="text-xl font-semibold mb-4">What's Your Biggest Challenge?</h3>
            <p className="text-neutral-mediumGray mb-6">
              Help us understand what you're facing so we can provide the most value.
            </p>
          </div>

          <div>
            <label htmlFor="challenge" className="block text-sm font-medium mb-2">
              Primary Challenge *
            </label>
            <select
              id="challenge"
              value={formData.challenge}
              onChange={(e) => updateFormData('challenge', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border-2 rounded-lg transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-20',
                errors.challenge ? 'border-semantic-error' : 'border-neutral-lightGray focus:border-primary-blue'
              )}
            >
              <option value="">Select a challenge</option>
              {challenges.map(challenge => (
                <option key={challenge} value={challenge}>
                  {challenge}
                </option>
              ))}
            </select>
            {errors.challenge && (
              <p className="text-semantic-error text-sm mt-1">{errors.challenge}</p>
            )}
          </div>

          <div>
            <label htmlFor="challengeDetails" className="block text-sm font-medium mb-2">
              Tell Us More *
            </label>
            <textarea
              id="challengeDetails"
              value={formData.challengeDetails}
              onChange={(e) => updateFormData('challengeDetails', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 resize-none',
                'focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-20',
                errors.challengeDetails ? 'border-semantic-error' : 'border-neutral-lightGray focus:border-primary-blue'
              )}
              rows={4}
              placeholder="Describe your specific situation and what you hope to achieve..."
            />
            {errors.challengeDetails && (
              <p className="text-semantic-error text-sm mt-1">{errors.challengeDetails}</p>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Schedule Selection */}
      {currentStep === 3 && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <h3 className="text-xl font-semibold mb-4">Choose Your Preferred Time</h3>
            <p className="text-neutral-mediumGray mb-6">
              Select a date and time that works best for you. All sessions are 45 minutes.
            </p>
          </div>

          <div>
            <label htmlFor="preferredDate" className="block text-sm font-medium mb-2">
              Preferred Date *
            </label>
            <input
              id="preferredDate"
              type="date"
              value={formData.preferredDate}
              onChange={(e) => updateFormData('preferredDate', e.target.value)}
              min={getMinDate()}
              className={cn(
                'w-full px-4 py-3 border-2 rounded-lg transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-20',
                errors.preferredDate ? 'border-semantic-error' : 'border-neutral-lightGray focus:border-primary-blue'
              )}
            />
            {errors.preferredDate && (
              <p className="text-semantic-error text-sm mt-1">{errors.preferredDate}</p>
            )}
          </div>

          <div>
            <label htmlFor="preferredTime" className="block text-sm font-medium mb-2">
              Preferred Time *
            </label>
            <select
              id="preferredTime"
              value={formData.preferredTime}
              onChange={(e) => updateFormData('preferredTime', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border-2 rounded-lg transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-20',
                errors.preferredTime ? 'border-semantic-error' : 'border-neutral-lightGray focus:border-primary-blue'
              )}
            >
              <option value="">Select a time</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {errors.preferredTime && (
              <p className="text-semantic-error text-sm mt-1">{errors.preferredTime}</p>
            )}
          </div>

          <div className="text-sm text-neutral-mediumGray">
            <p>Your timezone: {formData.timezone}</p>
          </div>
        </div>
      )}

      {/* Trust Signals */}
      <div className="flex items-center justify-center space-x-6 text-sm text-neutral-mediumGray pt-4">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>100% Confidential</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>Secure & Private</span>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-between pt-6">
        {currentStep > 1 ? (
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            disabled={isSubmitting}
          >
            Back
          </Button>
        ) : (
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}

        {currentStep < 3 ? (
          <Button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
          >
            Next
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={isSubmitting}
            className={cn(isSubmitting && 'opacity-50 cursor-not-allowed')}
          >
            {isSubmitting ? 'Submitting...' : 'Book Strategy Session'}
          </Button>
        )}
      </div>
    </form>
  );
};

export default BookingForm;
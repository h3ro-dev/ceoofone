import React from 'react';
import Button from '@/components/ui/Button';
import { Display, BodyLarge } from '@/components/ui/Typography';
import Section from '@/components/ui/Section';

const Hero: React.FC = () => {
  return (
    <Section paddingY="xl" className="bg-gradient-to-b from-white to-neutral-softGray">
      <div className="text-center max-w-4xl mx-auto">
        {/* Hero Headline */}
        <Display className="mb-6 animate-fade-in">
          <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-display">
            Wearing Every Hat?
          </span>
          <span className="block text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-2 text-primary-blue">
            Focus on the One That Actually Grows Your Business.
          </span>
        </Display>
        
        {/* Subheadline */}
        <BodyLarge className="mb-10 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
          CEO of One gives solo leaders AI-powered leverage to escape the 80% busywork
          and double down on the 20% of decisions that actually transform their business.
        </BodyLarge>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Button size="lg" variant="primary" className="min-w-[250px]" isBookingTrigger>
            Get Your Free CEO Strategy Session
          </Button>
          <Button size="lg" variant="ghost" className="min-w-[200px]">
            See How It Works (2-min demo)
          </Button>
        </div>
        
        {/* Trust Signal */}
        <p className="mt-8 text-neutral-mediumGray text-sm animate-fade-in" style={{ animationDelay: '0.6s' }}>
          Join 1,000+ solo CEOs who've reclaimed their strategic edge
        </p>
      </div>
    </Section>
  );
};

export default Hero;
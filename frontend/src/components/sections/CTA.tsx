import React from 'react';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { H2, H3, Body, BodySmall } from '@/components/ui/Typography';
import { useAnalytics } from '@/hooks/useAnalytics';

const CTA: React.FC = () => {
  const { trackCTAClick } = useAnalytics();
  return (
    <Section paddingY="lg" className="bg-gradient-to-br from-neutral-softGray to-white">
      <div className="max-w-4xl mx-auto">
        {/* Main CTA Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 text-center border-2 border-primary-blue">
          <H2 className="mb-4">Ready to Focus on What Actually Grows Your Business?</H2>
          
          <H3 className="text-xl lg:text-2xl font-normal text-neutral-darkGray mb-8">
            Get Your Free CEO Strategy Session
          </H3>
          
          <div className="space-y-3 mb-8 max-w-2xl mx-auto text-left">
            {[
              '60-minute deep dive into your current priorities',
              'Identify your high-impact 20% vs. time-wasting 80%',
              'Custom roadmap for implementing AI-powered focus',
              'No sales pitch – just strategic clarity',
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="text-semantic-success mt-1 flex-shrink-0">•</span>
                <Body>{item}</Body>
              </div>
            ))}
          </div>
          
          <Button 
            size="lg" 
            variant="primary" 
            className="min-w-[300px] mb-4" 
            isBookingTrigger
            onClick={() => trackCTAClick('section', 'Book My Free Strategy Session')}
          >
            Book My Free Strategy Session
          </Button>
          
          <BodySmall className="text-neutral-mediumGray">
            Limited to 10 sessions per month | Usually $500, free for qualifying CEOs
          </BodySmall>
        </div>
        
        {/* Secondary CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Demo CTA */}
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <H3 className="text-lg mb-3">See CEO of One in Action</H3>
            <Body className="mb-4 text-neutral-mediumGray">
              Watch how other solo CEOs transformed from overwhelmed to in-control
            </Body>
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => trackCTAClick('section', 'Watch 2-Minute Demo')}
            >
              Watch 2-Minute Demo
            </Button>
            <BodySmall className="mt-2 text-neutral-mediumGray">
              Real CEO. Real results. Real transformation.
            </BodySmall>
          </div>
          
          {/* Lead Magnet CTA */}
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <H3 className="text-lg mb-3">Download: The 20% CEO Toolkit</H3>
            <Body className="mb-4 text-neutral-mediumGray">
              Free guide to identifying the critical 20% that drives 80% of your growth
            </Body>
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => trackCTAClick('section', 'Get Free Toolkit')}
            >
              Get Free Toolkit
            </Button>
            <BodySmall className="mt-2 text-neutral-mediumGray">
              Instant download • No email required
            </BodySmall>
          </div>
        </div>
        
        {/* Urgency Message */}
        <div className="mt-12 p-6 bg-primary-orange bg-opacity-10 rounded-xl border border-primary-orange border-opacity-20">
          <div className="flex items-center justify-center space-x-3">
            <span className="text-2xl">⚡</span>
            <div className="text-center">
              <H3 className="text-lg text-neutral-charcoal">
                Don't Let Another Quarter Slip By
              </H3>
              <Body className="text-neutral-darkGray">
                While you're buried in busywork, your competitors are focusing on growth.
                The time cost of delay is measured in missed opportunities.
              </Body>
            </div>
          </div>
        </div>
        
        {/* Trust Signals */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-neutral-mediumGray">
          <span className="flex items-center space-x-2">
            <span>✓</span>
            <span>256-bit encryption</span>
          </span>
          <span className="flex items-center space-x-2">
            <span>✓</span>
            <span>30-day money-back guarantee</span>
          </span>
          <span className="flex items-center space-x-2">
            <span>✓</span>
            <span>SOC 2 Type II compliant</span>
          </span>
          <span className="flex items-center space-x-2">
            <span>✓</span>
            <span>Used by CEOs in 47 countries</span>
          </span>
        </div>
      </div>
    </Section>
  );
};

export default CTA;
import React from 'react';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { H2, H3, H4, Body, BodyLarge } from '@/components/ui/Typography';

interface Feature {
  icon: string;
  title: string;
  description: string;
  before: string;
  after: string;
}

const features: Feature[] = [
  {
    icon: '🌅',
    title: 'Start Every Day Knowing Your Top 3 Priorities',
    description: 'No more drowning in your inbox wondering what matters. Get a concise morning briefing that cuts through the noise and tells you exactly where to focus your limited time and energy.',
    before: '2 hours sorting through chaos to find what matters',
    after: '5 minutes reviewing your strategic priorities',
  },
  {
    icon: '📊',
    title: 'Data-Driven Insights for Critical Choices',
    description: 'Stop making gut decisions on million-dollar questions. Get AI-powered analysis that synthesizes market data, financial metrics, and operational insights into clear recommendations for strategic decisions.',
    before: 'Flying blind on major business decisions',
    after: 'Data-backed confidence for every strategic move',
  },
  {
    icon: '🤖',
    title: 'AI Handles Routine Operations So You Don\'t Have To',
    description: 'Your AI assistant manages the predictable 80%: scheduling, basic customer inquiries, routine reporting, meeting prep, and administrative tasks that drain your genius-level potential.',
    before: '40 hours/week on tasks anyone could do',
    after: '40 hours/week on work only you can do',
  },
  {
    icon: '🎯',
    title: 'Ruthless Priority Filtering',
    description: 'Not everything urgent is important. Your AI chief of staff acts as a gatekeeper, filtering requests, interruptions, and "opportunities" that don\'t align with your core growth objectives.',
    before: 'Reactive CEO jumping from fire to fire',
    after: 'Proactive leader focused on growth drivers',
  },
];

const Solution: React.FC = () => {
  return (
    <Section paddingY="lg" className="bg-neutral-softGray">
      {/* Section Header */}
      <div className="text-center mb-12">
        <H2 className="mb-4">Meet Your AI Chief of Staff</H2>
        <H3 className="text-primary-blue font-normal">
          Finally, Executive-Level Support Without Executive-Level Overhead
        </H3>
        <BodyLarge className="mt-6 max-w-3xl mx-auto">
          CEO of One acts as your intelligent chief of staff, using AI to identify the
          critical 20% of decisions that drive 80% of your results – then handling,
          automating, or eliminating everything else.
        </BodyLarge>
      </div>
      
      {/* Features Grid */}
      <div className="space-y-8">
        {features.map((feature, index) => (
          <Card key={index} variant="feature" className="overflow-hidden">
            <div className="grid md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-1 text-center">
                <span className="text-5xl inline-block hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </span>
              </div>
              <div className="md:col-span-7">
                <H4 className="mb-3 text-neutral-charcoal">
                  {feature.title}
                </H4>
                <Body className="text-neutral-darkGray">
                  {feature.description}
                </Body>
              </div>
              <div className="md:col-span-4 space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                  <p className="text-sm font-medium text-red-900">Before:</p>
                  <p className="text-sm text-red-700">{feature.before}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-sm font-medium text-green-900">After:</p>
                  <p className="text-sm text-green-700">{feature.after}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Results Summary */}
      <div className="mt-16 p-8 bg-white rounded-xl shadow-lg">
        <H3 className="text-center mb-6">
          The Result: Transform from Overwhelmed Operator to Strategic Leader
        </H3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            'Reclaim 20+ hours per week for high-value work',
            'Make data-driven decisions with confidence',
            'Focus exclusively on the 20% that drives growth',
            'Scale your impact without scaling your stress',
            'Finally work ON your business instead of IN it',
          ].map((benefit, index) => (
            <div key={index} className="flex items-start space-x-2">
              <span className="text-semantic-success mt-1">•</span>
              <Body className="text-neutral-darkGray">{benefit}</Body>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA */}
      <div className="text-center mt-12">
        <Button size="lg" variant="primary" className="min-w-[300px]" isBookingTrigger>
          Get Your Free CEO Strategy Session
        </Button>
        <p className="mt-4 text-neutral-mediumGray text-sm">
          Limited to 10 sessions per month • Usually $500, free for qualifying CEOs
        </p>
      </div>
    </Section>
  );
};

export default Solution;
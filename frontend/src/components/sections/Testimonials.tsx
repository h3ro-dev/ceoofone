import React from 'react';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { H2, H4, Body, BodySmall } from '@/components/ui/Typography';

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  metrics: string;
  highlight?: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "I went from working 80-hour weeks with 15% growth to 50-hour weeks with 150% growth. CEO of One helped me identify that I was spending 60% of my time on tasks that drove zero revenue. Now I only touch decisions that actually matter.",
    author: "Jennifer Martinez",
    title: "CEO of TechFlow Solutions",
    metrics: "Revenue: $2M → $5M in 18 months | Hours: 80/week → 50/week",
    highlight: "150% growth",
  },
  {
    quote: "I used to joke that I was the Chief Everything Officer. Now I'm actually the CEO. The AI handles my calendar, prep work, and routine decisions. I finally have time to think strategically instead of just reacting to whatever's loudest.",
    author: "Marcus Chen",
    title: "Founder of CloudSync Pro",
    metrics: "Time saved: 25 hours per week | Strategic thinking time: 3x increase",
    highlight: "25 hours saved",
  },
  {
    quote: "Before CEO of One, I made decisions based on gut feelings and whatever data I could quickly find. Now I get comprehensive analysis and clear recommendations. My decision quality has dramatically improved, and so have my results.",
    author: "Sarah Williams",
    title: "CEO of EcoLogistics",
    metrics: "Decision confidence: ↑75% | Strategic accuracy: ↑90%",
    highlight: "90% accuracy",
  },
  {
    quote: "I finally took my first real vacation in 3 years. The AI kept everything running smoothly, and I came back to a business that had grown, not one that had fallen apart. That's when I knew this wasn't just a tool – it was transformation.",
    author: "David Rodriguez",
    title: "Founder of Urban Wellness",
    metrics: "First vacation in 3 years | Business growth during absence: +12%",
    highlight: "First vacation in 3 years",
  },
];

const metrics = [
  { value: '+127%', label: 'Average revenue growth' },
  { value: '23 hrs', label: 'Time reclaimed per week' },
  { value: '+89%', label: 'Strategic focus improvement' },
  { value: '15:1', label: 'Average ROI' },
  { value: '-67%', label: 'Stress reduction' },
  { value: '+78%', label: 'Decision confidence' },
];

const Testimonials: React.FC = () => {
  return (
    <Section paddingY="lg">
      {/* Section Header */}
      <div className="text-center mb-12">
        <H2 className="mb-4">Join Solo CEOs Who've Reclaimed Their Strategic Edge</H2>
        <Body className="max-w-2xl mx-auto text-neutral-mediumGray">
          Real results from real CEOs who transformed from overwhelmed operators to strategic leaders.
        </Body>
      </div>
      
      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="relative">
            {testimonial.highlight && (
              <div className="absolute -top-3 -right-3 bg-primary-orange text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                {testimonial.highlight}
              </div>
            )}
            <div className="space-y-4">
              {/* Quote */}
              <div className="relative">
                <span className="absolute -top-2 -left-2 text-6xl text-primary-blue opacity-20">"</span>
                <Body className="relative z-10 italic text-neutral-darkGray pl-6">
                  {testimonial.quote}
                </Body>
              </div>
              
              {/* Author */}
              <div className="pt-4 border-t border-neutral-lightGray">
                <H4 className="text-base font-semibold text-neutral-charcoal">
                  — {testimonial.author}
                </H4>
                <BodySmall className="text-neutral-mediumGray">
                  {testimonial.title}
                </BodySmall>
                <BodySmall className="mt-2 text-primary-blue font-medium">
                  {testimonial.metrics}
                </BodySmall>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Success Metrics */}
      <div className="bg-primary-blue rounded-2xl p-8 lg:p-12">
        <H4 className="text-white text-center mb-8">Solo CEO Success Metrics</H4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-blue-100">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Testimonials;
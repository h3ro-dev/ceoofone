import React from 'react';
import Section from '@/components/ui/Section';
import { H2, H3, H4, Body } from '@/components/ui/Typography';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Quick Setup & Integration',
    description: 'Connect your existing tools and data sources in minutes. Our AI learns your business context, priorities, and communication style to become your personalized chief of staff.',
    icon: '🔗',
  },
  {
    number: '02',
    title: 'Daily Strategic Briefings',
    description: 'Start each morning with clarity. Your AI analyzes everything overnight and presents your top 3 priorities, key decisions needed, and what can be automated or delegated.',
    icon: '📋',
  },
  {
    number: '03',
    title: 'Intelligent Task Filtering',
    description: 'Throughout the day, your AI chief of staff filters incoming requests, handles routine operations, and only escalates what truly needs your attention. Focus stays protected.',
    icon: '🎯',
  },
  {
    number: '04',
    title: 'Continuous Optimization',
    description: 'The more you use CEO of One, the smarter it gets. It learns your decision patterns, optimizes workflows, and continuously finds new ways to free up your time for strategic work.',
    icon: '📈',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <Section paddingY="lg" className="bg-gradient-to-b from-white to-neutral-softGray">
      {/* Section Header */}
      <div className="text-center mb-12">
        <H2 className="mb-4">How CEO of One Works</H2>
        <H3 className="text-xl font-normal text-neutral-darkGray max-w-3xl mx-auto">
          From overwhelmed to organized in days, not months. Here's your path to strategic clarity:
        </H3>
      </div>
      
      {/* Steps */}
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          {/* Vertical line connector for desktop */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary-blue to-primary-orange"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative mb-12 last:mb-0">
              <div className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}>
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className={`bg-white p-6 lg:p-8 rounded-xl shadow-lg ${
                    index % 2 === 0 ? 'lg:mr-12' : 'lg:ml-12'
                  }`}>
                    <div className={`flex items-center gap-4 mb-4 ${
                      index % 2 === 0 ? 'lg:justify-end' : ''
                    }`}>
                      <span className="text-4xl">{step.icon}</span>
                      <H4 className="text-neutral-charcoal">{step.title}</H4>
                    </div>
                    <Body className="text-neutral-darkGray">
                      {step.description}
                    </Body>
                  </div>
                </div>
                
                {/* Step Number Circle */}
                <div className="relative z-10 flex items-center justify-center w-20 h-20 bg-primary-blue text-white rounded-full shadow-lg">
                  <span className="text-2xl font-bold">{step.number}</span>
                </div>
                
                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <H3 className="mb-6">Ready to Transform Your Leadership?</H3>
        <Body className="max-w-2xl mx-auto mb-8 text-neutral-mediumGray">
          Join thousands of solo CEOs who've already reclaimed their time and multiplied their impact. 
          Start with a free strategy session to see exactly how CEO of One can transform your specific situation.
        </Body>
      </div>
    </Section>
  );
};

export default HowItWorks;
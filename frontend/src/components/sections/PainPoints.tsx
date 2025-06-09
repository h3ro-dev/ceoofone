import React from 'react';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { H2, H4, Body } from '@/components/ui/Typography';

interface PainPoint {
  icon: string;
  title: string;
  description: string;
}

const painPoints: PainPoint[] = [
  {
    icon: '💼',
    title: 'Making Million-Dollar Decisions Between Email Responses?',
    description: "You're capable of 10x growth strategies, but you're stuck scheduling meetings, chasing invoices, and putting out daily fires. Your genius is being wasted on tasks any assistant could handle.",
  },
  {
    icon: '⏰',
    title: 'Working 70 Hours But Growing at 7% Rate?',
    description: "The harder you work, the busier you get – but revenue stays flat. You're sprinting in place while competitors with clear focus are pulling ahead. Something's got to give.",
  },
  {
    icon: '🧠',
    title: "Drowning in Decisions That Don't Drive Growth?",
    description: "By 2 PM, you've made 100 micro-decisions and have zero mental energy left for the strategic thinking that actually matters. Decision fatigue is killing your edge.",
  },
  {
    icon: '🏝️',
    title: 'No Executive Team to Bounce Ideas Off?',
    description: 'Every strategic decision lands on your desk alone. No chief of staff to filter priorities. No executive team to stress-test ideas. Just you, a mountain of tasks, and the weight of every choice.',
  },
];

const PainPoints: React.FC = () => {
  return (
    <Section paddingY="lg">
      <div className="text-center mb-12">
        <H2 className="mb-4">Are You the CEO, CFO, COO... and Janitor?</H2>
        <Body className="max-w-2xl mx-auto text-neutral-mediumGray">
          If you're wearing every hat in your company, you're not alone. Here's what we hear from solo CEOs every day:
        </Body>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {painPoints.map((point, index) => (
          <Card key={index} className="group cursor-pointer">
            <div className="flex items-start space-x-4">
              <span className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {point.icon}
              </span>
              <div>
                <H4 className="mb-3 text-neutral-charcoal group-hover:text-primary-blue transition-colors duration-300">
                  {point.title}
                </H4>
                <Body className="text-neutral-darkGray">
                  {point.description}
                </Body>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Reality Check List */}
      <div className="mt-12 p-8 bg-neutral-softGray rounded-xl">
        <H4 className="mb-6 text-center">Solo CEO Reality Check:</H4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {[
            'Checking email 50+ times per day while strategy suffers',
            'Attending meetings that could have been emails (or eliminated entirely)',
            'Manually tracking metrics instead of seeing automated insights',
            'Making gut decisions without data because "there\'s no time to analyze"',
            'Working weekends to catch up on the work that actually matters',
            'Feeling like you\'re building a job, not a business',
          ].map((item, index) => (
            <div key={index} className="flex items-start space-x-2">
              <span className="text-semantic-error mt-1">✗</span>
              <Body className="text-neutral-darkGray">{item}</Body>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default PainPoints;
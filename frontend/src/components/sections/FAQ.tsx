import React, { useState } from 'react';
import Section from '@/components/ui/Section';
import { H2, H4, Body } from '@/components/ui/Typography';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is this replacing me or empowering me?",
    answer: "CEO of One is designed to empower you, not replace you. Think of it as your intelligent chief of staff that handles the 80% of routine work so you can focus on the 20% that only you can do - strategic decisions, vision setting, and relationship building. You remain in full control while gaining the leverage to work at your highest level.",
  },
  {
    question: "What if the AI makes a wrong recommendation?",
    answer: "Our AI provides data-driven insights and recommendations, but you always make the final decisions. Every recommendation comes with clear reasoning and supporting data so you can evaluate it yourself. Plus, the system learns from your feedback, continuously improving its accuracy. We also maintain human oversight on critical processes for added safety.",
  },
  {
    question: "How quickly can I see results?",
    answer: "Most CEOs report feeling immediate relief within the first week as they gain clarity on their priorities. Within 30 days, you'll typically see 15-20 hours per week freed up from routine tasks. Strategic improvements and business growth usually become measurable within 60-90 days as you consistently focus on high-impact activities.",
  },
  {
    question: "What's the difference between this and a virtual assistant?",
    answer: "Traditional virtual assistants handle tasks you assign them. CEO of One proactively identifies what matters, filters what doesn't, and provides strategic insights like a chief of staff would. It's the difference between someone who takes orders and someone who helps you lead more effectively. Plus, it works 24/7, learns continuously, and scales with your business.",
  },
  {
    question: "How much time do I need to invest in setup?",
    answer: "Initial setup takes about 2-3 hours spread over your first week. This includes connecting your tools, training the AI on your preferences, and customizing your daily briefing format. After that, you'll spend about 15 minutes per day reviewing and refining, which quickly drops to 5 minutes as the system learns your patterns.",
  },
  {
    question: "Is my business data secure?",
    answer: "Absolutely. We use bank-level 256-bit encryption for all data, both in transit and at rest. Your information is never shared with third parties or used to train general AI models. We're SOC 2 Type II compliant and undergo regular security audits. You maintain full ownership and control of your data, with the ability to export or delete it at any time.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section paddingY="lg" id="faq">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <H2 className="mb-4">Frequently Asked Questions</H2>
          <Body className="text-neutral-mediumGray">
            Everything you need to know about transforming from overwhelmed to in-control
          </Body>
        </div>
        
        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-neutral-lightGray rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-inset"
              >
                <H4 className="text-base lg:text-lg pr-4">{faq.question}</H4>
                <svg
                  className={`w-5 h-5 text-neutral-mediumGray transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <Body className="text-neutral-darkGray">
                    {faq.answer}
                  </Body>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Additional Questions CTA */}
        <div className="mt-12 p-6 bg-neutral-softGray rounded-xl text-center">
          <H4 className="mb-2">Still have questions?</H4>
          <Body className="text-neutral-mediumGray mb-4">
            Our team is here to help you determine if CEO of One is right for your business.
          </Body>
          <a
            href="mailto:hello@ceo-of-one.com"
            className="text-primary-blue hover:text-primary-orange transition-colors font-medium"
          >
            Contact us directly →
          </a>
        </div>
      </div>
    </Section>
  );
};

export default FAQ;
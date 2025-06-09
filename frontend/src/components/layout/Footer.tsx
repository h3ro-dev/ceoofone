import React from 'react';
import { Body, BodySmall } from '@/components/ui/Typography';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">CEO of One</h3>
            <Body className="text-neutral-lightGray mb-4">
              Turn overwhelm into focus and results. AI-powered leverage for solo leaders.
            </Body>
            <BodySmall className="text-neutral-mediumGray">
              Part of the Utlyze suite of productivity solutions.
            </BodySmall>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-neutral-lightGray hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-neutral-lightGray hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-neutral-lightGray hover:text-white transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#faq" className="text-neutral-lightGray hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-neutral-lightGray hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-neutral-lightGray hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/security" className="text-neutral-lightGray hover:text-white transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-neutral-darkGray mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <BodySmall className="text-neutral-mediumGray">
            © 2024 CEO of One. All rights reserved.
          </BodySmall>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-neutral-mediumGray hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-neutral-mediumGray hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="text-neutral-mediumGray hover:text-white transition-colors">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
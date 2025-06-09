import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import PainPoints from '@/components/sections/PainPoints';
import Solution from '@/components/sections/Solution';
import HowItWorks from '@/components/sections/HowItWorks';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        <Hero />
        <div id="problem">
          <PainPoints />
        </div>
        <div id="solution">
          <Solution />
        </div>
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
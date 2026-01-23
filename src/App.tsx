import { Sparkles, Bot, DollarSign, Mail } from 'lucide-react';
import { NavBar } from './components/ui/tubelight-navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import LeadCaptureStream from './components/LeadCaptureStream';
import Agents from './components/Agents';
import Workflow from './components/Workflow';
import DashboardPreview from './components/DashboardPreview';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import SkipToContent from './components/SkipToContent';

function App() {
  const navItems = [
    { name: 'Features', url: '#features', icon: Sparkles },
    { name: 'AI Agents', url: '#agents', icon: Bot },
    { name: 'Pricing', url: '#pricing', icon: DollarSign },
    { name: 'Contact', url: '#contact', icon: Mail }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 noise pointer-events-none z-0" />

      <SkipToContent />
      <ScrollProgress />
      <NavBar items={navItems} />
      <Hero />
      <Features />
      <LeadCaptureStream />
      <Agents />
      <Workflow />
      <DashboardPreview />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Contact />
      <ScrollToTop />

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-300">
          <p>&copy; 2026 LeadQ.AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

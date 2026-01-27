import { Sparkles, Bot, DollarSign, Mail, Briefcase, GitBranch, LayoutDashboard, HelpCircle, PenLine } from 'lucide-react';
import { NavBar } from './components/ui/tubelight-navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import UseCases from './components/UseCases';
import LeadCaptureStream from './components/LeadCaptureStream';
import Agents from './components/Agents';
import Workflow from './components/Workflow';
import DashboardPreview from './components/DashboardPreview';
import EmailDraftAnimation from './components/EmailDraftAnimation';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import SkipToContent from './components/SkipToContent';
import CookieConsent from './components/CookieConsent';

function App() {
  const navItems = [
    { name: 'Features', url: '#features', icon: Sparkles },
    { name: 'Use Cases', url: '#use-cases', icon: Briefcase },
    { name: 'AI Agents', url: '#agents', icon: Bot },
    { name: 'Workflow', url: '#workflow', icon: GitBranch },
    { name: 'Dashboard', url: '#dashboard', icon: LayoutDashboard },
    { name: 'Email Draft', url: '#email-draft', icon: PenLine },
    { name: 'Pricing', url: '#pricing', icon: DollarSign },
    { name: 'FAQ', url: '#faq', icon: HelpCircle },
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
      <UseCases />
      <LeadCaptureStream />
      <Agents />
      <Workflow />
      <DashboardPreview />
      <section id="email-draft">
        <EmailDraftAnimation />
      </section>
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Contact />
      <ScrollToTop />
      <CookieConsent />

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

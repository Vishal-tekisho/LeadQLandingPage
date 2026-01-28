import { Sparkles, Bot, DollarSign, Mail, Briefcase, LayoutDashboard, HelpCircle, PenLine, ScanLine, UserPlus, Calendar } from 'lucide-react';
import { NavBar } from './components/ui/tubelight-navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import UseCases from './components/UseCases';
import LeadCaptureStream from './components/LeadCaptureStream';
import ProfileEnrichment from './components/ProfileResearch';
import DashboardPreview from './components/DashboardPreview';
import BookingsMeeting from './components/BookingsMeeting';
import EmailDraftAnimation from './components/EmailDraftAnimation';
import Agents from './components/Agents';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import SkipToContent from './components/SkipToContent';
import CookieConsent from './components/CookieConsent';

function App() {
  const navItems = [
    { name: 'Features', url: '#features', icon: Sparkles },
    { name: 'Use Cases', url: '#use-cases', icon: Briefcase },
    { name: 'Lead Capture', url: '#lead-capture', icon: ScanLine },
    { name: 'Enrichment', url: '#profile-enrichment', icon: UserPlus },
    { name: 'Dashboard', url: '#dashboard', icon: LayoutDashboard },
    { name: 'Bookings', url: '#bookings-meeting', icon: Calendar },
    { name: 'Email Draft', url: '#email-draft', icon: PenLine },
    { name: 'AI Agents', url: '#agents', icon: Bot },
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
      
      {/* 1. Hero Section */}
      <Hero />
      
      {/* 2. Features */}
      <Features />
      
      {/* 3. Use Cases */}
      <UseCases />
      
      {/* 4. Lead Capture Stream */}
      <LeadCaptureStream />
      
      {/* 5. Profile Enrichment (Placeholder) */}
      <ProfileEnrichment />
      
      {/* 6. Living Dashboard Preview */}
      <DashboardPreview />
      
      {/* 7. Bookings & Meeting Diarization (Placeholder) */}
      <BookingsMeeting />
      
      {/* 8. Email Draft Animation */}
      <section id="email-draft">
        <EmailDraftAnimation />
      </section>
      
      {/* 9. AI Agents */}
      <Agents />
      
      {/* 10. Pricing */}
      <Pricing />
      
      {/* 11. FAQ */}
      <FAQ />
      
      {/* 12. Get in Touch / Contact */}
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

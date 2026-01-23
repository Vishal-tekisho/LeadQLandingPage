import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong shadow-lg shadow-black/10' : 'glass'
      } border-b border-white/10`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-display font-bold focus:outline-none focus:ring-2 focus:ring-leadq-amber focus:ring-offset-2 focus:ring-offset-leadq-bg rounded-lg px-2 py-1" aria-label="LeadQ.AI Home">
              <span className="text-leadq-white">Lead</span>
              <span className="text-white">Q</span>
              <span className="text-leadq-white">.AI</span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <a
              href="#features"
              className="px-4 py-2 text-gray-300 hover:text-leadq-amber transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-leadq-amber focus:ring-offset-2 focus:ring-offset-leadq-bg"
            >
              Features
            </a>
            <a
              href="#agents"
              className="px-4 py-2 text-gray-300 hover:text-leadq-amber transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-leadq-amber focus:ring-offset-2 focus:ring-offset-leadq-bg"
            >
              AI Agents
            </a>
            <a
              href="#pricing"
              className="px-4 py-2 text-gray-300 hover:text-leadq-amber transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-leadq-amber focus:ring-offset-2 focus:ring-offset-leadq-bg"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="px-4 py-2 text-gray-300 hover:text-leadq-amber transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-leadq-amber focus:ring-offset-2 focus:ring-offset-leadq-bg"
            >
              Contact
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <button className="px-5 py-2 text-white hover:text-leadq-amber transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-leadq-amber focus:ring-offset-2 focus:ring-offset-leadq-bg">
              Login
            </button>
            <button className="
  px-6 py-2 rounded-lg font-medium text-white
  bg-gradient-to-br from-black via-neutral-900 to-amber-600
  hover:to-amber-500
  shadow-md shadow-amber-500/25
  hover:shadow-lg hover:shadow-amber-500/45
  transition-all duration-300
  focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black
">

              Get Started
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-leadq-amber focus:ring-offset-2 focus:ring-offset-leadq-bg"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden glass-strong border-t border-white/10 py-4 animate-slideDown"
          >
            <div className="flex flex-col space-y-2 px-2">
              <a
                href="#features"
                onClick={handleLinkClick}
                className="px-4 py-3 text-gray-300 hover:text-leadq-amber hover:bg-white/5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-leadq-amber focus:ring-offset-2 focus:ring-offset-leadq-bg"
              >
                Features
              </a>
              <a
                href="#agents"
                onClick={handleLinkClick}
                className="px-4 py-3 text-gray-300 hover:text-leadq-amber hover:bg-white/5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-leadq-amber focus:ring-offset-2 focus:ring-offset-leadq-bg"
              >
                AI Agents
              </a>
              <a
                href="#pricing"
                onClick={handleLinkClick}
                className="px-4 py-3 text-gray-300 hover:text-leadq-amber hover:bg-white/5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-leadq-amber focus:ring-offset-2 focus:ring-offset-leadq-bg"
              >
                Pricing
              </a>
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="px-4 py-3 text-gray-300 hover:text-leadq-amber hover:bg-white/5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-leadq-amber focus:ring-offset-2 focus:ring-offset-leadq-bg"
              >
                Contact
              </a>
              <div className="pt-4 space-y-2 border-t border-white/10">
                <button className="w-full px-4 py-3 text-white hover:text-leadq-amber hover:bg-white/5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-leadq-amber focus:ring-offset-2 focus:ring-offset-leadq-bg">
                  Login
                </button>
                <button className="w-full px-4 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-black to-amber-600 hover:shadow-lg hover:shadow-amber-600/50 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-leadq-bg">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

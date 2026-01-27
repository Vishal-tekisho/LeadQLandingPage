import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, CheckCircle, Settings } from 'lucide-react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('leadq-cookie-consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('leadq-cookie-consent', JSON.stringify({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
    // TODO: Initialize analytics tracking here
  };

  const handleDecline = () => {
    localStorage.setItem('leadq-cookie-consent', JSON.stringify({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  const handleSavePreferences = (preferences: { analytics: boolean; marketing: boolean }) => {
    localStorage.setItem('leadq-cookie-consent', JSON.stringify({
      essential: true,
      ...preferences,
      timestamp: new Date().toISOString()
    }));
    setShowPreferences(false);
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            onClick={() => setShowPreferences(false)}
          />

          {/* Main Banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[101] p-4 md:p-6"
          >
            <div className="max-w-7xl mx-auto">
              <div className="glass-strong rounded-2xl border border-white/20 shadow-2xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Icon & Content */}
                  <div className="flex-1 flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-leadq-amber/20 to-leadq-cyan/20 flex items-center justify-center">
                        <Cookie className="text-leadq-amber" size={24} />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-display font-bold mb-2">
                        We Value Your Privacy
                      </h3>
                      <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                        We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                        By clicking "Accept All", you consent to our use of cookies. Read our{' '}
                        <a href="/privacy-policy" className="text-leadq-amber hover:text-leadq-cyan transition-colors underline">
                          Privacy Policy
                        </a>
                        {' '}to learn more.
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <button
                      onClick={() => setShowPreferences(true)}
                      className="glass px-6 py-3 rounded-xl border border-white/10 hover:glass-strong transition-all flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Settings size={18} />
                      <span>Preferences</span>
                    </button>
                    
                    <button
                      onClick={handleDecline}
                      className="glass px-6 py-3 rounded-xl border border-white/10 hover:glass-strong transition-all flex items-center justify-center gap-2 text-sm font-medium text-gray-300 hover:text-white"
                    >
                      <X size={18} />
                      <span>Decline</span>
                    </button>
                    
                    <button
                      onClick={handleAcceptAll}
                      className="bg-gradient-to-r from-leadq-amber to-leadq-cyan px-6 py-3 rounded-xl font-semibold text-white shadow-glow hover:shadow-glow-strong transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <CheckCircle size={18} />
                      <span>Accept All</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Preferences Modal */}
          <AnimatePresence>
            {showPreferences && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[102] w-[90%] max-w-2xl"
              >
                <PreferencesModal
                  onSave={handleSavePreferences}
                  onClose={() => setShowPreferences(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

interface PreferencesModalProps {
  onSave: (preferences: { analytics: boolean; marketing: boolean }) => void;
  onClose: () => void;
}

const PreferencesModal = ({ onSave, onClose }: PreferencesModalProps) => {
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  const cookieTypes = [
    {
      id: 'essential',
      title: 'Essential Cookies',
      description: 'Required for the website to function properly. These cannot be disabled.',
      enabled: true,
      locked: true
    },
    {
      id: 'analytics',
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website by collecting anonymous data.',
      enabled: analytics,
      onChange: setAnalytics,
      locked: false
    },
    {
      id: 'marketing',
      title: 'Marketing Cookies',
      description: 'Used to track visitors across websites to display relevant advertisements.',
      enabled: marketing,
      onChange: setMarketing,
      locked: false
    }
  ];

  return (
    <div className="glass-strong rounded-2xl border border-white/20 shadow-2xl p-6 md:p-8 max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-display font-bold">Cookie Preferences</h3>
        <button
          onClick={onClose}
          className="glass p-2 rounded-lg hover:glass-strong transition-all"
          aria-label="Close preferences"
        >
          <X size={20} />
        </button>
      </div>

      <p className="text-gray-300 mb-6">
        Customize your cookie preferences below. You can change these settings at any time.
      </p>

      <div className="space-y-4 mb-8">
        {cookieTypes.map((cookie) => (
          <div key={cookie.id} className="glass p-4 rounded-xl border border-white/10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{cookie.title}</h4>
                <p className="text-sm text-gray-400">{cookie.description}</p>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={cookie.enabled}
                  onChange={(e) => !cookie.locked && cookie.onChange?.(e.target.checked)}
                  disabled={cookie.locked}
                  className="sr-only peer"
                />
                <div className={`w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-leadq-amber/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-leadq-amber peer-checked:to-leadq-cyan ${cookie.locked ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 glass px-6 py-3 rounded-xl border border-white/10 hover:glass-strong transition-all font-medium"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave({ analytics, marketing })}
          className="flex-1 bg-gradient-to-r from-leadq-amber to-leadq-cyan px-6 py-3 rounded-xl font-semibold text-white shadow-glow hover:shadow-glow-strong transition-all"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;

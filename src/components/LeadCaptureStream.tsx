import { useState, useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Mail, Phone, Linkedin, Briefcase, Scan, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

const LOTTIE_URL = 'https://lottie.host/2e6e9c91-c9e7-4c14-b14d-3ac7e7e78c4a/fZQYSdIyEk.json';

interface LeadCard {
  name: string;
  company: string;
  role: string;
  email?: string;
  phone?: string;
  linkedin?: string;
}

const fallbackCards: LeadCard[] = [
  { name: 'James Peterson', company: 'TechFlow', role: 'Sales Director', email: 'james@techflow.com', phone: '+1 (555) 123-4567', linkedin: '@james-peterson' },
  { name: 'Liam Rogers', company: 'GreenTech', role: 'VP Marketing', email: 'liam@greentech.com', phone: '+1 (555) 234-5678', linkedin: '@liam-rogers' },
  { name: 'David Thompson', company: 'Pinkling', role: 'Creative Strategist', email: 'david@pinkling.com', phone: '+1 (646) 555-1234', linkedin: '@david-thompson' },
  { name: 'Anna Collins', company: 'ACME Co', role: 'Business Dev', email: 'anna@acme.co', phone: '+1 (555) 345-6789', linkedin: '@anna-collins' },
  { name: 'Emily Carter', company: 'Hexaflow', role: 'VP Sales', email: 'emily@hexaflow.com', phone: '+1 (555) 456-7890', linkedin: '@emily-carter' },
  { name: 'Sarah Chen', company: 'DataSync', role: 'Account Executive', email: 'sarah@datasync.com', phone: '+1 (555) 567-8901', linkedin: '@sarah-chen' },
];

function FallbackCard({ name, company, role }: { name: string; company: string; role: string }) {
  return (
    <div className="flex-shrink-0 w-48 h-28 mx-4 rounded-xl glass p-4 flex flex-col justify-between hover:scale-105 transition-transform">
      <div>
        <p className="font-semibold text-white text-sm">{name}</p>
        <p className="text-xs text-gray-400">{role}</p>
      </div>
      <p className="text-[10px] text-leadq-cyan">{company}</p>
    </div>
  );
}

function FallbackMarquee() {
  const duplicatedCards = [...fallbackCards, ...fallbackCards];

  return (
    <div className="absolute inset-0 flex items-center overflow-hidden">
      <div className="flex items-center animate-marquee">
        {duplicatedCards.map((card, index) => (
          <FallbackCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}

interface PhoneScannerOverlayProps {
  lead: LeadCard;
  leadIndex: number;
  totalLeads: number;
  isScanning: boolean;
  showEnriched: boolean;
  onNextLead: () => void;
  onPrevLead: () => void;
  onToggleView: () => void;
}

function PhoneScannerOverlay({
  lead,
  leadIndex,
  totalLeads,
  isScanning,
  showEnriched,
  onNextLead,
  onPrevLead,
  onToggleView,
}: PhoneScannerOverlayProps) {
  return (
    <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="relative w-64 md:w-72">
        <div className="relative rounded-[2.5rem] border-4 border-gray-700 bg-black/80 backdrop-blur-sm p-2 shadow-2xl">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10" />

          <div className="relative rounded-[2rem] bg-gradient-to-b from-gray-900/90 to-black/90 overflow-hidden min-h-[420px]">
            <div className="flex items-center justify-between px-6 py-2 text-gray-400 text-xs">
              <span>9:21</span>
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  <div className="w-1 h-2 bg-gray-400 rounded-sm" />
                  <div className="w-1 h-2.5 bg-gray-400 rounded-sm" />
                  <div className="w-1 h-3 bg-gray-400 rounded-sm" />
                  <div className="w-1 h-3.5 bg-gray-400 rounded-sm" />
                </div>
                <div className="w-5 h-2.5 border border-gray-400 rounded-sm ml-1">
                  <div className="w-3/4 h-full bg-gray-400 rounded-sm" />
                </div>
              </div>
            </div>

            <div className="px-4 py-4">
              {/* Header with toggle */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Scan className="w-5 h-5 text-leadq-amber" />
                  <span className="text-leadq-amber font-semibold text-sm">Digitization Agent</span>
                </div>
                <button
                  onClick={onToggleView}
                  className="text-[10px] bg-leadq-amber/20 text-leadq-amber px-2 py-1 rounded hover:bg-leadq-amber/30 transition-colors"
                >
                  {showEnriched ? 'Raw' : 'Enriched'}
                </button>
              </div>

              {/* Scan area */}
              <div className="relative border-2 border-dashed border-leadq-amber/50 rounded-xl p-4 mb-4">
                <div className="absolute inset-0 bg-leadq-amber/5 rounded-xl" />
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-leadq-amber rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-leadq-amber rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-leadq-amber rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-leadq-amber rounded-br-lg" />

                <div className="relative z-10 text-center py-4">
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-leadq-amber/20 flex items-center justify-center ${isScanning ? 'animate-pulse' : ''}`}>
                    <Scan className={`w-6 h-6 text-leadq-amber ${isScanning ? 'animate-spin' : ''}`} />
                  </div>
                  <p className="text-xs text-gray-400">
                    {isScanning ? 'Scanning...' : 'Ready to scan'}
                  </p>
                </div>

                {/* Scan line animation */}
                {isScanning && (
                  <div className="absolute inset-x-0 top-0 h-full overflow-hidden rounded-xl pointer-events-none">
                    <div 
                      className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-leadq-amber to-transparent"
                      style={{ animation: 'scanLine 1s ease-in-out infinite' }} 
                    />
                  </div>
                )}
              </div>

              {/* Lead details card */}
              <div className={`glass rounded-xl p-4 transition-all duration-300 ${isScanning ? 'opacity-50' : 'opacity-100'}`}>
                {showEnriched ? (
                  <>
                    <div className="flex gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{lead.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm truncate">{lead.name}</p>
                        <p className="text-xs text-leadq-amber truncate">{lead.role}</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Mail size={10} className="flex-shrink-0" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Phone size={10} className="flex-shrink-0" />
                        <span>{lead.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Linkedin size={10} className="flex-shrink-0" />
                        <span>{lead.linkedin}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Briefcase size={10} className="flex-shrink-0" />
                        <span>{lead.company}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-[10px] text-gray-300 space-y-1 font-mono">
                    <p className="text-leadq-amber">// Raw scan data</p>
                    <p>NAME: {lead.name}</p>
                    <p>ROLE: {lead.role}</p>
                    <p>COMPANY: {lead.company}</p>
                    <p className="text-gray-500">// Enrichment pending...</p>
                    <p className="text-gray-500">EMAIL: [extracting...]</p>
                    <p className="text-gray-500">PHONE: [extracting...]</p>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-3">
                <button
                  onClick={onPrevLead}
                  className="flex items-center gap-1 text-gray-400 hover:text-leadq-amber transition-colors text-xs"
                >
                  <ChevronLeft size={14} />
                  <span>Prev</span>
                </button>
                <span className="text-[10px] text-gray-500">
                  {leadIndex + 1} / {totalLeads}
                </span>
                <button
                  onClick={onNextLead}
                  className="flex items-center gap-1 text-gray-400 hover:text-leadq-amber transition-colors text-xs"
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

export default function LeadCaptureStream() {
  const [lottieError, setLottieError] = useState(false);
  const [lottieLoaded, setLottieLoaded] = useState(false);
  
  // Interactive state
  const [currentLeadIndex, setCurrentLeadIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [showEnriched, setShowEnriched] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!lottieLoaded) {
        setLottieError(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [lottieLoaded]);

  // Scan animation handler
  const handleScanClick = () => {
    if (isScanning) return;
    setIsScanning(true);
    setShowEnriched(false);
    
    // Show raw data first, then switch to enriched after scan completes
    setTimeout(() => {
      setCurrentLeadIndex((prev) => (prev + 1) % fallbackCards.length);
      setShowEnriched(true);
      setIsScanning(false);
    }, 1500);
  };

  // Navigation handlers
  const handleNextLead = () => {
    if (isScanning) return;
    setCurrentLeadIndex((prev) => (prev + 1) % fallbackCards.length);
  };

  const handlePrevLead = () => {
    if (isScanning) return;
    setCurrentLeadIndex((prev) => (prev - 1 + fallbackCards.length) % fallbackCards.length);
  };

  // Toggle view handler
  const handleToggleView = () => {
    setShowEnriched(!showEnriched);
  };

  const currentLead = fallbackCards[currentLeadIndex];

  return (
    <section className="relative z-10 py-24 px-4 overflow-hidden">
      <style>{`
        @keyframes scanLine {
          0%, 100% { top: 0; opacity: 1; }
          50% { top: 100%; opacity: 0.5; }
        }
        @keyframes scanPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(245, 158, 11, 0); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="glass px-4 py-2 rounded-full text-sm font-medium text-leadq-amber border border-leadq-amber/20 inline-block mb-6">
            AI-Powered Universal Lead Capture
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Turn Every Scan Into Revenue
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Scan conference badges, business cards, LinkedIn QR codes, and more - instantly validate, qualify, enrich, and sync.
          </p>
          
          {/* Scan Now Button */}
          <button
            onClick={handleScanClick}
            disabled={isScanning}
            className={`
              inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
              transition-all duration-300 transform
              ${isScanning 
                ? 'bg-leadq-amber/20 text-leadq-amber/50 cursor-not-allowed scale-95' 
                : 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 hover:scale-105 shadow-lg shadow-amber-500/25'
              }
            `}
            style={isScanning ? {} : { animation: 'scanPulse 2s infinite' }}
          >
            <Zap size={18} className={isScanning ? 'animate-spin' : ''} />
            {isScanning ? 'Scanning...' : 'Scan Now'}
          </button>
        </div>

        <div className="relative w-full h-[500px] flex items-center justify-center">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-leadq-bg to-transparent z-30 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-leadq-bg to-transparent z-30 pointer-events-none" />

          {!lottieError ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Player
                src={LOTTIE_URL}
                loop
                autoplay
                background="transparent"
                style={{ width: '100%', height: '100%' }}
                onEvent={(event) => {
                  if (event === 'load') setLottieLoaded(true);
                  if (event === 'error') setLottieError(true);
                }}
              />
            </div>
          ) : (
            <FallbackMarquee />
          )}

          <PhoneScannerOverlay
            lead={currentLead}
            leadIndex={currentLeadIndex}
            totalLeads={fallbackCards.length}
            isScanning={isScanning}
            showEnriched={showEnriched}
            onNextLead={handleNextLead}
            onPrevLead={handlePrevLead}
            onToggleView={handleToggleView}
          />
        </div>
      </div>
    </section>
  );
}

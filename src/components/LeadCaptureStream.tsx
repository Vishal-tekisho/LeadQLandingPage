import { useState, useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Mail, Phone, Linkedin, Briefcase, Scan } from 'lucide-react';

const LOTTIE_URL = 'https://lottie.host/2e6e9c91-c9e7-4c14-b14d-3ac7e7e78c4a/fZQYSdIyEk.json';

const fallbackCards = [
  { name: 'James Peterson', company: 'TechFlow', role: 'Sales Director' },
  { name: 'Liam Rogers', company: 'GreenTech', role: 'VP Marketing' },
  { name: 'David Thompson', company: 'Pinkling', role: 'Creative Strategist' },
  { name: 'Anna Collins', company: 'ACME Co', role: 'Business Dev' },
  { name: 'Emily Carter', company: 'Hexaflow', role: 'VP Sales' },
  { name: 'Sarah Chen', company: 'DataSync', role: 'Account Executive' },
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

function PhoneScannerOverlay() {
  return (
    <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="relative w-64 md:w-72">
        <div className="relative rounded-[2.5rem] border-4 border-gray-700 bg-black/80 backdrop-blur-sm p-2 shadow-2xl">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10" />

          <div className="relative rounded-[2rem] bg-gradient-to-b from-gray-900/90 to-black/90 overflow-hidden min-h-[350px]">
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
              <div className="flex items-center justify-center gap-2 mb-4">
                <Scan className="w-5 h-5 text-leadq-amber" />
                <span className="text-leadq-amber font-semibold">Digitization Agent</span>
              </div>

              <div className="relative border-2 border-dashed border-leadq-amber/50 rounded-xl p-6 mb-4">
                <div className="absolute inset-0 bg-leadq-amber/5 rounded-xl" />
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-leadq-amber rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-leadq-amber rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-leadq-amber rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-leadq-amber rounded-br-lg" />

                <div className="relative z-10 text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-leadq-amber/20 flex items-center justify-center">
                    <Scan className="w-8 h-8 text-leadq-amber animate-pulse" />
                  </div>
                  <p className="text-sm text-gray-400">Scanning leads...</p>
                </div>

                <div className="absolute inset-x-0 top-0 h-full overflow-hidden rounded-xl">
                  <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-leadq-amber to-transparent animate-scan-line"
                       style={{ animation: 'scanLine 2s ease-in-out infinite' }} />
                </div>
              </div>

              <div className="glass rounded-xl p-4">
                <div className="flex gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">D</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white text-sm">David Thompson</p>
                    <p className="text-xs text-leadq-amber">Creative Strategist</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Mail size={12} />
                    <span>david@pinkling.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Phone size={12} />
                    <span>+1 (646) 555-1234</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Linkedin size={12} />
                    <span>@david-thompson</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Briefcase size={12} />
                    <span>Pinkling</span>
                  </div>
                </div>
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!lottieLoaded) {
        setLottieError(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [lottieLoaded]);

  return (
    <section className="relative z-10 py-24 px-4 overflow-hidden">
      <style>{`
        @keyframes scanLine {
          0%, 100% { top: 0; opacity: 1; }
          50% { top: 100%; opacity: 0.5; }
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
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Scan conference badges, business cards, LinkedIn QR codes, and more - instantly validate, qualify, enrich, and sync.
          </p>
        </div>

        <div className="relative w-full h-[400px] flex items-center justify-center">
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

          <PhoneScannerOverlay />
        </div>
      </div>
    </section>
  );
}

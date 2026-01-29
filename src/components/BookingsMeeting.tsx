import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import {
  Calendar,
  Mic,
  Webhook,
  UserPlus,
  Building2,
  User,
  Link2,
  Radio,
  Camera,
  FileText,
  CheckCircle2,
  Clock,
  ChevronRight,
  Sparkles,
  Image,
  Upload,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

type AnimationStage =
  | 'idle'
  | 'booking-webhook'
  | 'booking-offline'
  | 'context-linking'
  | 'live-transcription'
  | 'proof-upload'
  | 'ai-summary'
  | 'dashboard';

interface Meeting {
  id: string;
  title: string;
  contact: string;
  company: string;
  time: string;
  status: 'upcoming' | 'completed';
  avatar: string;
}

// Typing indicator component
const TypingIndicator = () => (
  <div className="flex items-center gap-1">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: i * 0.15,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
);

// Waveform bar component for transcription
const WaveformBar = ({ index, isActive }: { index: number; isActive: boolean }) => (
  <motion.div
    className="w-1 bg-gradient-to-t from-cyan-500 to-amber-400 rounded-full"
    animate={isActive ? {
      height: [8, 24 + Math.random() * 16, 12, 32 + Math.random() * 8, 8],
    } : { height: 8 }}
    transition={{
      duration: 0.8,
      repeat: isActive ? Infinity : 0,
      delay: index * 0.1,
      ease: "easeInOut"
    }}
  />
);

// Pulsing connection dot
const PulsingDot = ({ color = 'cyan' }: { color?: 'cyan' | 'amber' | 'green' }) => {
  const colorClasses = {
    cyan: 'bg-cyan-400',
    amber: 'bg-amber-400',
    green: 'bg-green-400'
  };

  return (
    <span className="relative flex h-2 w-2">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colorClasses[color]} opacity-75`} />
      <span className={`relative inline-flex rounded-full h-2 w-2 ${colorClasses[color]}`} />
    </span>
  );
};

// Stage indicator component
const StageIndicator = ({ stages, currentStage }: { stages: string[]; currentStage: number }) => (
  <div className="flex items-center justify-center gap-2 mb-6">
    {stages.map((_, index) => (
      <motion.div
        key={index}
        className={`h-1.5 rounded-full transition-all duration-300 ${index <= currentStage ? 'bg-gradient-to-r from-cyan-400 to-amber-400' : 'bg-white/20'
          }`}
        animate={{ width: index === currentStage ? 24 : 8 }}
        transition={{ duration: 0.3 }}
      />
    ))}
  </div>
);

export default function BookingsMeeting() {
  const [stage, setStage] = useState<AnimationStage>('idle');
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcriptLines, setTranscriptLines] = useState<string[]>([]);
  const [dashboardView, setDashboardView] = useState<'upcoming' | 'completed'>('upcoming');
  const [momSections, setMomSections] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const stages: AnimationStage[] = [
    'idle',
    'booking-webhook',
    'booking-offline',
    'context-linking',
    'live-transcription',
    'proof-upload',
    'ai-summary',
    'dashboard'
  ];

  const stageIndex = stages.indexOf(stage);

  const transcriptData = [
    { speaker: 'Sarah Chen', text: "Let's discuss the Q4 projections...", color: 'cyan' },
    { speaker: 'Mark Johnson', text: "I've prepared the revenue forecasts.", color: 'amber' },
    { speaker: 'Sarah Chen', text: "Great, can you share the key metrics?", color: 'cyan' },
    { speaker: 'Mark Johnson', text: "Year-over-year growth is at 34%.", color: 'amber' },
  ];

  const momData = [
    '📋 Meeting Summary',
    '👥 Attendees: Sarah Chen, Mark Johnson',
    '📈 Key Discussion: Q4 Revenue Projections',
    '✅ Action Items:',
    '   • Finalize Q4 forecast by Friday',
    '   • Schedule follow-up with finance team',
    '🎯 Next Steps: Review meeting scheduled for Monday'
  ];

  const meetings: Meeting[] = [
    { id: '1', title: 'Product Strategy Call', contact: 'Sarah Chen', company: 'TechCorp', time: 'Tomorrow, 2:00 PM', status: 'upcoming', avatar: 'SC' },
    { id: '2', title: 'Partnership Discussion', contact: 'Alex Rivera', company: 'InnovateLabs', time: 'Jan 30, 10:00 AM', status: 'upcoming', avatar: 'AR' },
    { id: '3', title: 'Q4 Review Meeting', contact: 'Mark Johnson', company: 'DataFlow', time: 'Jan 27, 3:00 PM', status: 'completed', avatar: 'MJ' },
    { id: '4', title: 'Sales Alignment', contact: 'Lisa Park', company: 'GrowthCo', time: 'Jan 26, 11:00 AM', status: 'completed', avatar: 'LP' },
  ];

  const runAnimation = useCallback(() => {
    setIsPlaying(true);
    setStage('idle');
    setTranscriptLines([]);
    setMomSections([]);
    setUploadProgress(0);

    const timings = [
      { stage: 'booking-webhook' as AnimationStage, delay: 1200 },
      { stage: 'booking-offline' as AnimationStage, delay: 3500 },
      { stage: 'context-linking' as AnimationStage, delay: 6000 },
      { stage: 'live-transcription' as AnimationStage, delay: 9000 },
      { stage: 'proof-upload' as AnimationStage, delay: 15000 },
      { stage: 'ai-summary' as AnimationStage, delay: 19000 },
      { stage: 'dashboard' as AnimationStage, delay: 24000 },
    ];

    timings.forEach(({ stage: s, delay }) => {
      setTimeout(() => setStage(s), delay);
    });

    // Transcript lines animation
    transcriptData.forEach((_, index) => {
      setTimeout(() => {
        setTranscriptLines(prev => [...prev, transcriptData[index].text]);
      }, 10000 + index * 1200);
    });

    // Upload progress animation
    for (let i = 0; i <= 100; i += 10) {
      setTimeout(() => setUploadProgress(i), 19200 + i * 25);
    }

    // MoM sections animation
    momData.forEach((_, index) => {
      setTimeout(() => {
        setMomSections(prev => [...prev, momData[index]]);
      }, 20500 + index * 500);
    });

    // Reset after complete
    setTimeout(() => {
      setIsPlaying(false);
    }, 28000);
  }, []);

  // No auto-start - animations are triggered on demand via play button

  return (
    <section id="bookings-meeting" className="relative z-10 py-24 px-4 bg-white/[0.02]">
      {/* Background ambient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-amber-500/10 border border-cyan-500/20 mb-6">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="text-sm bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent font-medium">
              Intelligent Meeting Module
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Bookings & Meeting{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">
              Intelligence
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Seamless scheduling, real-time transcription with speaker diarization, and AI-powered meeting summaries
          </p>

          {/* Stage Progress Indicator */}
          <StageIndicator stages={stages} currentStage={stageIndex} />

          {/* Main Animation Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-5xl mx-auto rounded-2xl glass border border-white/10 relative overflow-hidden"
          >
            {/* Window Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <span className="text-xs text-gray-500 font-mono">LeadQ Meeting Intelligence</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => isPlaying ? null : runAnimation()}
                  disabled={isPlaying}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Play className="w-4 h-4 text-cyan-400" />
                  )}
                </button>
                <button
                  onClick={runAnimation}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Animation Content */}
            <div className="p-6 md:p-8 min-h-[480px]">
              <AnimatePresence mode="wait">
                {/* IDLE STATE */}
                {stage === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-96"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mb-4"
                    >
                      <Calendar className="w-16 h-16 text-cyan-400/50" />
                    </motion.div>
                    <p className="text-gray-500">Initializing Meeting Intelligence...</p>
                    <TypingIndicator />
                  </motion.div>
                )}

                {/* BOOKING WEBHOOK */}
                {stage === 'booking-webhook' && (
                  <motion.div
                    key="booking-webhook"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-cyan-500/20">
                        <Webhook className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-white font-semibold">Webhook Sync Active</h3>
                        <p className="text-sm text-gray-400">Receiving booking from Calendly</p>
                      </div>
                      <PulsingDot color="green" />
                    </div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white/5 rounded-xl p-4 border border-cyan-500/20"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                          SC
                        </div>
                        <div className="text-left flex-1">
                          <p className="text-white font-medium">New Booking Received</p>
                          <p className="text-sm text-gray-400">Sarah Chen - Product Demo</p>
                        </div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5, type: "spring" }}
                        >
                          <CheckCircle2 className="w-6 h-6 text-green-400" />
                        </motion.div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-white/5 rounded-lg p-2">
                          <span className="text-gray-500">Date:</span>
                          <span className="text-white ml-2">Jan 29, 2026</span>
                        </div>
                        <div className="bg-white/5 rounded-lg p-2">
                          <span className="text-gray-500">Time:</span>
                          <span className="text-white ml-2">2:00 PM EST</span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="flex items-center justify-center gap-2 text-sm text-gray-400"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Automatically synced with your calendar</span>
                    </motion.div>
                  </motion.div>
                )}

                {/* BOOKING OFFLINE */}
                {stage === 'booking-offline' && (
                  <motion.div
                    key="booking-offline"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-amber-500/20">
                        <UserPlus className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-white font-semibold">Offline Meeting Logged</h3>
                        <p className="text-sm text-gray-400">Manual entry for networking event</p>
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white/5 rounded-xl p-4 border border-amber-500/20"
                    >
                      <div className="space-y-3">
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-center gap-3"
                        >
                          <User className="w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value="Alex Rivera"
                            readOnly
                            className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-white text-sm border border-white/10"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                          className="flex items-center gap-3"
                        >
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value="InnovateLabs Inc."
                            readOnly
                            className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-white text-sm border border-white/10"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 }}
                          className="flex items-center gap-3"
                        >
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value="Tech Conference 2026"
                            readOnly
                            className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-white text-sm border border-white/10"
                          />
                        </motion.div>
                      </div>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium flex items-center gap-2 mx-auto"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Meeting Saved
                    </motion.button>
                  </motion.div>
                )}

                {/* CONTEXT LINKING */}
                {stage === 'context-linking' && (
                  <motion.div
                    key="context-linking"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-purple-500/20">
                        <Link2 className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-white font-semibold">Smart Context Linking</h3>
                        <p className="text-sm text-gray-400">Connecting to Contact & Company profiles</p>
                      </div>
                    </div>

                    <div className="relative py-8">
                      {/* Connection visualization */}
                      <div className="flex items-center justify-center gap-8 md:gap-16">
                        <motion.div
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex flex-col items-center"
                        >
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-2">
                            <User className="w-8 h-8 text-white" />
                          </div>
                          <span className="text-sm text-white">Sarah Chen</span>
                          <span className="text-xs text-gray-400">Contact</span>
                        </motion.div>

                        {/* Animated connection lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                          <motion.line
                            x1="30%"
                            y1="50%"
                            x2="50%"
                            y2="50%"
                            stroke="url(#gradient1)"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                          />
                          <motion.line
                            x1="50%"
                            y1="50%"
                            x2="70%"
                            y2="50%"
                            stroke="url(#gradient1)"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                          />
                          <defs>
                            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#06b6d4" />
                              <stop offset="100%" stopColor="#f59e0b" />
                            </linearGradient>
                          </defs>
                        </svg>

                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6, type: "spring" }}
                          className="flex flex-col items-center relative z-10"
                        >
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-2 shadow-lg shadow-purple-500/30">
                            <Calendar className="w-10 h-10 text-white" />
                          </div>
                          <span className="text-sm text-white font-medium">Meeting</span>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex flex-col items-center"
                        >
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-2">
                            <Building2 className="w-8 h-8 text-white" />
                          </div>
                          <span className="text-sm text-white">TechCorp</span>
                          <span className="text-xs text-gray-400">Company</span>
                        </motion.div>
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="bg-white/5 rounded-lg p-3 border border-purple-500/20"
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">Historical context loaded: 5 previous meetings, 12 emails</span>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* LIVE TRANSCRIPTION */}
                {stage === 'live-transcription' && (
                  <motion.div
                    key="live-transcription"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-red-500/20">
                          <Radio className="w-5 h-5 text-red-400" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-white font-semibold">Live Transcription</h3>
                          <p className="text-sm text-gray-400">Real-time speaker diarization</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30">
                        <PulsingDot color="green" />
                        <span className="text-xs text-red-400 font-medium">LIVE</span>
                      </div>
                    </div>

                    {/* Waveform visualizer */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center justify-center gap-1 h-12 mb-4"
                    >
                      {Array.from({ length: 24 }).map((_, i) => (
                        <WaveformBar key={i} index={i} isActive={true} />
                      ))}
                    </motion.div>

                    {/* Transcript lines */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {transcriptData.map((line, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{
                            opacity: transcriptLines.length > index ? 1 : 0,
                            x: transcriptLines.length > index ? 0 : -20
                          }}
                          className="flex items-start gap-3"
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${line.color === 'cyan' ? 'bg-cyan-500' : 'bg-amber-500'
                            }`}>
                            {line.speaker.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1 text-left">
                            <p className={`text-sm font-medium ${line.color === 'cyan' ? 'text-cyan-400' : 'text-amber-400'
                              }`}>
                              {line.speaker}
                            </p>
                            <p className="text-gray-300">{line.text}</p>
                          </div>
                        </motion.div>
                      ))}
                      {transcriptLines.length < transcriptData.length && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                            <Mic className="w-4 h-4 text-gray-400" />
                          </div>
                          <TypingIndicator />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* PROOF UPLOAD */}
                {stage === 'proof-upload' && (
                  <motion.div
                    key="proof-upload"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-green-500/20">
                        <Camera className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-white font-semibold">Proof of Interaction</h3>
                        <p className="text-sm text-gray-400">Capture meeting evidence & notes</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { icon: Camera, label: 'Selfie', delay: 0.2 },
                        { icon: Image, label: 'Whiteboard', delay: 0.4 },
                        { icon: FileText, label: 'Notes', delay: 0.6 },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: item.delay, type: "spring" }}
                          className="relative aspect-square rounded-xl bg-white/5 border border-white/10 overflow-hidden group cursor-pointer"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: item.delay + 0.3 }}
                            className="absolute inset-0 flex flex-col items-center justify-center"
                          >
                            <item.icon className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-xs text-gray-500">{item.label}</span>
                          </motion.div>
                          {index === 0 && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.8, type: "spring" }}
                              className="absolute top-2 right-2"
                            >
                              <CheckCircle2 className="w-5 h-5 text-green-400" />
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Upload progress */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="bg-white/5 rounded-lg p-4 border border-white/10"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Upload className="w-4 h-4 text-cyan-400" />
                          <span className="text-sm text-gray-300">Uploading evidence...</span>
                        </div>
                        <span className="text-sm text-cyan-400 font-mono">{uploadProgress}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-400 to-amber-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* AI SUMMARY */}
                {stage === 'ai-summary' && (
                  <motion.div
                    key="ai-summary"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-amber-500/20">
                        <Sparkles className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-white font-semibold">AI Post-Processing</h3>
                        <p className="text-sm text-gray-400">Generating Minutes of Meeting</p>
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-4 h-4 text-amber-400" />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white/5 rounded-xl p-4 border border-amber-500/20 text-left"
                    >
                      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                        <FileText className="w-5 h-5 text-amber-400" />
                        <span className="text-white font-medium">Minutes of Meeting</span>
                      </div>
                      <div className="space-y-2 font-mono text-sm">
                        {momSections.map((section, index) => (
                          <motion.p
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-gray-300"
                          >
                            {section}
                          </motion.p>
                        ))}
                        {momSections.length < momData.length && (
                          <div className="flex items-center gap-2">
                            <TypingIndicator />
                            <span className="text-gray-500 text-xs">Generating...</span>
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {momSections.length === momData.length && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-4"
                      >
                        <button className="px-4 py-2 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm flex items-center gap-2 hover:bg-amber-500/30 transition-colors">
                          <FileText className="w-4 h-4" />
                          Export PDF
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-sm flex items-center gap-2 hover:bg-cyan-500/30 transition-colors">
                          <CheckCircle2 className="w-4 h-4" />
                          Approve & Save
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* DASHBOARD VIEW */}
                {stage === 'dashboard' && (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/20">
                          <Calendar className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-white font-semibold">Dynamic Dashboard</h3>
                          <p className="text-sm text-gray-400">Smart meeting organization</p>
                        </div>
                      </div>
                    </div>

                    {/* Tab toggle */}
                    <div className="flex items-center justify-center gap-2 bg-white/5 rounded-lg p-1 max-w-md mx-auto">
                      <button
                        onClick={() => setDashboardView('upcoming')}
                        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${dashboardView === 'upcoming'
                            ? 'bg-cyan-500 text-white'
                            : 'text-gray-400 hover:text-white'
                          }`}
                      >
                        <Clock className="w-4 h-4 inline mr-2" />
                        Upcoming (3 Days)
                      </button>
                      <button
                        onClick={() => setDashboardView('completed')}
                        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${dashboardView === 'completed'
                            ? 'bg-green-500 text-white'
                            : 'text-gray-400 hover:text-white'
                          }`}
                      >
                        <CheckCircle2 className="w-4 h-4 inline mr-2" />
                        Completed
                      </button>
                    </div>

                    {/* Meeting cards */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={dashboardView}
                        initial={{ opacity: 0, x: dashboardView === 'upcoming' ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: dashboardView === 'upcoming' ? 20 : -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3"
                      >
                        {meetings
                          .filter(m => m.status === dashboardView)
                          .map((meeting, index) => (
                            <motion.div
                              key={meeting.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.02, y: -2 }}
                              className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${meeting.status === 'upcoming'
                                    ? 'bg-gradient-to-br from-cyan-400 to-blue-500'
                                    : 'bg-gradient-to-br from-green-400 to-emerald-500'
                                  }`}>
                                  {meeting.avatar}
                                </div>
                                <div className="flex-1 text-left">
                                  <p className="text-white font-medium">{meeting.title}</p>
                                  <p className="text-sm text-gray-400">
                                    {meeting.contact} • {meeting.company}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-gray-400">{meeting.time}</p>
                                  <div className="flex items-center gap-1 justify-end mt-1">
                                    {meeting.status === 'completed' && (
                                      <span className="text-xs text-green-400 flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" />
                                        MoM Ready
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-500" />
                              </div>
                            </motion.div>
                          ))}
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto"
          >
            {[
              { icon: Webhook, label: 'Webhook Sync', color: 'cyan' },
              { icon: Radio, label: 'Live Transcription', color: 'red' },
              { icon: Camera, label: 'Proof Capture', color: 'green' },
              { icon: Sparkles, label: 'AI Summaries', color: 'amber' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`p-4 rounded-xl bg-white/5 border border-white/10 hover:border-${feature.color}-500/30 transition-all cursor-pointer`}
              >
                <feature.icon className={`w-6 h-6 text-${feature.color}-400 mx-auto mb-2`} />
                <p className="text-sm text-gray-400">{feature.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

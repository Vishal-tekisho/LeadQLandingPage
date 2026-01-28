import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import {
  UserPlus,
  Sparkles,
  Search,
  Linkedin,
  Building2,
  Globe,
  CheckCircle2,
  Shield,
  Brain,
  Link2,
  Zap,
  RefreshCw,
  User,
  Briefcase,
  Mail,
  MapPin,
  Filter,
  FileText,
} from 'lucide-react';

// Types
type Stage = 'idle' | 'input' | 'researching' | 'disambiguating' | 'enriching' | 'complete';

interface ProfileData {
  name: string;
  company: string;
  role: string;
}

interface EnrichedProfile {
  name: string;
  role: string;
  company: string;
  email: string;
  location: string;
  linkedin: string;
  experience: string;
  summary: string;
  verified: boolean;
}

interface CandidateProfile {
  id: number;
  name: string;
  role: string;
  company: string;
  confidence: number;
  isCorrect: boolean;
}

// Mock data
const INPUT_PROFILE: ProfileData = {
  name: 'Sarah Chen',
  company: 'TechFlow Inc',
  role: 'VP of Sales',
};

const ENRICHED_PROFILE: EnrichedProfile = {
  name: 'Sarah Chen',
  role: 'VP of Sales',
  company: 'TechFlow Inc',
  email: 'sarah.chen@techflow.io',
  location: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/sarahchen-sales',
  experience: '12+ years in B2B SaaS',
  summary: 'Experienced sales leader with a track record of scaling revenue teams from seed to Series C. Expert in enterprise sales, team building, and go-to-market strategy.',
  verified: true,
};

const CANDIDATE_PROFILES: CandidateProfile[] = [
  { id: 1, name: 'Sarah Chen', role: 'Software Engineer', company: 'Google', confidence: 23, isCorrect: false },
  { id: 2, name: 'Sarah Chen', role: 'VP of Sales', company: 'TechFlow Inc', confidence: 94, isCorrect: true },
  { id: 3, name: 'Sarah Chen', role: 'Marketing Manager', company: 'Salesforce', confidence: 31, isCorrect: false },
];

const WEB_SOURCES = [
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-400' },
  { id: 'company', name: 'Company DB', icon: Building2, color: 'text-amber-400' },
  { id: 'web', name: 'Web Signals', icon: Globe, color: 'text-cyan-400' },
];

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

// Sub-components
const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-3 py-2">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full bg-amber-500"
        animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

const AISparkle = ({ className = '' }: { className?: string }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
  >
    <Sparkles className="w-4 h-4 text-amber-400" />
  </motion.div>
);

const PulsingDot = ({ color = 'bg-green-500' }: { color?: string }) => (
  <span className="relative flex h-2.5 w-2.5">
    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`} />
    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${color}`} />
  </span>
);

const ScanLine = () => (
  <motion.div
    className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
    initial={{ top: 0, opacity: 0 }}
    animate={{ top: ['0%', '100%', '0%'], opacity: [0, 1, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
  />
);

// Stage indicator component
const StageIndicator = ({ currentStage, stages }: { currentStage: Stage; stages: { key: Stage; label: string; icon: React.ElementType }[] }) => {
  const currentIndex = stages.findIndex(s => s.key === currentStage);
  
  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap mb-8">
      {stages.map((stage, index) => {
        const Icon = stage.icon;
        const isActive = index === currentIndex;
        const isComplete = index < currentIndex;
        
        return (
          <div key={stage.key} className="flex items-center gap-2">
            <motion.div
              className={`flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : isComplete
                  ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                  : 'bg-white/5 text-gray-500 border border-white/10'
              }`}
              animate={isActive ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
            >
              <Icon className="w-3 h-3" />
              <span className="hidden sm:inline">{stage.label}</span>
            </motion.div>
            {index < stages.length - 1 && (
              <div className={`w-4 md:w-8 h-0.5 ${isComplete ? 'bg-green-500/50' : 'bg-white/10'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Input card component
const InputCard = ({ profile, isActive }: { profile: ProfileData; isActive: boolean }) => (
  <motion.div
    variants={slideInLeft}
    className="glass rounded-xl p-4 md:p-6 relative overflow-hidden"
  >
    {isActive && <ScanLine />}
    <div className="flex items-center gap-2 mb-4">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
      </div>
      <span className="text-xs text-gray-500 ml-2">Input Profile</span>
    </div>
    
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
          <span className="text-white font-bold text-lg">{profile.name.charAt(0)}</span>
        </div>
        <div>
          <p className="font-semibold text-white">{profile.name}</p>
          <p className="text-xs text-gray-400">Basic contact info</p>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-400">
          <Building2 className="w-4 h-4 text-amber-400/60" />
          <span>{profile.company}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Briefcase className="w-4 h-4 text-amber-400/60" />
          <span>{profile.role}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

// Research visualization component
const ResearchVisualization = ({ stage, activeSources }: { stage: Stage; activeSources: string[] }) => {
  const isResearching = stage === 'researching';
  
  return (
    <motion.div
      variants={itemVariants}
      className="glass rounded-xl p-4 md:p-6 relative overflow-hidden min-h-[200px] flex flex-col items-center justify-center"
    >
      <AISparkle className="-top-1 -right-1" />
      
      <div className="text-center mb-4">
        <motion.div
          animate={isResearching ? { rotate: 360 } : {}}
          transition={{ duration: 2, repeat: isResearching ? Infinity : 0, ease: 'linear' }}
          className="inline-block mb-2"
        >
          <Search className="w-8 h-8 text-amber-400" />
        </motion.div>
        <p className="text-sm text-gray-400">
          {stage === 'idle' || stage === 'input' ? 'Ready to research' : 
           stage === 'researching' ? 'Analyzing web signals...' :
           stage === 'disambiguating' ? 'Disambiguating identity...' :
           stage === 'enriching' ? 'Enriching profile...' :
           'Research complete'}
        </p>
      </div>
      
      <div className="flex items-center justify-center gap-4 md:gap-6">
        {WEB_SOURCES.map((source, index) => {
          const Icon = source.icon;
          const isActive = activeSources.includes(source.id);
          
          return (
            <motion.div
              key={source.id}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
                isActive ? 'bg-white/10' : 'bg-white/5'
              }`}
              animate={isActive ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, delay: index * 0.2 }}
            >
              <div className={`relative ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                <Icon className={`w-6 h-6 ${source.color}`} />
                {isActive && (
                  <motion.div
                    className="absolute -top-1 -right-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <PulsingDot color="bg-green-500" />
                  </motion.div>
                )}
              </div>
              <span className={`text-xs ${isActive ? 'text-white' : 'text-gray-500'}`}>
                {source.name}
              </span>
            </motion.div>
          );
        })}
      </div>
      
      {isResearching && (
        <div className="mt-4">
          <TypingIndicator />
        </div>
      )}
    </motion.div>
  );
};

// Disambiguation component
const DisambiguationPanel = ({ candidates, selectedId }: { candidates: CandidateProfile[]; selectedId: number | null }) => (
  <motion.div
    variants={itemVariants}
    className="glass rounded-xl p-4 md:p-6 relative overflow-hidden"
  >
    <div className="flex items-center gap-2 mb-4">
      <Brain className="w-5 h-5 text-amber-400" />
      <span className="text-sm font-medium text-white">Smart Disambiguation</span>
    </div>
    
    <div className="space-y-3">
      <AnimatePresence>
        {candidates.map((candidate) => {
          const isSelected = selectedId === candidate.id;
          const isRejected = selectedId !== null && !isSelected;
          
          return (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isRejected ? 0.3 : 1,
                x: 0,
                scale: isSelected ? 1.02 : 1,
              }}
              exit={{ opacity: 0, x: 20 }}
              className={`p-3 rounded-lg border transition-all ${
                isSelected
                  ? 'bg-green-500/10 border-green-500/40'
                  : isRejected
                  ? 'bg-red-500/5 border-red-500/20'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isSelected ? 'bg-green-500/20' : 'bg-white/10'
                  }`}>
                    <User className={`w-4 h-4 ${isSelected ? 'text-green-400' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isSelected ? 'text-green-400' : 'text-white'}`}>
                      {candidate.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {candidate.role} @ {candidate.company}
                    </p>
                  </div>
                </div>
                <div className={`text-xs font-medium px-2 py-1 rounded ${
                  candidate.confidence > 80
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {candidate.confidence}%
                </div>
              </div>
              
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 pt-2 border-t border-green-500/20"
                >
                  <div className="flex items-center gap-2 text-xs text-green-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Identity confirmed via company + role match</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  </motion.div>
);

// Enriched profile card
const EnrichedCard = ({ profile, visibleFields }: { profile: EnrichedProfile; visibleFields: string[] }) => {
  const fields = [
    { id: 'identity', icon: Shield, label: 'Verified Identity', value: profile.name, color: 'text-green-400' },
    { id: 'role', icon: Briefcase, label: 'Role', value: `${profile.role} @ ${profile.company}`, color: 'text-amber-400' },
    { id: 'email', icon: Mail, label: 'Email', value: profile.email, color: 'text-cyan-400' },
    { id: 'location', icon: MapPin, label: 'Location', value: profile.location, color: 'text-purple-400' },
    { id: 'linkedin', icon: Link2, label: 'LinkedIn', value: profile.linkedin, color: 'text-blue-400' },
    { id: 'experience', icon: Zap, label: 'Experience', value: profile.experience, color: 'text-orange-400' },
  ];

  const isIdle = visibleFields.length === 0;

  // Placeholder fields shown before research starts
  const placeholderFields = [
    { id: 'identity', icon: Shield, label: 'Verified Identity', value: '—', color: 'text-gray-500' },
    { id: 'role', icon: Briefcase, label: 'Role', value: '—', color: 'text-gray-500' },
    { id: 'email', icon: Mail, label: 'Email', value: '—', color: 'text-gray-500' },
    { id: 'location', icon: MapPin, label: 'Location', value: '—', color: 'text-gray-500' },
    { id: 'linkedin', icon: Link2, label: 'LinkedIn', value: '—', color: 'text-gray-500' },
    { id: 'experience', icon: Zap, label: 'Experience', value: '—', color: 'text-gray-500' },
  ];

  return (
    <motion.div
      variants={slideInRight}
      className="glass-strong rounded-xl p-4 md:p-6 relative overflow-hidden"
    >
      <AISparkle className="-top-1 -right-1" />
      
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-gray-500 ml-2">Enriched Profile</span>
        {profile.verified && visibleFields.length === fields.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ml-auto flex items-center gap-1 text-xs text-green-400"
          >
            <Shield className="w-3 h-3" />
            <span>Verified</span>
          </motion.div>
        )}
      </div>
      
      <div className="space-y-3">
        {/* Show placeholder fields when idle */}
        {isIdle && (
          <div className="space-y-3">
            {placeholderFields.map((field) => {
              const Icon = field.icon;
              return (
                <div
                  key={field.id}
                  className="flex items-start gap-3 p-2 rounded-lg bg-white/5 opacity-50"
                >
                  <div className={`p-1.5 rounded-md bg-white/10 ${field.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">{field.label}</p>
                    <p className="text-sm text-gray-600">{field.value}</p>
                  </div>
                </div>
              );
            })}
            {/* Placeholder summary */}
            <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10 opacity-50">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-xs font-medium text-gray-500">AI-Generated Summary</span>
              </div>
              <p className="text-sm text-gray-600">Click "Start Research Demo" to generate profile...</p>
            </div>
          </div>
        )}

        {/* Show actual fields when research is in progress or complete */}
        <AnimatePresence mode="popLayout">
          {fields.map((field) => {
            const Icon = field.icon;
            const isVisible = visibleFields.includes(field.id);
            
            if (!isVisible) return null;
            
            return (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, x: 20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3 p-2 rounded-lg bg-white/5"
              >
                <div className={`p-1.5 rounded-md bg-white/10 ${field.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">{field.label}</p>
                  <p className="text-sm text-white truncate">{field.value}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {visibleFields.includes('summary') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 rounded-lg bg-gradient-to-br from-amber-500/10 to-cyan-500/10 border border-amber-500/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-medium text-amber-400">AI-Generated Summary</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{profile.summary}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Main component
export default function ProfileResearch() {
  const [stage, setStage] = useState<Stage>('idle');
  const [activeSources, setActiveSources] = useState<string[]>([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
  const [visibleFields, setVisibleFields] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const stages: { key: Stage; label: string; icon: React.ElementType }[] = [
    { key: 'input', label: 'Input', icon: UserPlus },
    { key: 'researching', label: 'Research', icon: Search },
    { key: 'disambiguating', label: 'Disambiguate', icon: Brain },
    { key: 'enriching', label: 'Enrich', icon: Sparkles },
    { key: 'complete', label: 'Complete', icon: CheckCircle2 },
  ];

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const resetAnimation = useCallback(() => {
    clearTimeouts();
    setStage('idle');
    setActiveSources([]);
    setSelectedCandidateId(null);
    setVisibleFields([]);
    setIsAnimating(false);
  }, [clearTimeouts]);

  const startAnimation = useCallback(() => {
    if (isAnimating) return;
    
    resetAnimation();
    setIsAnimating(true);
    
    const timeouts: NodeJS.Timeout[] = [];
    
    // Stage 1: Input (0ms)
    timeouts.push(setTimeout(() => setStage('input'), 500));
    
    // Stage 2: Researching (1500ms)
    timeouts.push(setTimeout(() => setStage('researching'), 1500));
    timeouts.push(setTimeout(() => setActiveSources(['linkedin']), 2000));
    timeouts.push(setTimeout(() => setActiveSources(['linkedin', 'company']), 2500));
    timeouts.push(setTimeout(() => setActiveSources(['linkedin', 'company', 'web']), 3000));
    
    // Stage 3: Disambiguating (4000ms)
    timeouts.push(setTimeout(() => setStage('disambiguating'), 4000));
    timeouts.push(setTimeout(() => setSelectedCandidateId(2), 5500));
    
    // Stage 4: Enriching (6500ms)
    timeouts.push(setTimeout(() => setStage('enriching'), 6500));
    
    const fieldOrder = ['identity', 'role', 'email', 'location', 'linkedin', 'experience', 'summary'];
    fieldOrder.forEach((field, index) => {
      timeouts.push(setTimeout(() => {
        setVisibleFields(prev => [...prev, field]);
      }, 7000 + index * 400));
    });
    
    // Stage 5: Complete (10000ms)
    timeouts.push(setTimeout(() => {
      setStage('complete');
      setIsAnimating(false);
    }, 10000));
    
    timeoutsRef.current = timeouts;
  }, [isAnimating, resetAnimation]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      clearTimeouts();
    };
  }, [clearTimeouts]);

  return (
    <section id="profile-research" className="relative z-10 py-16 md:py-24 px-4 border-t border-white/10 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <UserPlus className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-400 font-medium">AI-Powered Research</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            Profile{' '}
            <span className="bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">
              Research
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-6">
            Transform minimal contact inputs into rich, verified professional profiles in seconds
          </p>

          {/* Action button */}
          {stage === 'idle' ? (
            <motion.button
              onClick={startAnimation}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-medium hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-5 h-5" />
              <span>Start Research Demo</span>
            </motion.button>
          ) : (
            <motion.button
              onClick={() => {
                resetAnimation();
                setTimeout(startAnimation, 100);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isAnimating ? 1 : 1.05 }}
              whileTap={{ scale: isAnimating ? 1 : 0.95 }}
              disabled={isAnimating}
            >
              <RefreshCw className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
              <span>{isAnimating ? 'Researching...' : 'Replay Demo'}</span>
            </motion.button>
          )}
        </motion.div>

        {/* Stage indicator */}
        <StageIndicator currentStage={stage} stages={stages} />

        {/* Main animation container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {/* Left: Input Card */}
          <div className="lg:col-span-1">
            <InputCard profile={INPUT_PROFILE} isActive={stage === 'input' || stage === 'researching'} />
          </div>

          {/* Center: Research Visualization or Disambiguation */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {stage === 'disambiguating' ? (
                <DisambiguationPanel
                  key="disambiguation"
                  candidates={CANDIDATE_PROFILES}
                  selectedId={selectedCandidateId}
                />
              ) : (
                <ResearchVisualization
                  key="research"
                  stage={stage}
                  activeSources={activeSources}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Right: Enriched Profile */}
          <div className="lg:col-span-1">
            <EnrichedCard profile={ENRICHED_PROFILE} visibleFields={visibleFields} />
          </div>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Shield, label: 'Identity-Locked', desc: 'Strict matching' },
            { icon: Filter, label: 'Noise Filtered', desc: 'High-confidence only' },
            { icon: Brain, label: 'AI Summary', desc: 'Outreach-ready' },
            { icon: Zap, label: 'Fast Enrichment', desc: 'Seconds, not hours' },
          ].map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
            >
              <feature.icon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-white">{feature.label}</p>
              <p className="text-xs text-gray-500">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

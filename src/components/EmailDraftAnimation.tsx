import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  Mail,
  User,
  Building2,
  Sparkles,
  Send,
  CheckCircle2,
  Paperclip,
  Search,
  FileText,
  Image,
  ChevronRight,
  Loader2,
  Zap,
  Clock,
  Settings2,
  MessageSquare,
  AtSign,
  UserCircle,
  Briefcase,
  CalendarClock,
  PenLine,
  Target,
} from 'lucide-react';
import type { Transition, Variants } from 'framer-motion';

// ==================== TYPES ====================
type WorkflowStage = 'idle' | 'contact' | 'generation' | 'customization' | 'delivery' | 'complete';

interface EmailSection {
  id: string;
  title: string;
  content: string;
  icon: React.ReactNode;
}

// ==================== MOCK DATA ====================
const MOCK_CONTACT = {
  name: 'Alex Thompson',
  email: 'alex.t@techcorp.io',
  company: 'TechCorp Industries',
  meetingDate: 'Jan 28, 2026',
  meetingType: 'Product Demo',
};

const MOCK_EMAIL_SECTIONS: EmailSection[] = [
  {
    id: 'greeting',
    title: 'Personalized Greeting',
    content: 'Dear Alex,',
    icon: <UserCircle className="w-4 h-4" />,
  },
  {
    id: 'about',
    title: 'Company Introduction',
    content: 'Following our insightful discussion, I wanted to share how our solutions align with your strategic goals...',
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    id: 'summary',
    title: 'Meeting Summary',
    content: 'Key points from our conversation: Integration requirements, timeline expectations, and success metrics...',
    icon: <CalendarClock className="w-4 h-4" />,
  },
  {
    id: 'proposal',
    title: 'Collaboration Proposal',
    content: 'Based on TechCorp\'s growth trajectory, we propose a phased implementation approach...',
    icon: <Target className="w-4 h-4" />,
  },
  {
    id: 'cta',
    title: 'Next Steps',
    content: 'Let\'s schedule a follow-up to discuss the detailed proposal. Would Thursday work for you?',
    icon: <PenLine className="w-4 h-4" />,
  },
];

const MOCK_ATTACHMENTS = [
  { name: 'Proposal.pdf', type: 'pdf', size: '2.4 MB' },
  { name: 'Presentation.pptx', type: 'doc', size: '5.1 MB' },
];

// ==================== ANIMATION VARIANTS ====================
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } as Transition,
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } as Transition,
  },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } as Transition,
  },
};

// ==================== SUB-COMPONENTS ====================

// Typing indicator dots
const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-3 py-2">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full bg-amber-500"
        animate={{
          y: [0, -6, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: i * 0.15,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

// AI sparkle animation
const AISparkle = () => (
  <motion.div
    className="absolute -top-1 -right-1"
    animate={{
      rotate: [0, 180, 360],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: 'linear',
    }}
  >
    <Sparkles className="w-4 h-4 text-amber-400" />
  </motion.div>
);

// Pulsing status dot
const PulsingDot = ({ color = 'bg-green-500' }: { color?: string }) => (
  <span className="relative flex h-2.5 w-2.5">
    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`} />
    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${color}`} />
  </span>
);

// Stage indicator
const StageIndicator = ({
  stage,
  currentStage,
  stages,
}: {
  stage: WorkflowStage;
  currentStage: WorkflowStage;
  stages: { id: WorkflowStage; label: string; icon: React.ReactNode }[];
}) => {
  const stageIndex = stages.findIndex((s) => s.id === stage);
  const currentIndex = stages.findIndex((s) => s.id === currentStage);
  const isActive = stage === currentStage;
  const isComplete = stageIndex < currentIndex || currentStage === 'complete';

  return (
    <motion.div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        isActive
          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
          : isComplete
          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
          : 'bg-white/5 text-gray-500 border border-white/10'
      }`}
      animate={isActive ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      {stages.find((s) => s.id === stage)?.icon}
      <span className="hidden sm:inline">{stages.find((s) => s.id === stage)?.label}</span>
      {isComplete && <CheckCircle2 className="w-3 h-3 ml-1" />}
    </motion.div>
  );
};

// Email field component
const EmailField = ({
  label,
  value,
  isLoading,
  icon,
}: {
  label: string;
  value: string;
  isLoading?: boolean;
  icon: React.ReactNode;
}) => (
  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
    <div className="text-gray-500">{icon}</div>
    <div className="flex-1 min-w-0">
      <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">{label}</div>
      {isLoading ? (
        <div className="h-4 bg-white/10 rounded animate-pulse w-3/4" />
      ) : (
        <div className="text-sm text-white truncate">{value}</div>
      )}
    </div>
  </div>
);

// Inclusion toggle
const InclusionToggle = ({
  label,
  enabled,
  icon,
  delay = 0,
}: {
  label: string;
  enabled: boolean;
  icon: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.3 }}
    className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
      enabled
        ? 'bg-amber-500/10 border-amber-500/30'
        : 'bg-white/5 border-white/10 opacity-50'
    }`}
  >
    <div className="flex items-center gap-2">
      <div className={enabled ? 'text-amber-400' : 'text-gray-500'}>{icon}</div>
      <span className="text-xs text-gray-300">{label}</span>
    </div>
    <div
      className={`w-8 h-4 rounded-full relative transition-colors ${
        enabled ? 'bg-amber-500' : 'bg-gray-600'
      }`}
    >
      <motion.div
        className="absolute top-0.5 w-3 h-3 rounded-full bg-white shadow"
        animate={{ left: enabled ? '16px' : '2px' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </div>
  </motion.div>
);

// Attachment card
const AttachmentCard = ({
  name,
  type,
  size,
  delay = 0,
}: {
  name: string;
  type: string;
  size: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.3 }}
    className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10"
  >
    {type === 'pdf' ? (
      <FileText className="w-4 h-4 text-red-400" />
    ) : type === 'image' ? (
      <Image className="w-4 h-4 text-blue-400" />
    ) : (
      <FileText className="w-4 h-4 text-cyan-400" />
    )}
    <div className="flex-1 min-w-0">
      <div className="text-xs text-white truncate">{name}</div>
      <div className="text-[10px] text-gray-500">{size}</div>
    </div>
  </motion.div>
);

// ==================== MAIN COMPONENT ====================
export default function EmailDraftAnimation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStage, setCurrentStage] = useState<WorkflowStage>('idle');
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [emailSubject, setEmailSubject] = useState('');
  const [showAttachments, setShowAttachments] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);

  const stages: { id: WorkflowStage; label: string; icon: React.ReactNode }[] = [
    { id: 'contact', label: 'Contact', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'generation', label: 'AI Generate', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'customization', label: 'Customize', icon: <Settings2 className="w-3.5 h-3.5" /> },
    { id: 'delivery', label: 'Send', icon: <Send className="w-3.5 h-3.5" /> },
  ];

  // Reset animation state
  const resetAnimation = useCallback(() => {
    setCurrentStage('idle');
    setVisibleSections([]);
    setEmailSubject('');
    setShowAttachments(false);
    setSendProgress(0);
    setIsPlaying(false);
  }, []);

  // Animation sequence controller
  useEffect(() => {
    if (!isPlaying) return;

    let timeouts: NodeJS.Timeout[] = [];

    const runSequence = async () => {
      // Stage 1: Contact Retrieval (2s)
      setCurrentStage('contact');
      
      timeouts.push(setTimeout(() => {
        setEmailSubject(`Following Up: ${MOCK_CONTACT.meetingType} Discussion`);
      }, 1000));

      // Stage 2: AI Generation (4s)
      timeouts.push(setTimeout(() => {
        setCurrentStage('generation');
      }, 2000));

      // Reveal sections one by one
      MOCK_EMAIL_SECTIONS.forEach((section, index) => {
        timeouts.push(setTimeout(() => {
          setVisibleSections((prev) => [...prev, section.id]);
        }, 2500 + index * 700));
      });

      // Stage 3: Customization (3s)
      timeouts.push(setTimeout(() => {
        setCurrentStage('customization');
        setShowAttachments(true);
      }, 6500));

      // Stage 4: Delivery (2s)
      timeouts.push(setTimeout(() => {
        setCurrentStage('delivery');
      }, 9500));

      // Animate send progress
      for (let i = 1; i <= 10; i++) {
        timeouts.push(setTimeout(() => {
          setSendProgress(i * 10);
        }, 9500 + i * 150));
      }

      // Complete
      timeouts.push(setTimeout(() => {
        setCurrentStage('complete');
        setIsPlaying(false);
      }, 11500));
    };

    runSequence();

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (currentStage === 'complete' || currentStage === 'idle') {
      resetAnimation();
      setTimeout(() => setIsPlaying(true), 100);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <Mail className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-400 font-medium">AI Email Assistant</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Intelligent Email{' '}
            <span className="bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">
              Draft Generation
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Watch how AI transforms your meeting notes into personalized, professional emails
            ready to send in seconds.
          </p>
        </motion.div>

        {/* Controls Bar */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Play/Pause Button */}
          <motion.button
            onClick={handlePlayPause}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              isPlaying
                ? 'bg-white/10 text-white border border-white/20'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 text-black'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentStage === 'complete' ? (
              <>
                <RotateCcw className="w-4 h-4" />
                <span>Replay</span>
              </>
            ) : isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Start Demo</span>
              </>
            )}
          </motion.button>

          {/* Stage Indicators */}
          <div className="flex flex-wrap items-center gap-2">
            {stages.map((stage) => (
              <StageIndicator
                key={stage.id}
                stage={stage.id}
                currentStage={currentStage}
                stages={stages}
              />
            ))}
          </div>
        </motion.div>

        {/* Main Animation Container */}
        <motion.div
          className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] backdrop-blur-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Window Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-gray-500 ml-2">Email Draft Studio</span>
            </div>
            <div className="flex items-center gap-2">
              {currentStage !== 'idle' && currentStage !== 'complete' && (
                <div className="flex items-center gap-1.5 text-xs text-amber-400">
                  <PulsingDot color="bg-amber-500" />
                  <span>Processing</span>
                </div>
              )}
              {currentStage === 'complete' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5 text-xs text-green-400"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Sent Successfully</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-[1fr,320px] min-h-[500px]">
            {/* Left Panel - Email Editor */}
            <div className="p-4 md:p-6 border-b lg:border-b-0 lg:border-r border-white/10">
              <AnimatePresence mode="wait">
                {currentStage === 'idle' ? (
                  <motion.div
                    key="idle"
                    className="h-full flex flex-col items-center justify-center text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center mb-4"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Mail className="w-10 h-10 text-amber-400" />
                    </motion.div>
                    <h3 className="text-lg font-medium text-white mb-2">Ready to Compose</h3>
                    <p className="text-sm text-gray-500 max-w-xs">
                      Click "Start Demo" to watch AI generate a personalized email
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="active"
                    className="space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Search/Contact Row */}
                    <motion.div variants={itemVariants} className="flex gap-3">
                      <div className="flex-1 flex items-center gap-2 p-2.5 bg-white/5 rounded-lg border border-white/10">
                        <Search className="w-4 h-4 text-gray-500" />
                        <AnimatePresence mode="wait">
                          {currentStage === 'contact' && visibleSections.length === 0 ? (
                            <motion.span
                              key="searching"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="text-sm text-gray-500"
                            >
                              Searching latest contact...
                            </motion.span>
                          ) : (
                            <motion.span
                              key="found"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-sm text-white"
                            >
                              {MOCK_CONTACT.name}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    {/* Email Fields */}
                    <motion.div variants={itemVariants} className="grid gap-3">
                      <EmailField
                        label="To"
                        value={MOCK_CONTACT.email}
                        isLoading={currentStage === 'contact' && !emailSubject}
                        icon={<AtSign className="w-4 h-4" />}
                      />
                      <EmailField
                        label="Subject"
                        value={emailSubject || 'Generating...'}
                        isLoading={!emailSubject}
                        icon={<MessageSquare className="w-4 h-4" />}
                      />
                    </motion.div>

                    {/* Email Body */}
                    <motion.div
                      variants={itemVariants}
                      className="p-4 bg-white/5 rounded-xl border border-white/10 min-h-[280px]"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                          Email Body
                        </span>
                        {(currentStage === 'generation' && visibleSections.length < MOCK_EMAIL_SECTIONS.length) && (
                          <div className="flex items-center gap-2 text-xs text-amber-400">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span>AI Writing...</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <AnimatePresence mode="popLayout">
                          {MOCK_EMAIL_SECTIONS.filter((s) =>
                            visibleSections.includes(s.id)
                          ).map((section, index) => (
                            <motion.div
                              key={section.id}
                              variants={slideInLeft}
                              initial="hidden"
                              animate="visible"
                              transition={{ delay: index * 0.1 }}
                              className="relative"
                            >
                              <div className="flex items-start gap-2 p-3 bg-white/5 rounded-lg border border-white/10">
                                <div className="mt-0.5 text-amber-400">{section.icon}</div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-[10px] text-amber-400/70 uppercase tracking-wider mb-1">
                                    {section.title}
                                  </div>
                                  <p className="text-sm text-gray-300 leading-relaxed">
                                    {section.content}
                                  </p>
                                </div>
                                {index === visibleSections.length - 1 &&
                                  currentStage === 'generation' && <AISparkle />}
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>

                        {currentStage === 'generation' &&
                          visibleSections.length < MOCK_EMAIL_SECTIONS.length && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center gap-2 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20"
                            >
                              <Zap className="w-4 h-4 text-amber-400" />
                              <span className="text-xs text-amber-400">
                                Generating next section
                              </span>
                              <TypingIndicator />
                            </motion.div>
                          )}
                      </div>
                    </motion.div>

                    {/* Send Button */}
                    <AnimatePresence>
                      {(currentStage === 'delivery' || currentStage === 'complete') && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="relative"
                        >
                          <div
                            className={`relative overflow-hidden rounded-xl ${
                              currentStage === 'complete'
                                ? 'bg-gradient-to-r from-green-500 to-green-600'
                                : 'bg-gradient-to-r from-amber-500 to-amber-600'
                            }`}
                          >
                            {/* Progress bar */}
                            {currentStage === 'delivery' && (
                              <motion.div
                                className="absolute inset-0 bg-white/20"
                                initial={{ width: 0 }}
                                animate={{ width: `${sendProgress}%` }}
                              />
                            )}
                            <div className="relative flex items-center justify-center gap-2 py-3 text-black font-medium">
                              {currentStage === 'complete' ? (
                                <>
                                  <CheckCircle2 className="w-5 h-5" />
                                  <span>Email Sent Successfully!</span>
                                </>
                              ) : (
                                <>
                                  <Send className="w-5 h-5" />
                                  <span>Sending Email... {sendProgress}%</span>
                                </>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Panel - Controls */}
            <div className="p-4 md:p-6 bg-white/[0.02]">
              <AnimatePresence mode="wait">
                {currentStage === 'idle' ? (
                  <motion.div
                    key="idle-right"
                    className="h-full flex flex-col items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center">
                      <Clock className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                      <p className="text-xs text-gray-600">Controls will appear here</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="active-right"
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Contact Card */}
                    <motion.div variants={slideInRight}>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                        Contact Details
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/30 to-cyan-500/30 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">
                              {MOCK_CONTACT.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {MOCK_CONTACT.company}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{MOCK_CONTACT.meetingType}</span>
                          <ChevronRight className="w-3 h-3 text-gray-600" />
                          <span>{MOCK_CONTACT.meetingDate}</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Inclusions */}
                    <motion.div variants={slideInRight}>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                        Include in Email
                      </div>
                      <div className="space-y-2">
                        <InclusionToggle
                          label="Meeting Summary"
                          enabled={visibleSections.includes('summary')}
                          icon={<CalendarClock className="w-4 h-4" />}
                          delay={0}
                        />
                        <InclusionToggle
                          label="Company Profile"
                          enabled={visibleSections.includes('about')}
                          icon={<Building2 className="w-4 h-4" />}
                          delay={0.1}
                        />
                        <InclusionToggle
                          label="Collaboration Ideas"
                          enabled={visibleSections.includes('proposal')}
                          icon={<Target className="w-4 h-4" />}
                          delay={0.2}
                        />
                      </div>
                    </motion.div>

                    {/* Attachments */}
                    <AnimatePresence>
                      {showAttachments && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <Paperclip className="w-3.5 h-3.5" />
                            Attachments
                          </div>
                          <div className="space-y-2">
                            {MOCK_ATTACHMENTS.map((file, i) => (
                              <AttachmentCard key={file.name} {...file} delay={i * 0.15} />
                            ))}
                          </div>
                          <motion.div
                            className="mt-2 p-3 border-2 border-dashed border-white/10 rounded-lg text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <Paperclip className="w-4 h-4 text-gray-600 mx-auto mb-1" />
                            <span className="text-[10px] text-gray-600">
                              Drag & drop files here
                            </span>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* AI Status */}
                    <motion.div
                      variants={slideInRight}
                      className="p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-cyan-500/10 border border-amber-500/20"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-medium text-amber-400">
                          AI Engine Status
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="flex items-center gap-1.5">
                          <PulsingDot color="bg-green-500" />
                          <span className="text-gray-400">Personalization</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <PulsingDot color="bg-green-500" />
                          <span className="text-gray-400">Research</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <PulsingDot color="bg-green-500" />
                          <span className="text-gray-400">Summarization</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <PulsingDot color="bg-green-500" />
                          <span className="text-gray-400">Templates</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Notification Toast */}
          <AnimatePresence>
            {currentStage === 'complete' && (
              <motion.div
                initial={{ opacity: 0, y: 50, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: 50 }}
                className="absolute bottom-4 left-1/2 flex items-center gap-3 px-4 py-3 bg-green-500/20 border border-green-500/30 rounded-xl backdrop-blur-xl"
              >
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <div>
                  <div className="text-sm font-medium text-white">Email Sent!</div>
                  <div className="text-xs text-gray-400">
                    Notification sent to your inbox
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {[
            { icon: <Zap className="w-5 h-5" />, label: 'Auto-Generate', desc: 'AI-powered content' },
            { icon: <User className="w-5 h-5" />, label: 'Personalized', desc: 'Context-aware emails' },
            { icon: <Building2 className="w-5 h-5" />, label: 'Research-Backed', desc: 'Company intelligence' },
            { icon: <Send className="w-5 h-5" />, label: 'One-Click Send', desc: 'Instant delivery' },
          ].map((feature, i) => (
            <motion.div
              key={feature.label}
              className="p-4 rounded-xl bg-white/5 border border-white/10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1 }}
              whileHover={{ y: -4, borderColor: 'rgba(245, 158, 11, 0.3)' }}
            >
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mx-auto mb-2 text-amber-400">
                {feature.icon}
              </div>
              <div className="text-sm font-medium text-white">{feature.label}</div>
              <div className="text-xs text-gray-500">{feature.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

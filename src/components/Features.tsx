import { motion } from 'framer-motion';
import { Zap, NfcIcon, Network, Activity, ArrowRight } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: NfcIcon,
      secondaryIcon: Zap,
      title: '"Zero-Click" Physical-to-Digital Bridge',
      subtitle: 'NFC + AI',
      description: 'Tap your LeadQ NFC card on a prospect\'s phone to trigger instant "Reverse Capture"—their details flow into your CRM, and the Research Agent starts enriching the deal before you finish the handshake.',
      highlight: 'Deal already enriched in your pipeline',
      competitive: 'Beyond vCards: Competitors share details. LeadQ captures them.',
      color: 'amber',
      badge: 'Hardware Included'
    },
    {
      icon: Network,
      title: 'Autonomous Swarm Architecture',
      subtitle: 'Don\'t use the CRM, manage the Agents',
      description: 'Your AI workforce works 24/7: Research Agent scrapes LinkedIn/News, Meeting Agent negotiates schedules and books calls, Pipeline Agent listens to conversations and advances deals automatically.',
      highlight: 'All tools talking to each other in one brain',
      competitive: 'Unified intelligence: Competitors sell Clay, Calendly, Gong separately.',
      color: 'amber',
      agents: ['Research Agent', 'Meeting Agent']
    },
    {
      icon: Activity,
      title: 'The "Living" Dashboard',
      subtitle: 'Real-time Command Center',
      description: 'Watch your AI team work in real-time. See live status logs as Research Agent analyzes companies, Meeting Agent drafts emails, and Pipeline Agent detects buying signals.',
      highlight: 'See the work being done, not just reports of the past',
      competitive: 'Active transparency: Static dashboards vs. living command center.',
      color: 'amber',
      isLive: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="features" className="relative z-10 py-16 sm:py-20 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            What Makes LeadQ Different
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Not just another CRM. A complete AI workforce that works while you focus on closing deals.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const SecondaryIcon = feature.secondaryIcon;
            const colorClass = 'leadq-amber';

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="glass p-5 sm:p-6 md:p-8 rounded-2xl relative overflow-hidden group"
              >
                {/* Gradient border effect on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-leadq-amber/20 via-transparent to-transparent" />

                <div className="relative z-10">
                  {/* Badge */}
                  {feature.badge && (
                    <div className="mb-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${colorClass}/10 text-${colorClass} border border-${colorClass}/20`}>
                        {feature.badge}
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="mb-6 flex items-center gap-2">
                    <div className={`w-14 h-14 rounded-xl bg-${colorClass}/10 flex items-center justify-center text-${colorClass} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    {SecondaryIcon && (
                      <div className={`w-10 h-10 rounded-lg bg-${colorClass}/5 flex items-center justify-center text-${colorClass}`}>
                        <SecondaryIcon className="w-5 h-5" />
                      </div>
                    )}
                    {feature.isLive && (
                      <div className="flex items-center gap-1.5 ml-auto">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-leadq-amber opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-leadq-amber"></span>
                        </span>
                        <span className="text-xs text-leadq-amber font-medium">LIVE</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-display font-bold mb-2 leading-tight">
                    {feature.title}
                  </h3>
                  <p className={`text-sm text-${colorClass} font-medium mb-4`}>
                    {feature.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Agent Pills */}
                  {feature.agents && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {feature.agents.map((agent, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-leadq-amber/10 text-leadq-amber text-xs font-medium"
                        >
                          {agent}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Highlight */}
                  <div className={`p-3 rounded-lg bg-${colorClass}/5 border border-${colorClass}/20 mb-4`}>
                    <p className={`text-sm text-${colorClass} font-medium flex items-start gap-2`}>
                      <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{feature.highlight}</span>
                    </p>
                  </div>

                  {/* Competitive Edge */}
                  <p className="text-xs text-gray-500 italic">
                    {feature.competitive}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

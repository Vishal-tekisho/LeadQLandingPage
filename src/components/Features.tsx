import { motion } from 'framer-motion';
import { Link2, BrainCircuit, Activity } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Link2,
      title: 'The Offline-to-Online Bridge',
      highlight: 'Zero-Friction Entry',
      description: 'We bridge the gap between real-world handshakes and digital workflows. Instantly capture and digitize interactions so no lead is ever lost in the void.',
      variant: 'glow'
    },
    {
      icon: BrainCircuit,
      title: 'The Digital Brain',
      highlight: 'Multi-Agent Swarm',
      description: 'Hardware is just the trigger. The swarm is the engine. Our multi-agent system turns a simple tap into a complex, executed sales workflow.',
      variant: 'gradient'
    },
    {
      icon: Activity,
      title: 'The Unified Command',
      highlight: 'Real-Time Control',
      description: 'Control the chaos. Manage your physical interactions and digital agents from a single \'Living\' Dashboard that puts you in the pilot\'s seat.',
      variant: 'glow'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    }
  };

  return (
    <section id="features" className="relative z-10 py-20 sm:py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-leadq-amber/10 text-leadq-amber border border-leadq-amber/20 mb-6"
          >
            The Only CRM That Handshakes Back.
          </motion.span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-leadq-amber via-yellow-400 to-leadq-amber bg-clip-text text-transparent">
              LeadQ
            </span>
            ?
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isGradient = feature.variant === 'gradient';

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className={`
                  relative p-6 sm:p-7 md:p-8 rounded-2xl overflow-hidden group cursor-pointer
                  ${isGradient
                    ? 'bg-gradient-to-br from-leadq-amber/15 via-leadq-amber/5 to-transparent border border-leadq-amber/30'
                    : 'glass border-white/10'
                  }
                `}
              >
                {/* Border glow effect */}
                <div
                  className={`
                    absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500
                    ${isGradient
                      ? 'bg-gradient-to-br from-leadq-amber/25 via-transparent to-yellow-500/10'
                      : 'shadow-[inset_0_0_0_1px_rgba(245,158,11,0.3)]'
                    }
                  `}
                />

                {/* Ambient glow on hover */}
                <div className="absolute -inset-1 rounded-2xl bg-leadq-amber/20 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className={`
                        w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center
                        ${isGradient
                          ? 'bg-gradient-to-br from-leadq-amber/30 to-leadq-amber/10'
                          : 'bg-leadq-amber/10'
                        }
                        border border-leadq-amber/20 text-leadq-amber
                      `}
                    >
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                    </motion.div>
                  </div>

                  {/* Highlight Badge */}
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-leadq-amber/15 text-leadq-amber border border-leadq-amber/25 shadow-sm shadow-leadq-amber/10">
                      {feature.highlight}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-display font-bold mb-3 text-white group-hover:text-leadq-amber transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed text-sm sm:text-base group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-leadq-amber/10 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

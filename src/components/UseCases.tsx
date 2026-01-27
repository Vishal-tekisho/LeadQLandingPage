import { motion } from 'framer-motion';
import { Building2, Rocket, Users, Briefcase, TrendingUp, Zap } from 'lucide-react';

const UseCases = () => {
  const useCases = [
    {
      icon: Building2,
      title: 'Real Estate Agents',
      description: 'Capture leads at open houses, property showings, and networking events with instant contact sync and automated follow-ups.',
      metrics: [
        { label: 'Faster Lead Capture', value: '85%' },
        { label: 'Follow-up Rate', value: '95%' }
      ],
      gradient: 'from-leadq-amber/20 to-orange-500/20',
      iconColor: 'text-leadq-amber'
    },
    {
      icon: Rocket,
      title: 'B2B SaaS Sales Teams',
      description: 'Transform conference badge scans and business card exchanges into qualified pipeline with AI-powered lead scoring and enrichment.',
      metrics: [
        { label: 'Pipeline Growth', value: '3x' },
        { label: 'Qualification Time', value: '70%' }
      ],
      gradient: 'from-leadq-cyan/20 to-blue-500/20',
      iconColor: 'text-leadq-cyan'
    },
    {
      icon: Users,
      title: 'Event Organizers',
      description: 'Maximize attendee engagement with seamless check-ins, real-time networking features, and post-event nurture campaigns.',
      metrics: [
        { label: 'Check-in Speed', value: '90%' },
        { label: 'Engagement Rate', value: '4x' }
      ],
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400'
    },
    {
      icon: Briefcase,
      title: 'Consulting Firms',
      description: 'Build relationships during client meetings and industry events with intelligent contact management and personalized outreach.',
      metrics: [
        { label: 'Client Retention', value: '92%' },
        { label: 'Referral Rate', value: '2.5x' }
      ],
      gradient: 'from-emerald-500/20 to-teal-500/20',
      iconColor: 'text-emerald-400'
    },
    {
      icon: TrendingUp,
      title: 'Financial Services',
      description: 'Manage high-value prospects with GDPR-compliant contact capture, automated compliance checks, and secure data handling.',
      metrics: [
        { label: 'Compliance Score', value: '100%' },
        { label: 'Deal Velocity', value: '60%' }
      ],
      gradient: 'from-blue-500/20 to-indigo-500/20',
      iconColor: 'text-blue-400'
    },
    {
      icon: Zap,
      title: 'Startups & Founders',
      description: 'Scale your outreach without scaling your team. Automate lead capture, qualification, and nurture campaigns from day one.',
      metrics: [
        { label: 'Time Saved', value: '15hrs/wk' },
        { label: 'Cost Reduction', value: '80%' }
      ],
      gradient: 'from-yellow-500/20 to-red-500/20',
      iconColor: 'text-yellow-400'
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section id="use-cases" className="relative z-10 py-24 px-4 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-leadq-amber/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-leadq-amber to-leadq-cyan animate-pulse" />
            <span className="text-sm font-medium text-gray-300">Built for Every Industry</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Real Teams,{' '}
            <span className="bg-gradient-to-r from-leadq-amber via-leadq-cyan to-leadq-purple bg-clip-text text-transparent">
              Real Results
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            See how LeadQ transforms lead management across industries, from real estate to SaaS sales
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                className="group relative"
              >
                {/* Gradient background glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                
                {/* Card content */}
                <div className="relative glass rounded-2xl border border-white/10 p-6 h-full flex flex-col group-hover:glass-strong transition-all duration-300">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${useCase.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={useCase.iconColor} size={28} strokeWidth={2} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-display font-bold mb-3 group-hover:text-white transition-colors">
                    {useCase.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                    {useCase.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex gap-4 pt-4 border-t border-white/10">
                    {useCase.metrics.map((metric, idx) => (
                      <div key={idx} className="flex-1">
                        <div className={`text-2xl font-bold ${useCase.iconColor} mb-1`}>
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-500">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Ready to see how LeadQ works for your industry?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-leadq-amber to-leadq-cyan px-8 py-4 rounded-xl font-semibold text-white shadow-glow hover:shadow-glow-strong transition-all"
          >
            <span>Schedule a Demo</span>
            <Zap size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;

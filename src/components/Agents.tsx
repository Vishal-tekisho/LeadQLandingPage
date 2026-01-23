import { motion } from 'framer-motion';
import {
  Search,
  Calendar,
  Smartphone,
  Users,
  TrendingUp,
  Mail,
  Mic,
} from 'lucide-react';

const agents = [
  {
    id: 1,
    title: 'Research Agent',
    description:
      'Enriches contacts from web signals and builds rich profiles.',
    icon: Search,
    color: 'amber',
  },
  {
    id: 2,
    title: 'Scheduling Agent',
    description:
      'Negotiates meeting times and syncs calendars automatically.',
    icon: Calendar,
    color: 'amber',
  },
  {
    id: 3,
    title: 'NFC Bridge',
    description:
      'Tap to capture. Instantly digitizes physical business cards into CRM data.',
    icon: Smartphone,
    color: 'amber',
    highlight: true,
    badge: 'Hardware Included',
  },
  {
    id: 4,
    title: 'Meeting Agent',
    description:
      'Both online and offline meetings can be scheduled from LeadQ base.',
    icon: Users,
    color: 'amber',
  },
  {
    id: 5,
    title: 'Analytics Core',
    description:
      'Forecasts and highlights risks using pipeline signals.',
    icon: TrendingUp,
    color: 'amber',
  },
  {
    id: 6,
    title: 'Email Agent',
    description:
      'Understands context from meetings, drafts custom emails based on the meeting content.',
    icon: Mail,
    color: 'amber',
  },
  {
    id: 7,
    title: 'Speaker Tracking',
    description:
      'A diarizing agent identifies, separates, and labels different speakers in an audio stream or recording, determining who spoke when.',
    icon: Mic,
    color: 'amber',
  },
];

export default function Agents() {
  return (
    <section id="agents" className="relative z-10 py-24 px-4 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Meet Your New Workforce
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Deploy specialized AI agents for every stage of your sales cycle.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            const colorClass = 'leadq-amber';

            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -8,
                  rotateX: 5,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                className={`group relative glass rounded-2xl p-6 hover:glass-strong transition-all ${
                  agent.highlight
                    ? 'bg-gradient-to-br from-leadq-amber/5 to-leadq-amber-dark/10'
                    : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-leadq-amber/10 to-leadq-amber-dark/10 border border-transparent group-hover:border-leadq-amber/30"
                />

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-${colorClass}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Icon
                        className={`text-${colorClass}`}
                        size={24}
                        strokeWidth={2}
                      />
                    </div>
                    {agent.badge && (
                      <span className="glass-strong px-3 py-1 rounded-full text-xs font-medium text-leadq-amber border border-leadq-amber/30">
                        {agent.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-white transition-colors">
                    {agent.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {agent.description}
                  </p>
                </div>

                {agent.highlight && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-leadq-amber/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

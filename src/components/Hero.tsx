import { motion } from 'framer-motion';
import EnergyBeam from './ui/energy-beam';

// Toggle to enable/disable the energy beam animation
const ENABLE_ENERGY_BEAM = false;

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: 'easeOut' as const },
    },
  };

  return (
    <section id="main-content" className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {ENABLE_ENERGY_BEAM && (
        <div className="absolute inset-0 z-0">
          <EnergyBeam className="opacity-60" />
        </div>
      )}

      <div className="relative z-20 w-full max-w-4xl mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >


          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-7xl font-bold uppercase tracking-tighter mb-6 leading-tight"
          >
            <span className="text-white">Lead Generation</span>
            <br />
            <span className="
  bg-gradient-to-r from-amber-300 via-amber-500 to-amber-700
  bg-clip-text text-transparent
  drop-shadow-[0_0_6px_rgba(255,191,0,0.35)]
">
              Rewritten by AI
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 max-w-2xl"
          >
            Supercharge productivity with AI-powered automation and integrations built for the next generation of teams.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

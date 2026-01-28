import { motion } from 'framer-motion';
import { Calendar, Mic } from 'lucide-react';

export default function BookingsMeeting() {
  return (
    <section id="bookings-meeting" className="relative z-10 py-24 px-4 border-t border-white/10 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-medium">Coming Soon</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Bookings & Meeting{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Diarization
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Intelligent meeting scheduling and automatic transcription with speaker identification
          </p>

          {/* Placeholder visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto p-12 rounded-2xl glass border border-white/10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Calendar className="w-12 h-12 text-cyan-400" />
                <Mic className="w-12 h-12 text-blue-400" />
              </div>
              <p className="text-gray-500 text-lg">
                Advanced booking and diarization features launching soon
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

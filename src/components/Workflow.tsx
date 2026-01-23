import { motion } from 'framer-motion';
import { Radio, Search, Mail, Calendar, CheckCircle } from 'lucide-react';

export default function Workflow() {
  return (
    <section className="relative z-10 py-24 px-4 bg-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl text-amber-500 font-medium"
          >
            From Lead to Closed Deal – Zero Clicks.
          </motion.p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Desktop: Horizontal Flow */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-12 items-start">
            {/* Step 1: The Lead */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="glass-strong rounded-2xl p-8 hover:scale-105 transition-transform">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-black to-amber-600 flex items-center justify-center">
                      <Radio className="text-white" size={36} strokeWidth={2} />
                    </div>
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.8, 0, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                      className="absolute inset-0 rounded-full bg-amber-500"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold mb-4 text-center">
                  The Lead
                </h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  LeadQ detects a prospect via NFC tap, LinkedIn, or Inbound.
                </p>
                <div className="flex justify-center mt-6">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(217,119,6,0.8)]"
                  />
                </div>
              </div>
            </motion.div>

            {/* Connector Line 1 */}
            <div className="absolute left-[calc(33.333%-3rem)] top-28 w-[6rem] h-0.5">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 origin-left"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg, #f59e0b 0, #f59e0b 8px, transparent 8px, transparent 16px)',
                }}
              />
              <motion.div
                animate={{ x: [0, 96, 96], opacity: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: [0, 0.5, 1],
                }}
                className="absolute top-1/2 -mt-1.5 left-0 w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(217,119,6,0.8)]"
              />
            </div>

            {/* Step 2: The Swarm */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-strong rounded-2xl p-8 hover:scale-105 transition-transform bg-gradient-to-br from-amber-500/5 to-amber-600/10 border border-amber-500/20">
                <h3 className="text-2xl font-display font-bold mb-6 text-center">
                  The Swarm
                </h3>

                <div className="relative w-full aspect-square max-w-[280px] mx-auto mb-4">
                  {/* Central Hub */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-black to-amber-600 shadow-[0_0_20px_rgba(217,119,6,0.6)] flex items-center justify-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-leadq-bg/90 backdrop-blur-sm" />
                    </motion.div>
                  </div>

                  {/* Orbiting Agents */}
                  {[
                    { Icon: Search, angle: -90, delay: 0, color: 'amber' },
                    { Icon: Mail, angle: 30, delay: 0.3, color: 'amber-dark' },
                    { Icon: Calendar, angle: 150, delay: 0.6, color: 'amber' },
                  ].map(({ Icon, angle, delay, color }, index) => {
                    const radius = 90;
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                    const isAmber = color === 'amber';

                    return (
                      <div key={index}>
                        {/* Connection Line */}
                        <motion.div
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.4 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.8,
                            delay: delay + 0.4,
                            ease: 'easeInOut',
                          }}
                          className="absolute top-1/2 left-1/2"
                          style={{
                            width: Math.abs(x) * 2,
                            height: Math.abs(y) * 2,
                            transformOrigin: '0 0',
                          }}
                        >
                          <svg
                            className="absolute top-0 left-0 overflow-visible"
                            style={{
                              width: '100%',
                              height: '100%',
                            }}
                          >
                            <motion.line
                              x1="0"
                              y1="0"
                              x2={x}
                              y2={y}
                              stroke={isAmber ? 'rgb(245, 158, 11)' : 'rgb(217, 119, 6)'}
                              strokeWidth="2"
                              strokeDasharray="4 4"
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: delay + 0.4 }}
                            />
                          </svg>
                        </motion.div>

                        {/* Agent Node */}
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: delay + 0.8 }}
                          className="absolute top-1/2 left-1/2"
                          style={{
                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                          }}
                        >
                          <motion.div
                            animate={{
                              scale: [1, 1.1, 1],
                              boxShadow: [
                                `0 0 0 0 rgba(${isAmber ? '245, 158, 11' : '217, 119, 6'}, 0.4)`,
                                `0 0 0 8px rgba(${isAmber ? '245, 158, 11' : '217, 119, 6'}, 0)`,
                                `0 0 0 0 rgba(${isAmber ? '245, 158, 11' : '217, 119, 6'}, 0)`,
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: delay + 1,
                            }}
                            className={isAmber
                              ? "w-12 h-12 rounded-full bg-amber-500/20 backdrop-blur-sm border border-amber-500/40 flex items-center justify-center"
                              : "w-12 h-12 rounded-full bg-amber-600/20 backdrop-blur-sm border border-amber-600/40 flex items-center justify-center"
                            }
                          >
                            <Icon
                              className={isAmber ? "text-amber-500" : "text-amber-600"}
                              size={20}
                              strokeWidth={2}
                            />
                          </motion.div>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>

                <p className="text-gray-400 text-center leading-relaxed">
                  AI agents orchestrate research, outreach, and scheduling
                  automatically.
                </p>
              </div>
            </motion.div>

            {/* Connector Line 2 */}
            <div className="absolute right-[calc(33.333%-3rem)] top-28 w-[6rem] h-0.5">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-amber-600 to-amber-500 origin-left"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg, #d97706 0, #d97706 8px, transparent 8px, transparent 16px)',
                }}
              />
              <motion.div
                animate={{ x: [0, 96, 96], opacity: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: [0, 0.5, 1],
                  delay: 0.5,
                }}
                className="absolute top-1/2 -mt-1.5 left-0 w-3 h-3 rounded-full bg-amber-600 shadow-[0_0_10px_rgba(217,119,6,0.8)]"
              />
            </div>

            {/* Step 3: The Result */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="glass-strong rounded-2xl p-8 hover:scale-105 transition-transform">
                <div className="flex justify-center mb-6">
                   <motion.div
                    // animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-black to-amber-600 flex items-center justify-center shadow-[0_0_20px_rgba(217,119,6,0.6)]"
                  >
                    <CheckCircle
                      className="text-white"
                      size={36}
                      strokeWidth={2}
                    />
                  </motion.div>
                </div>
                <h3 className="text-2xl font-display font-bold mb-4 text-center">
                  The Result
                </h3>
                <p className="text-gray-400 text-center leading-relaxed mb-6">
                  Meeting booked & CRM updated automatically.
                </p>

                {/* Deal Card Animation */}
                <div className="relative h-24 overflow-hidden rounded-xl bg-white/5">
                  <motion.div
                    initial={{ x: -300, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="absolute inset-2 glass rounded-lg flex items-center justify-center border border-amber-500/30"
                  >
                    <span className="text-sm font-medium text-amber-500">
                      Deal Added to Pipeline
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile: Vertical Flow */}
          <div className="lg:hidden space-y-8">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="glass-strong rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-black to-amber-600 flex items-center justify-center">
                      <Radio className="text-white" size={28} strokeWidth={2} />
                    </div>
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.8, 0, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                      className="absolute inset-0 rounded-full bg-amber-500"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold mb-2">
                      The Lead
                    </h3>
                    <p className="text-gray-400 text-sm">
                      LeadQ detects a prospect via NFC tap, LinkedIn, or
                      Inbound.
                    </p>
                  </div>
                </div>
              </div>

              {/* Vertical Connector */}
              <div className="flex justify-center py-4">
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="w-0.5 h-12 bg-gradient-to-b from-amber-500 to-amber-600 origin-top"
                />
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-strong rounded-2xl p-6 bg-gradient-to-br from-amber-500/5 to-amber-600/10 border border-amber-500/20">
                <h3 className="text-xl font-display font-bold mb-4 text-center">
                  The Swarm
                </h3>
                <div className="relative w-48 h-48 mx-auto mb-4">
                  {/* Central Hub */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-black to-amber-600 shadow-[0_0_20px_rgba(217,119,6,0.6)] flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-leadq-bg/90" />
                    </div>
                  </div>

                  {/* Agents */}
                  {[
                    { Icon: Search, angle: -90, color: 'amber' },
                    { Icon: Mail, angle: 30, color: 'amber-dark' },
                    { Icon: Calendar, angle: 150, color: 'amber' },
                  ].map(({ Icon, angle, color }, index) => {
                    const radius = 70;
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                    const isAmber = color === 'amber';

                    return (
                      <div
                        key={index}
                        className="absolute top-1/2 left-1/2"
                        style={{
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        }}
                      >
                        <div
                          className={isAmber
                            ? "w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center"
                            : "w-10 h-10 rounded-full bg-amber-600/20 border border-amber-600/40 flex items-center justify-center"
                          }
                        >
                          <Icon
                            className={isAmber ? "text-amber-500" : "text-amber-600"}
                            size={18}
                            strokeWidth={2}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-gray-400 text-center text-sm">
                  AI agents orchestrate research, outreach, and scheduling.
                </p>
              </div>

              {/* Vertical Connector */}
              <div className="flex justify-center py-4">
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-0.5 h-12 bg-gradient-to-b from-amber-600 to-amber-500 origin-top"
                />
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="glass-strong rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-black to-amber-600 flex items-center justify-center shadow-[0_0_20px_rgba(217,119,6,0.6)]">
                      <CheckCircle
                        className="text-white"
                        size={28}
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold mb-2">
                      The Result
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Meeting booked & CRM updated automatically.
                    </p>
                  </div>
                </div>
                <div className="mt-4 h-16 rounded-xl bg-white/5 flex items-center justify-center">
                  <span className="text-sm font-medium text-amber-500">
                    Deal Added to Pipeline
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

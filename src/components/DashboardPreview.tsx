import { motion } from 'framer-motion';
import { LayoutDashboard, Target, Bot, BarChart3, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { ContainerScroll } from './ui/container-scroll';

export default function DashboardPreview() {
  const stats = [
    { label: 'Active Leads', value: '127', icon: Target, trend: '+23%' },
    { label: 'Meetings Scheduled', value: '34', icon: Calendar, trend: '+12%' },
    { label: 'AI Tasks Pending', value: '8', icon: Bot, trend: '-5%' },
  ];

  const chartData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 85 },
    { month: 'Apr', value: 92 },
    { month: 'May', value: 88 },
    { month: 'Jun', value: 95 },
  ];

  const deals = [
    { company: 'Acme Corp', stage: 'Proposal', amount: '$45,000', color: 'amber' },
    { company: 'TechStart Inc', stage: 'Negotiation', amount: '$78,500', color: 'amber' },
    { company: 'GlobalTech', stage: 'Discovery', amount: '$32,000', color: 'amber' },
    { company: 'DataFlow Systems', stage: 'Closed Won', amount: '$125,000', color: 'amber' },
  ];

  const navItems = [
    { label: 'Leads', icon: Target, active: true },
    { label: 'Deals', icon: DollarSign, active: false },
    { label: 'Agents', icon: Bot, active: false },
    { label: 'Analytics', icon: BarChart3, active: false },
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  const titleComponent = (
    <>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-display font-bold mb-6"
      >
        A Living Dashboard
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-xl text-gray-300"
      >
        Watch your pipeline fill up in real-time.
      </motion.p>
    </>
  );

  // SVG overlay for mock line/area chart atop bars
  const svgWidth = 600;
  const svgHeight = 100;
  const points = chartData.map((d, i) => ({
    x: (i / (chartData.length - 1)) * svgWidth,
    y: svgHeight - (d.value / maxValue) * svgHeight,
  }));
  const linePath = 'M ' + points.map(p => `${p.x},${p.y}`).join(' L ');
  const areaPath = `M 0,${svgHeight} L ${points.map(p => `${p.x},${p.y}`).join(' L ')} L ${svgWidth},${svgHeight} Z`;

  return (
    <section id="dashboard" className="relative z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <ContainerScroll titleComponent={titleComponent}>
          <div className="glass-strong rounded-2xl overflow-hidden border-2 border-white/20 h-full">
            <div className="flex flex-col lg:flex-row">
              {/* Sidebar */}
              <div className="lg:w-48 bg-white/5 border-b lg:border-b-0 lg:border-r border-white/10 p-4">
                <div className="flex lg:flex-col gap-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          item.active
                            ? 'bg-gradient-to-r from-leadq-amber/20 to-leadq-amber-dark/20 border border-leadq-amber/30 text-white'
                            : 'text-gray-400 hover:bg-white/5 hover:text-gray-300'
                        }`}
                      >
                        <Icon size={18} strokeWidth={2} />
                        <span className="text-sm font-medium hidden lg:inline">{item.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6 lg:p-8">
                {/* Header with AI Status */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="text-leadq-amber" size={24} strokeWidth={2} />
                    <h3 className="text-xl font-display font-bold text-white">Pipeline Overview</h3>
                  </div>
                  <div className="flex items-center gap-2 glass px-3 py-2 rounded-lg border border-leadq-amber/30">
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="w-2 h-2 rounded-full bg-leadq-amber glow-amber"
                    />
                    <span className="text-sm font-medium text-white">AI Agent Active</span>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                        className="glass rounded-xl p-4 border border-white/10"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <Icon className="text-leadq-amber" size={20} strokeWidth={2} />
                          <span className={`text-xs font-medium ${
                            stat.trend.startsWith('+') ? 'text-green-400' : 'text-orange-400'
                          }`}>
                            {stat.trend}
                          </span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Chart Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="glass rounded-xl p-6 border border-white/10 mb-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-display font-bold text-white">Pipeline Growth</h4>
                    <div className="flex items-center gap-2 text-green-400">
                      <TrendingUp size={18} strokeWidth={2} />
                      <span className="text-sm font-medium">+46% vs last quarter</span>
                    </div>
                  </div>

                  {/* Combined SVG line/area overlay + bars */}
                  <div className="relative h-48">
                    <svg
                      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="amberArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#d97706" stopOpacity="0.05" />
                        </linearGradient>
                      </defs>

                      {Array.from({ length: 4 }).map((_, i) => {
                        const y = ((i + 1) / 4) * svgHeight;
                        return (
                          <line
                            key={i}
                            x1={0}
                            y1={y}
                            x2={svgWidth}
                            y2={y}
                            stroke="white"
                            strokeOpacity={0.1}
                            strokeWidth={1}
                          />
                        );
                      })}

                      <path d={areaPath} fill="url(#amberArea)" />
                      <path d={linePath} fill="none" stroke="currentColor" strokeWidth={2.5} className="text-leadq-amber" />
                      {points.map((p, idx) => (
                        <circle
                          key={idx}
                          cx={p.x}
                          cy={p.y}
                          r={3}
                          fill="#ffffff"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          className="text-leadq-amber"
                        />
                      ))}
                    </svg>

                    <div className="relative flex items-end justify-between gap-3 h-48">
                      {chartData.map((item, index) => {
                        const heightPercent = (item.value / maxValue) * 100;
                        const isEven = index % 2 === 0;

                        return (
                          <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                            <motion.div
                              initial={{ height: 0 }}
                              whileInView={{ height: `${heightPercent}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: index * 0.1 + 0.6, ease: 'easeOut' }}
                              className={`w-full rounded-t-lg relative overflow-hidden glow-amber`}
                              style={{
                                background: isEven
                                  ? 'linear-gradient(to top, #d97706, #f59e0b)'
                                  : 'linear-gradient(to top, #f59e0b, #fbbf24)',
                              }}
                            >
                              <motion.div
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                  delay: index * 0.2,
                                }}
                                className="absolute inset-0 bg-gradient-to-t from-transparent to-white/30"
                              />
                            </motion.div>
                            <span className="text-xs text-gray-400 font-medium">{item.month}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Pipeline List */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="glass rounded-xl p-6 border border-white/10"
                >
                  <h4 className="text-lg font-display font-bold text-white mb-4">Active Deals</h4>
                  <div className="space-y-3">
                    {deals.map((deal, index) => (
                      <motion.div
                        key={deal.company}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.9 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-white/10"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div
                            className="w-1.5 h-12 rounded-full bg-gradient-to-b from-leadq-amber to-leadq-amber-dark/50 glow-amber"
                          />
                          <div className="flex-1">
                            <div className="text-white font-medium mb-1">{deal.company}</div>
                            <div className="text-sm text-gray-400">{deal.stage}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold">{deal.amount}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Target, Bot, BarChart3, TrendingUp, Calendar, DollarSign, Zap, CheckCircle, Clock, PieChart, ArrowUpRight } from 'lucide-react';
import { ContainerScroll } from './ui/container-scroll';

type ViewType = 'Leads' | 'Deals' | 'Agents' | 'Analytics';

export default function DashboardPreview() {
  const [activeView, setActiveView] = useState<ViewType>('Leads');

  // Leads View Data
  const leadsStats = [
    { label: 'Active Leads', value: '127', icon: Target, trend: '+23%' },
    { label: 'Meetings Scheduled', value: '34', icon: Calendar, trend: '+12%' },
    { label: 'AI Tasks Pending', value: '8', icon: Bot, trend: '-5%' },
  ];

  const leadsChartData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 85 },
    { month: 'Apr', value: 92 },
    { month: 'May', value: 88 },
    { month: 'Jun', value: 95 },
  ];

  const leadsList = [
    { company: 'Acme Corp', stage: 'Proposal', amount: '$45,000', color: 'amber' },
    { company: 'TechStart Inc', stage: 'Negotiation', amount: '$78,500', color: 'amber' },
    { company: 'GlobalTech', stage: 'Discovery', amount: '$32,000', color: 'amber' },
    { company: 'DataFlow Systems', stage: 'Closed Won', amount: '$125,000', color: 'amber' },
  ];

  // Deals View Data
  const dealsStats = [
    { label: 'Open Deals', value: '42', icon: DollarSign, trend: '+18%' },
    { label: 'Won This Month', value: '12', icon: CheckCircle, trend: '+45%' },
    { label: 'Pipeline Value', value: '$2.4M', icon: TrendingUp, trend: '+32%' },
  ];

  const dealsChartData = [
    { month: 'Jan', value: 45 },
    { month: 'Feb', value: 62 },
    { month: 'Mar', value: 58 },
    { month: 'Apr', value: 75 },
    { month: 'May', value: 82 },
    { month: 'Jun', value: 98 },
  ];

  const dealsList = [
    { company: 'Enterprise Solutions', stage: 'Contract Sent', amount: '$245,000', color: 'amber' },
    { company: 'Quantum Labs', stage: 'Demo Scheduled', amount: '$89,000', color: 'amber' },
    { company: 'NextGen Systems', stage: 'Closed Won', amount: '$156,000', color: 'amber' },
    { company: 'CloudFirst Inc', stage: 'Proposal Review', amount: '$67,500', color: 'amber' },
  ];

  // Agents View Data
  const agentsStats = [
    { label: 'Active Agents', value: '6', icon: Bot, trend: '+2' },
    { label: 'Tasks Completed', value: '1,847', icon: CheckCircle, trend: '+156' },
    { label: 'Avg Response Time', value: '1.2s', icon: Zap, trend: '-0.3s' },
  ];

  const agentsList = [
    { name: 'Lead Qualifier', status: 'Active', tasks: '234 today', efficiency: '98%' },
    { name: 'Email Composer', status: 'Active', tasks: '89 today', efficiency: '95%' },
    { name: 'Meeting Scheduler', status: 'Active', tasks: '45 today', efficiency: '99%' },
    { name: 'Data Enricher', status: 'Processing', tasks: '12 pending', efficiency: '97%' },
  ];

  // Analytics View Data
  const analyticsStats = [
    { label: 'Conversion Rate', value: '24.5%', icon: PieChart, trend: '+3.2%' },
    { label: 'Avg Deal Size', value: '$68K', icon: DollarSign, trend: '+12%' },
    { label: 'Sales Velocity', value: '18 days', icon: Clock, trend: '-4 days' },
  ];

  const analyticsChartData = [
    { month: 'Jan', value: 72 },
    { month: 'Feb', value: 68 },
    { month: 'Mar', value: 79 },
    { month: 'Apr', value: 85 },
    { month: 'May', value: 91 },
    { month: 'Jun', value: 88 },
  ];

  const sourcesList = [
    { source: 'Organic Search', leads: '456', conversion: '28%', trend: '+5%' },
    { source: 'LinkedIn Ads', leads: '234', conversion: '22%', trend: '+8%' },
    { source: 'Email Campaigns', leads: '189', conversion: '31%', trend: '+2%' },
    { source: 'Referrals', leads: '145', conversion: '42%', trend: '+12%' },
  ];

  // Get current view data
  const getCurrentStats = () => {
    switch (activeView) {
      case 'Deals': return dealsStats;
      case 'Agents': return agentsStats;
      case 'Analytics': return analyticsStats;
      default: return leadsStats;
    }
  };

  const getCurrentChartData = () => {
    switch (activeView) {
      case 'Deals': return dealsChartData;
      case 'Agents': return leadsChartData;
      case 'Analytics': return analyticsChartData;
      default: return leadsChartData;
    }
  };

  const getViewConfig = () => {
    switch (activeView) {
      case 'Deals':
        return { title: 'Deal Pipeline', icon: DollarSign, chartTitle: 'Revenue Growth', chartTrend: '+52% vs last quarter' };
      case 'Agents':
        return { title: 'AI Agents Hub', icon: Bot, chartTitle: 'Tasks Processed', chartTrend: '+89% efficiency' };
      case 'Analytics':
        return { title: 'Performance Analytics', icon: BarChart3, chartTitle: 'Conversion Trends', chartTrend: '+24% improvement' };
      default:
        return { title: 'Pipeline Overview', icon: LayoutDashboard, chartTitle: 'Pipeline Growth', chartTrend: '+46% vs last quarter' };
    }
  };

  const navItems = [
    { label: 'Leads' as ViewType, icon: Target },
    { label: 'Deals' as ViewType, icon: DollarSign },
    { label: 'Agents' as ViewType, icon: Bot },
    { label: 'Analytics' as ViewType, icon: BarChart3 },
  ];

  const currentChartData = getCurrentChartData();
  const maxValue = Math.max(...currentChartData.map(d => d.value));

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
  const points = currentChartData.map((d, i) => ({
    x: (i / (currentChartData.length - 1)) * svgWidth,
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
                    const isActive = activeView === item.label;
                    return (
                      <motion.button
                        key={item.label}
                        onClick={() => setActiveView(item.label)}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
                          isActive
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
              <div className="flex-1 p-2 sm:p-4 md:p-6 lg:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeView}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                {/* Header with AI Status */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const ViewIcon = getViewConfig().icon;
                      return <ViewIcon className="text-leadq-amber" size={24} strokeWidth={2} />;
                    })()}
                    <h3 className="text-xl font-display font-bold text-white">{getViewConfig().title}</h3>
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
                  {getCurrentStats().map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
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

                {/* Chart Section - Show for Leads, Deals, Analytics */}
                {activeView !== 'Agents' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="glass rounded-xl p-6 border border-white/10 mb-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-display font-bold text-white">{getViewConfig().chartTitle}</h4>
                    <div className="flex items-center gap-2 text-green-400">
                      <TrendingUp size={18} strokeWidth={2} />
                      <span className="text-sm font-medium">{getViewConfig().chartTrend}</span>
                    </div>
                  </div>

                  {/* Combined SVG line/area overlay + bars */}
                  <div className="relative h-32 sm:h-40 md:h-48">
                    <svg
                      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                      preserveAspectRatio="xMidYMid slice"
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
                      {currentChartData.map((item, index) => {
                        const heightPercent = (item.value / maxValue) * 100;
                        const isEven = index % 2 === 0;

                        return (
                          <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${heightPercent}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
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
                )}

                {/* Agents View - Show agent cards instead of chart */}
                {activeView === 'Agents' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="glass rounded-xl p-6 border border-white/10 mb-6"
                >
                  <h4 className="text-lg font-display font-bold text-white mb-4">Agent Status</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {agentsList.map((agent, index) => (
                      <motion.div
                        key={agent.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 rounded-lg bg-white/5 border border-white/10"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Bot className="text-leadq-amber" size={18} />
                            <span className="text-white font-medium">{agent.name}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            agent.status === 'Active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {agent.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">{agent.tasks}</span>
                          <span className="text-leadq-amber font-medium">{agent.efficiency} efficiency</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                )}

                {/* List Section - Dynamic based on view */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="glass rounded-xl p-6 border border-white/10"
                >
                  <h4 className="text-lg font-display font-bold text-white mb-4">
                    {activeView === 'Leads' && 'Active Deals'}
                    {activeView === 'Deals' && 'Deal Pipeline'}
                    {activeView === 'Agents' && 'Recent Tasks'}
                    {activeView === 'Analytics' && 'Lead Sources'}
                  </h4>
                  <div className="space-y-3">
                    {activeView === 'Leads' && leadsList.map((deal, index) => (
                      <motion.div
                        key={deal.company}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-white/10"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-1.5 h-12 rounded-full bg-gradient-to-b from-leadq-amber to-leadq-amber-dark/50 glow-amber" />
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

                    {activeView === 'Deals' && dealsList.map((deal, index) => (
                      <motion.div
                        key={deal.company}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-white/10"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-1.5 h-12 rounded-full bg-gradient-to-b from-green-400 to-green-600/50" />
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

                    {activeView === 'Agents' && [
                      { task: 'Qualified lead from Acme Corp', agent: 'Lead Qualifier', time: '2 min ago' },
                      { task: 'Sent follow-up email to TechStart', agent: 'Email Composer', time: '5 min ago' },
                      { task: 'Scheduled demo with GlobalTech', agent: 'Meeting Scheduler', time: '12 min ago' },
                      { task: 'Enriched 45 contact records', agent: 'Data Enricher', time: '18 min ago' },
                    ].map((task, index) => (
                      <motion.div
                        key={task.task}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-white/10"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-8 h-8 rounded-full bg-leadq-amber/20 flex items-center justify-center">
                            <CheckCircle className="text-leadq-amber" size={16} />
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium mb-1">{task.task}</div>
                            <div className="text-sm text-gray-400">{task.agent}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-400 text-sm">{task.time}</div>
                        </div>
                      </motion.div>
                    ))}

                    {activeView === 'Analytics' && sourcesList.map((source, index) => (
                      <motion.div
                        key={source.source}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-white/10"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-8 h-8 rounded-full bg-leadq-amber/20 flex items-center justify-center">
                            <ArrowUpRight className="text-leadq-amber" size={16} />
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium mb-1">{source.source}</div>
                            <div className="text-sm text-gray-400">{source.leads} leads</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold">{source.conversion}</div>
                          <div className="text-green-400 text-xs">{source.trend}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$49',
      period: '/month',
      credits: '1,000 AI credits/month',
      features: [
        'Email Agent access',
        'Basic analytics',
        'Email support',
        '1 team member',
        'Core integrations'
      ],
      cta: 'Get Started',
      ctaStyle: 'glass hover:glass-strong',
      popular: false
    },
    {
      name: 'Pro',
      price: '$100',
      period: '/month',
      credits: '5,000 AI credits/month',
      features: [
        'All Agents access',
        'Advanced analytics',
        'Priority support',
        '5 team members',
        'NFC capability',
        'Custom workflows',
        'API access'
      ],
      cta: 'Get Pro',
      ctaStyle: 'bg-gradient-to-r from-black to-amber-600 text-white shadow-[0_0_20px_rgba(217,119,6,0.5)] hover:shadow-[0_0_30px_rgba(217,119,6,0.7)] hover:scale-105',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      credits: 'Unlimited AI credits',
      features: [
        'Unlimited agents',
        '25,000+ credits/month',
        'White-label options',
        'Dedicated success manager',
        'Unlimited team members',
        'Custom integrations',
        'SLA guarantee',
        'On-premise option'
      ],
      cta: 'Contact Sales',
      ctaStyle: 'border-2 border-white/20 hover:border-white/40 hover:bg-white/5',
      popular: false
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
    <section id="pricing" className="relative z-10 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Pay per action, not per seat. Scale with confidence.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-3 gap-8 mb-12"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: plan.popular ? 0 : -8, transition: { duration: 0.3 } }}
              className={`glass rounded-2xl p-8 relative ${
                plan.popular ? 'scale-105 border-2 border-leadq-amber/30 shadow-[0_0_30px_rgba(245,158,11,0.2)]' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-black to-amber-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow-[0_0_15px_rgba(217,119,6,0.5)]">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-gray-400">{plan.period}</span>}
                </div>
                <p className="text-leadq-amber text-sm font-medium mt-2">{plan.credits}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-leadq-amber flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-leadq-amber focus:ring-offset-2 focus:ring-offset-leadq-bg active:scale-95 ${plan.ctaStyle}`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="glass p-6 rounded-xl">
            <p className="text-gray-300 mb-2">
              <span className="font-semibold text-white">What are credits?</span> Each AI action (email send, meeting schedule, document scan) costs credits. No surprises.
            </p>
            <a
              href="#"
              className="text-leadq-amber hover:text-leadq-amber/80 text-sm font-medium inline-flex items-center gap-1 transition-colors"
            >
              View detailed pricing →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;

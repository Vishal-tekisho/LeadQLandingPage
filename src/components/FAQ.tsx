import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const faqs = [
  {
    question: "How does the credit system work?",
    answer: "Credits are consumed based on agent actions. Lead research costs 1 credit, email sends cost 2 credits, and meeting scheduling costs 3 credits. All plans include monthly credit allocations that reset each billing cycle.",
  },
  {
    question: "Can I integrate LeadQ with Salesforce/HubSpot?",
    answer: "Yes! LeadQ offers native integrations with Salesforce, HubSpot, Pipedrive, and most major CRM platforms. Data syncs bi-directionally in real-time, ensuring your systems are always up to date.",
  },
  {
    question: "Do I need to buy NFC cards separately?",
    answer: "NFC cards are included with Pro and Enterprise plans. Starter plan users can purchase them separately at $2/card. Each card can be reprogrammed unlimited times through the dashboard.",
  },
  {
    question: "Is my data secure and compliant?",
    answer: "Absolutely. We're SOC 2 Type II certified and GDPR compliant. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We never share your data with third parties.",
  },
  {
    question: "What happens if I run out of credits?",
    answer: "When you run out of credits, agents will pause operations. You'll receive notifications at 90%, 75%, and 50% remaining. You can purchase additional credit packs anytime or upgrade your plan for higher monthly allocations.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, cancel anytime with no penalties. Your plan remains active until the end of your billing period. All your data will be available for export for 30 days after cancellation.",
  },
  {
    question: "Do you offer onboarding support?",
    answer: "Pro and Enterprise plans include dedicated onboarding with a customer success manager. Starter plan users get access to our comprehensive knowledge base, video tutorials, and email support.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenIndex(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative z-10 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass rounded-xl overflow-hidden hover:glass-strong transition-all"
            >
              <button
                onClick={() => toggleItem(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleItem(index);
                  }
                }}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-leadq-amber focus:ring-inset rounded-xl transition-all"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-semibold text-white text-lg pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={24} className="text-leadq-amber" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: 'auto',
                      opacity: 1,
                      transition: {
                        height: { duration: 0.3, ease: 'easeOut' },
                        opacity: { duration: 0.2, delay: 0.1 },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.3, ease: 'easeIn' },
                        opacity: { duration: 0.2 },
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-0">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "LeadQ cut our manual data entry by 70%. Our team can finally focus on closing.",
    name: "Sarah Chen",
    title: "VP Sales, TechCorp",
    rating: 5,
  },
  {
    quote: "The AI agents are like having 3 extra SDRs. Our pipeline doubled in 60 days.",
    name: "Marcus Rodriguez",
    title: "Head of Growth, CloudBase",
    rating: 5,
  },
  {
    quote: "Best investment we made this year. ROI was positive within the first month.",
    name: "Emily Watson",
    title: "Sales Director, DataSync",
    rating: 5,
  },
];

 export default function Testimonials() {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: 'easeOut' as const },
//     },
//   };

//   return (
//     <section className="relative z-10 py-24 px-4 border-t border-white/10">
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
//             Loved by Sales Teams Worldwide
//           </h2>
//         </motion.div>

//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
//         >
//           {testimonials.map((testimonial, index) => (
//             <motion.div
//               key={index}
//               variants={itemVariants}
//               className="glass rounded-2xl p-8 relative overflow-hidden group hover:glass-strong transition-all"
//               style={{
//                 background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)',
//                 borderImage: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(124, 58, 237, 0.3)) 1',
//               }}
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-leadq-cyan/5 to-leadq-purple/5 opacity-0 group-hover:opacity-100 transition-opacity" />

//               <div className="relative z-10">
//                 <div className="flex gap-1 mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star key={i} size={18} className="fill-leadq-cyan text-leadq-cyan" />
//                   ))}
//                 </div>

//                 <blockquote className="text-gray-300 text-lg mb-6 leading-relaxed">
//                   "{testimonial.quote}"
//                 </blockquote>

//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-leadq-cyan to-leadq-purple flex items-center justify-center text-white font-bold">
//                     {testimonial.name.split(' ').map(n => n[0]).join('')}
//                   </div>
//                   <div>
//                     <div className="font-semibold text-white">{testimonial.name}</div>
//                     <div className="text-sm text-gray-400">{testimonial.title}</div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
 }

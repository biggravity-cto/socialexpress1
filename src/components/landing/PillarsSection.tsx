
import React from 'react';
import { motion } from 'framer-motion';
import { GlobeIcon, PieChart, Sparkles, CheckCircle } from 'lucide-react';

interface PillarItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const PillarItem: React.FC<PillarItemProps> = ({ 
  icon, 
  title, 
  description, 
  delay
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-[#14142b]/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-ocean-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-ocean-500/10 group"
    >
      <div className="rounded-xl h-12 w-12 flex items-center justify-center bg-gradient-to-br from-ocean-400 to-ocean-600 text-white mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 font-display">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const PillarsSection: React.FC = () => {
  const pillars = [
    {
      icon: <GlobeIcon className="h-6 w-6" />,
      title: "Cultural Fluency",
      description: "Native teams in Seoul, Shanghai & Tokyo craft campaigns that speak directly to local travelers.",
      delay: 0,
    },
    {
      icon: <PieChart className="h-6 w-6" />,
      title: "Data-Driven Growth",
      description: "Our clients see +35% occupancy and +50% social engagement within 90 days.",
      delay: 1,
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Creative Excellence",
      description: "From immersive VR previews to scroll-stopping short-form videos—your story, brilliantly told.",
      delay: 2,
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "End-to-End Simplicity",
      description: "Strategy → Content → Paid Media → Analytics → 24/7 Support—one partner, zero headaches.",
      delay: 3,
    }
  ];

  return (
    <section className="py-20 lg:py-28 text-white" id="why-big-gravity">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block bg-ocean-900/50 text-ocean-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-ocean-700/30">
              Why Big Gravity?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Four Pillars of Our Promise
            </h2>
            <p className="text-xl text-gray-300">
              We've built our reputation on delivering measurable results through these core competencies
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <PillarItem 
              key={index}
              icon={pillar.icon}
              title={pillar.title}
              description={pillar.description}
              delay={pillar.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;

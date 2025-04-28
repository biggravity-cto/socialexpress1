
import React from 'react';
import { motion } from 'framer-motion';

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    }
  })
};

const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "Deep Dive Audit",
      description: "We analyze your current position, audience, and competitors to establish clear baselines and opportunities."
    },
    {
      number: "02",
      title: "Strategic Blueprint",
      description: "Based on our findings, we develop a custom roadmap with measurable milestones and content strategy."
    },
    {
      number: "03",
      title: "Creative & Tech Build",
      description: "Our teams create compelling assets and set up the technical infrastructure for campaign execution."
    },
    {
      number: "04",
      title: "Launch, Refine & Scale",
      description: "We launch campaigns, monitor performance, make data-driven optimizations, and scale what works."
    },
  ];

  return (
    <section id="process" className="py-20 lg:py-28 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="inline-block bg-ocean-900/50 text-ocean-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-ocean-700/30">
            How We Partner
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Seamless, Transparent, Guided
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our proven process ensures clear communication and consistent results at every stage
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="relative"
            >
              <div className="bg-[#14142b]/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-ocean-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-ocean-500/10 h-full">
                <span className="font-display text-5xl font-bold text-ocean-500/20">{step.number}</span>
                <h3 className="text-xl font-bold text-white mt-4 mb-3 font-display">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
              
              {/* Connecting line between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 h-0.5 w-8 bg-ocean-500/30"></div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mt-12 max-w-3xl mx-auto"
        >
          <p className="text-lg text-gray-300">
            Monthly reports, weekly check-ins, 24/7 local support—never wonder "what's next?"
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;


import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Sparkles, LineChart, MessageSquare, BarChart } from 'lucide-react';

interface ServiceItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-brand-primary/20 hover:border-brand-green/30 transition-all duration-300 hover:shadow-lg group"
    >
      <div className="rounded-xl h-12 w-12 flex items-center justify-center bg-gradient-to-br from-brand-primary/20 to-brand-green/20 text-brand-green mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 font-display text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "NAVER & Kakao Management",
      description: "Utilize Korean language advertising on NAVER and Instagram to enhance brand reach and brand awareness. Promote your booking offers and promotions."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Paid Advertising: NAVER",
      description: "Strategic advertising campaigns on NAVER to reach Korean audiences effectively, maximizing your return on ad spend (ROAS)."
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Content Creation & Translation",
      description: "We create and manage content for you on your Kakao Channel and your NAVER blog. We also handle all of your translation needs every month."
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Korean Public Relations",
      description: "Get word about your brand into the Korean media ecosystem using both traditional and digital strategies leveraging our background and network."
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Korean Social Listening",
      description: "Ever wonder what Koreans are saying about you? We search for reviews about your property, and then report to you weekly."
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Comprehensive Reports",
      description: "We report to you weekly on campaigns and social listening. Monthly reports on trends and benchmarking. Quarterly brand sentiment analysis."
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-space-dark via-space-blue to-space-dark text-white" id="services">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block bg-brand-green/10 text-brand-green px-4 py-1.5 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-brand-green/30">
              How Will We Help You?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Comprehensive Korean Market Strategy
            </h2>
            <p className="text-xl text-gray-300">
              We manage your strategy on NAVER and Kakao Channel, along with PR and advertising to enhance revenue, increase guest satisfaction, and boost brand awareness.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceItem 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
        
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <p className="text-lg text-gray-300">
            The Big Gravity monthly services package includes all of the above AND more (except PR). 
            We customize our services to meet your needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

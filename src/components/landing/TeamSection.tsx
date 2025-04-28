
import React from 'react';
import { motion } from 'framer-motion';

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  index: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="h-24 w-24 bg-gradient-to-br from-brand-primary to-brand-green rounded-full mx-auto mb-6"></div>
      <h3 className="text-xl font-bold text-space-dark mb-1 font-display text-center">{name}</h3>
      <p className="text-brand-primary font-medium mb-4 text-center">{role}</p>
      <p className="text-gray-600 text-center">{description}</p>
    </motion.div>
  );
};

const TeamSection: React.FC = () => {
  const team = [
    {
      name: "Peter Sukonek",
      role: "Managing Director",
      description: "Peter has been in branding & marketing for over 20 years, and owned a marketing agency in Seoul for over 10 years. Past clients include JW Marriott, The Renaissance, Hyatt, InterContinental, and many others. He speaks advanced Korean."
    },
    {
      name: "Chihyun Choe",
      role: "Director of PR & Digital",
      description: "Chihyun is a Korea-focused digital marketing and Korean PR expert. She led large teams as a PR executive at KPR, Korea's largest local PR agency, where she focused on digital advertising."
    },
    {
      name: "Brad Khan",
      role: "Chief Technical Officer",
      description: "As Big Gravity's CTO, Brad develops AI-powered solutions that help hotels and resorts unlock new revenue opportunities in the Korean market. His technology streamlines operations and enhances guest experiences."
    },
    {
      name: "Woohyung",
      role: "Market Intelligence",
      description: "Woohyung worked previously in hospitality as research partner in a major Korean travel agency. His focus at Big Gravity is strategic market intelligence for our clients. He lives in Seoul and enjoys international travel."
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-gray-50" id="team">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block bg-brand-green/10 text-brand-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-brand-primary/30">
              Our Experts
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display leading-tight bg-gradient-to-r from-space-dark to-space-blue bg-clip-text text-transparent">
              The TEAM
            </h2>
            <p className="text-xl text-gray-600">
              Meet our team of Korean market specialists with decades of experience in hospitality, marketing, and technology.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <TeamMember 
              key={index}
              name={member.name}
              role={member.role}
              description={member.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

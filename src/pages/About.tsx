
import React from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/landing/Footer';
import Navbar from '@/components/navigation/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-resort-50">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-ocean-50 text-ocean-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-resort-900 mb-6">
              Your Gateway to <span className="text-ocean-600">Korean Tourism</span>
            </h1>
            <p className="text-lg text-resort-600">
              Big Gravity specializes in connecting luxury hospitality brands with the expanding Korean travel market through data-driven strategies and cultural expertise.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-resort-800 mb-6">Our Story</h2>
              <p className="text-resort-600 mb-6">
                Founded by marketing experts with over two decades of experience in the Korean market, 
                Big Gravity was born from a simple observation: luxury hospitality brands were missing 
                significant opportunities to connect with Korean travelers due to cultural and digital barriers.
              </p>
              <p className="text-resort-600 mb-6">
                Having worked with major brands like JW Marriott, Hyatt, InterContinental, and Sheraton 
                throughout Asia Pacific, our founders recognized the potential of creating a specialized 
                agency focused on bridging this gap with authentic local expertise.
              </p>
              <p className="text-resort-600">
                Today, we're proud to be trusted by over 50 luxury resorts and lifestyle brands to amplify 
                their presence in the Korean market, driving measurable increases in bookings, engagement, 
                and brand awareness.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-resort-800 mb-6">Our Approach</h2>
              <p className="text-resort-600 mb-6">
                Big Gravity brings together deep cultural understanding, technical expertise, and creative 
                excellence to deliver results for our clients. We don't just translate content—we transform it 
                to resonate with Korean travelers.
              </p>
              <p className="text-resort-600 mb-6">
                Our team spans Seoul, Tokyo, and Phoenix, combining local market intelligence with global 
                hospitality expertise. This dual perspective ensures our strategies are both culturally relevant 
                and aligned with international hospitality standards.
              </p>
              <p className="text-resort-600">
                Through a combination of NAVER optimization, Kakao Channel management, strategic content 
                creation, and data-driven advertising, we help our clients not just reach the Korean market, 
                but truly connect with it in meaningful ways that drive business results.
              </p>
            </motion.div>
          </div>
          
          <motion.div
            className="bg-ocean-50 p-8 md:p-12 rounded-2xl max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-resort-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-resort-600 italic">
              "To empower luxury hospitality brands to understand, attract, and profit from the Korean tourist market through strategic digital excellence and cultural fluency."
            </p>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;

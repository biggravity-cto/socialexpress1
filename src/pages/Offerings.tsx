
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/landing/Footer';
import Navbar from '@/components/navigation/Navbar';

const Offerings = () => {
  const services = [
    {
      title: "NAVER & Kakao Management",
      description: "We manage your strategy on NAVER and Kakao Channel to enhance revenue, increase guest satisfaction, and boost brand awareness.",
      features: [
        "NAVER blog optimization",
        "Kakao Channel setup & management",
        "Content calendar development",
        "Performance metrics & reporting",
        "Korean SEO strategy"
      ]
    },
    {
      title: "Paid Advertising: NAVER",
      description: "Utilize Korean language advertising on NAVER and Instagram to enhance brand reach and awareness, promoting your booking offers to boost return on ad spend.",
      features: [
        "Strategic ad placement",
        "Korean keyword research",
        "A/B testing for Korean audiences",
        "Budget optimization",
        "Conversion tracking"
      ]
    },
    {
      title: "Content Creation & Translation",
      description: "We create and manage content for your Kakao Channel and NAVER blog, handling all monthly translation needs with cultural context in mind.",
      features: [
        "Korean copywriting",
        "Cultural adaptation of messaging",
        "Visual content optimization",
        "Translation of booking materials",
        "Landing page localization"
      ]
    },
    {
      title: "Korean Public Relations",
      description: "Get word about your brand into the Korean media ecosystem using both traditional and digital strategies leveraging our background and network.",
      features: [
        "Media relationship management",
        "Press release distribution",
        "Influencer partnerships",
        "Event coordination",
        "Crisis communication support"
      ]
    },
    {
      title: "Korean Social Listening",
      description: "We search for what Koreans are saying about your property, monitoring reviews and sentiment across platforms, then report to you weekly.",
      features: [
        "Review monitoring & analysis",
        "Sentiment tracking",
        "Competitor benchmarking",
        "Trend identification",
        "Strategic recommendations"
      ]
    },
    {
      title: "Comprehensive Reporting",
      description: "We provide weekly reports on NAVER ad campaigns and social listening, monthly trend reports, and quarterly brand sentiment analysis.",
      features: [
        "Visual data dashboards",
        "ROI calculation",
        "YoY performance tracking",
        "Market share analysis",
        "Executive summaries"
      ]
    }
  ];

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
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-resort-900 mb-6">
              Strategic Solutions for <span className="text-ocean-600">Korean Tourism</span>
            </h1>
            <p className="text-lg text-resort-600">
              Comprehensive digital marketing services designed specifically for luxury hospitality brands targeting the Korean market.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-resort-800 mb-3">{service.title}</h3>
                  <p className="text-resort-600 mb-6">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-ocean-600 mr-2 shrink-0 mt-0.5" />
                        <span className="text-resort-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="bg-gradient-to-br from-[#0a0a14] to-[#1c1c2e] p-8 md:p-12 rounded-2xl max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to expand your reach in the Korean market?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Our team of experts is ready to help you create a customized strategy that delivers results.
            </p>
            <Button 
              size="lg"
              className="bg-ocean-600 hover:bg-ocean-700"
            >
              Book a Strategy Call <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Offerings;

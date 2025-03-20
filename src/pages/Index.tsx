import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Image, BarChart3, MessageSquare, CheckCircle, ArrowDown } from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import GlassPanel from '@/components/ui/GlassPanel';
import BlurredSection from '@/components/ui/BlurredSection';
import { motion } from 'framer-motion';

const Index = () => {
  // Refs for scrolling
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  // Scroll to features section
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-resort-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-ocean-50 text-ocean-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                AI-Powered Social Media Management
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-resort-900 mb-6 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Elevate Your Resort's <span className="text-ocean-600">Digital Presence</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-resort-600 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Streamline your hospitality marketing with our all-in-one platform. Create stunning content, manage campaigns, and analyze performance—all in one place.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Link to="/dashboard">
                <Button className="bg-ocean-600 hover:bg-ocean-700 text-white px-8 py-6 rounded-lg text-lg transition-all duration-300 shadow-sm hover:shadow">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={scrollToFeatures}
                className="px-8 py-6 rounded-lg text-lg bg-white/70 backdrop-blur-sm transition-all duration-300"
              >
                Explore Features <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="relative mt-8 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <BlurredSection intensity="strong" color="bg-white/20" className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/placeholder.svg" 
                alt="ResortFlux Dashboard Preview" 
                className="w-full h-auto rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-resort-900/20 to-transparent rounded-2xl"></div>
            </BlurredSection>
            
            {/* Floating elements */}
            <div className="absolute -left-4 top-1/4 transform -translate-y-1/2 hidden md:block">
              <GlassPanel className="p-4 animate-pulse-slow">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-ocean-100">
                    <CheckCircle className="h-5 w-5 text-ocean-600" />
                  </div>
                  <div className="text-sm font-medium text-resort-800">Post Scheduled</div>
                </div>
              </GlassPanel>
            </div>
            
            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden md:block">
              <GlassPanel className="p-4 animate-pulse-slow" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-green-100">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-sm font-medium text-resort-800">+27% Engagement</div>
                </div>
              </GlassPanel>
            </div>
          </motion.div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-ocean-100 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sand-100 rounded-full filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-resort-50 to-white z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block bg-sand-50 text-sand-600 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              Platform Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-resort-900 mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-resort-600 max-w-3xl mx-auto">
              Our comprehensive suite of tools is designed specifically for hospitality resorts to streamline your digital marketing efforts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="h-8 w-8 text-ocean-600" />,
                title: "Content Calendar",
                description: "Plan and schedule your content across all platforms with our intuitive drag-and-drop calendar interface.",
                delay: 0.1
              },
              {
                icon: <Image className="h-8 w-8 text-purple-600" />,
                title: "AI Content Generation",
                description: "Create engaging posts with our AI assistant that understands hospitality-specific content needs.",
                delay: 0.2
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-green-600" />,
                title: "Performance Analytics",
                description: "Track the success of your campaigns with detailed analytics and actionable insights.",
                delay: 0.3
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-amber-600" />,
                title: "Engagement Management",
                description: "Manage comments and messages across all platforms from a single inbox.",
                delay: 0.4
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-rose-600" />,
                title: "Brand Consistency",
                description: "Maintain consistent branding across all your content with templated designs and style guides.",
                delay: 0.5
              },
              {
                icon: <ArrowRight className="h-8 w-8 text-blue-600" />,
                title: "Cross-Platform Publishing",
                description: "Publish to Instagram, Facebook, Twitter, and more with a single click.",
                delay: 0.6
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: feature.delay }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <BlurredSection className="h-full p-8 transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:bg-white/70">
                  <div className="p-3 bg-white rounded-xl inline-block mb-4 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-resort-800 mb-3">{feature.title}</h3>
                  <p className="text-resort-600">{feature.description}</p>
                </BlurredSection>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-resort-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-5xl mx-auto bg-gradient-to-r from-ocean-600 to-ocean-700 rounded-2xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Resort's Social Media Strategy?</h2>
              <p className="text-lg text-ocean-100 mb-10 max-w-3xl mx-auto">
                Join hundreds of hospitality brands already using our platform to boost engagement, save time, and increase bookings.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link to="/dashboard">
                  <Button className="bg-white text-ocean-700 hover:bg-ocean-50 px-8 py-6 rounded-lg text-lg">
                    Start Free Trial
                  </Button>
                </Link>
                <Button variant="outline" className="border-ocean-300 text-white hover:bg-ocean-500 px-8 py-6 rounded-lg text-lg">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center mb-4">
                <span className="font-bold text-xl tracking-tight text-resort-800">Resort<span className="text-ocean-600">Flux</span></span>
              </Link>
              <p className="text-resort-600 mb-4">
                AI-powered social media management built specifically for hospitality resorts.
              </p>
            </div>
            
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Integrations", "Roadmap", "Updates"]
              },
              {
                title: "Resources",
                links: ["Blog", "Guides", "Case Studies", "API Docs", "Help Center"]
              },
              {
                title: "Company",
                links: ["About", "Customers", "Careers", "Contact", "Legal"]
              }
            ].map((column, index) => (
              <div key={index}>
                <h3 className="font-medium text-resort-800 mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-resort-600 hover:text-resort-900 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-resort-500 text-sm">
              © {new Date().getFullYear()} ResortFlux. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {/* Convert anchor tags to Link components */}
              <Link to="#" className="text-resort-500 hover:text-resort-900 transition-colors">
                Twitter
              </Link>
              <Link to="#" className="text-resort-500 hover:text-resort-900 transition-colors">
                LinkedIn
              </Link>
              <Link to="#" className="text-resort-500 hover:text-resort-900 transition-colors">
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Scroll to top button */}
      {isScrolled && (
        <button 
          className="fixed bottom-6 right-6 p-3 bg-ocean-600 text-white rounded-full shadow-md hover:bg-ocean-700 transition-all duration-300 z-50 animate-fade-in"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Index;

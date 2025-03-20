
import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/landing/Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CaseStudies = () => {
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
              Success Stories
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-resort-900 mb-6">
              Resort <span className="text-ocean-600">Case Studies</span>
            </h1>
            <p className="text-lg text-resort-600">
              See how leading resorts and hospitality brands have transformed their social media presence and achieved remarkable results with our platform.
            </p>
          </motion.div>
          
          <div className="space-y-16 max-w-5xl mx-auto">
            {caseStudies.map((study, index) => (
              <motion.div 
                key={index}
                className="flex flex-col md:flex-row gap-8 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="md:w-2/5">
                  <img 
                    src={study.image} 
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600 mr-2">
                      {study.category}
                    </span>
                    <span className="text-resort-500 text-sm">{study.location}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-resort-800 mb-4">{study.title}</h3>
                  <div className="flex flex-wrap gap-4 mb-6">
                    {study.results.map((result, i) => (
                      <div key={i} className="bg-resort-50 px-4 py-2 rounded-lg">
                        <span className="block text-xl font-bold text-ocean-600">{result.stat}</span>
                        <span className="text-sm text-resort-600">{result.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-resort-600 mb-6">{study.excerpt}</p>
                  <Link 
                    to="#" 
                    className="inline-flex items-center text-ocean-600 font-medium hover:text-ocean-700 transition-colors"
                  >
                    Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// Sample case studies data
const caseStudies = [
  {
    title: "How Paradise Bay Resort Increased Bookings by 43% Using Social Media Strategy",
    excerpt: "By implementing our AI-powered content creation and strategic posting schedule, Paradise Bay Resort saw a dramatic increase in engagement and direct bookings.",
    category: "Luxury Resort",
    location: "Maldives",
    image: "/placeholder.svg",
    results: [
      { stat: "43%", label: "Booking Increase" },
      { stat: "127%", label: "Engagement Growth" },
      { stat: "58%", label: "Content Efficiency" }
    ]
  },
  {
    title: "Mountain View Lodge's Social Media Transformation Journey",
    excerpt: "Learn how this boutique mountain retreat revitalized their online presence and connected with a younger demographic of adventure travelers.",
    category: "Boutique Lodge",
    location: "Colorado, USA",
    image: "/placeholder.svg",
    results: [
      { stat: "215%", label: "Instagram Growth" },
      { stat: "67%", label: "Website Traffic" },
      { stat: "31%", label: "Revenue Increase" }
    ]
  },
  {
    title: "Coastal Getaway Hotel Group's Multi-Property Social Media Success",
    excerpt: "Discover how this hotel chain maintained brand consistency while highlighting unique features across 12 different properties.",
    category: "Hotel Chain",
    location: "Mediterranean Coast",
    image: "/placeholder.svg",
    results: [
      { stat: "54%", label: "Cross-Property Bookings" },
      { stat: "78%", label: "Content Production ↑" },
      { stat: "12hr", label: "Team Time Saved Weekly" }
    ]
  }
];

export default CaseStudies;

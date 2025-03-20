
import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/landing/Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Download } from 'lucide-react';

const Guides = () => {
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
              Resource Hub
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-resort-900 mb-6">
              Comprehensive <span className="text-ocean-600">Guides & Resources</span>
            </h1>
            <p className="text-lg text-resort-600">
              In-depth resources to help you master resort social media marketing and maximize your digital presence.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {guides.map((guide, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img 
                  src={guide.image} 
                  alt={guide.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${guide.categoryColor}`}>
                      {guide.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-resort-800 mb-3">{guide.title}</h3>
                  <p className="text-resort-600 mb-4">{guide.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-resort-500 text-sm">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>{guide.pages} pages</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{guide.readTime} min read</span>
                    </div>
                    
                    <Link
                      to="#"
                      className="flex items-center text-ocean-600 font-medium hover:text-ocean-700 transition-colors"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      <span>Download</span>
                    </Link>
                  </div>
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

// Sample guides data
const guides = [
  {
    title: "The Ultimate Social Media Strategy Blueprint for Resorts",
    description: "A step-by-step guide to creating and implementing a comprehensive social media strategy for your property.",
    category: "Strategy",
    categoryColor: "bg-blue-100 text-blue-600",
    pages: 42,
    readTime: 35,
    image: "/placeholder.svg"
  },
  {
    title: "Visual Storytelling: A Guide to Resort Photography for Social Media",
    description: "Learn how to capture and curate stunning visual content that showcases your resort's unique features and amenities.",
    category: "Content Creation",
    categoryColor: "bg-purple-100 text-purple-600",
    pages: 38,
    readTime: 30,
    image: "/placeholder.svg"
  },
  {
    title: "Seasonal Marketing Playbook for Hospitality Brands",
    description: "Tactical approaches to maximize bookings during high seasons and maintain engagement during off-peak periods.",
    category: "Marketing",
    categoryColor: "bg-green-100 text-green-600",
    pages: 56,
    readTime: 45,
    image: "/placeholder.svg"
  },
  {
    title: "Crisis Communication on Social Media: A Guide for Resort Managers",
    description: "How to prepare for and respond to crises on social media platforms while protecting your brand reputation.",
    category: "Management",
    categoryColor: "bg-red-100 text-red-600",
    pages: 24,
    readTime: 20,
    image: "/placeholder.svg"
  }
];

export default Guides;

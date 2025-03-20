
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, Download, ExternalLink } from 'lucide-react';

const Guides = () => {
  // Sample guides data
  const guides = [
    {
      id: 1,
      title: "Complete Guide to Resort Social Media Marketing",
      description: "A comprehensive guide covering all aspects of social media marketing for resorts, from strategy to execution.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      pages: 42,
      format: "PDF",
      isFeatured: true
    },
    {
      id: 2,
      title: "Instagram for Resorts: Visual Storytelling",
      description: "Learn how to create compelling visual stories that showcase your resort's unique experiences.",
      image: "https://images.unsplash.com/photo-1554177255-61502b352de3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      pages: 28,
      format: "PDF"
    },
    {
      id: 3,
      title: "TikTok Strategy for Hospitality Brands",
      description: "Tap into the power of TikTok to reach new audiences and showcase your resort's personality.",
      image: "https://images.unsplash.com/photo-1596276020587-8044fe049813?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      pages: 24,
      format: "PDF"
    },
    {
      id: 4,
      title: "Creating Effective Paid Social Campaigns",
      description: "Maximize your advertising budget with targeted paid social media campaigns.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      pages: 36,
      format: "PDF"
    },
    {
      id: 5,
      title: "Content Calendar Template for Resorts",
      description: "A customizable template to plan your resort's social media content throughout the year.",
      image: "https://images.unsplash.com/photo-1561357747-9ddc398dc5f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      pages: 18,
      format: "Excel"
    },
    {
      id: 6,
      title: "Social Media Crisis Management",
      description: "Prepare for and navigate social media crises effectively to protect your resort's reputation.",
      image: "https://images.unsplash.com/photo-1495653797063-114787b77b23?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      pages: 22,
      format: "PDF"
    }
  ];

  // Categories for filter
  const categories = ["All Guides", "Strategy", "Platform-Specific", "Templates", "Case Studies"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 bg-gradient-to-b from-white to-resort-50 min-h-screen"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-resort-800 mb-4">
            Free Resources & Guides
          </h1>
          <p className="text-xl text-resort-600 max-w-3xl mx-auto">
            Download our expert guides to elevate your resort's social media presence
          </p>
        </div>

        {/* Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  index === 0 
                    ? 'bg-ocean-600 text-white' 
                    : 'bg-white text-resort-700 hover:bg-ocean-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Guide */}
        {guides.find(guide => guide.isFeatured) && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-16">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={guides.find(guide => guide.isFeatured)?.image} 
                  alt={guides.find(guide => guide.isFeatured)?.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <span className="bg-ocean-100 text-ocean-800 text-xs px-3 py-1 rounded-full font-medium">Featured Guide</span>
                  <span className="ml-3 text-resort-500 text-sm flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {guides.find(guide => guide.isFeatured)?.pages} pages
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-resort-800 mb-4">
                  {guides.find(guide => guide.isFeatured)?.title}
                </h2>
                
                <p className="text-resort-600 mb-8">
                  {guides.find(guide => guide.isFeatured)?.description}
                </p>
                
                <Button className="self-start flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Download Guide
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {guides.filter(guide => !guide.isFeatured).map((guide) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="relative h-48">
                <img 
                  src={guide.image} 
                  alt={guide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white text-resort-700 text-xs px-2 py-1 rounded font-medium">
                  {guide.format}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-resort-500 text-sm flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {guide.pages} pages
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-resort-800 mb-3">{guide.title}</h3>
                <p className="text-resort-600 mb-6">{guide.description}</p>
                
                <Button variant="outline" className="w-full flex items-center justify-center">
                  <Download className="mr-2 h-4 w-4" />
                  Download Guide
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Webinars Section */}
        <div className="bg-resort-50 rounded-xl p-8 md:p-12 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-resort-800 mb-3">On-Demand Webinars</h2>
            <p className="text-resort-600 max-w-2xl mx-auto">
              Watch expert sessions on the latest resort social media trends and strategies
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Leveraging User-Generated Content for Resorts",
                duration: "45 min",
                presenter: "Emma Rodriguez, Social Media Director"
              },
              {
                title: "AI Tools for Resort Content Creation",
                duration: "60 min",
                presenter: "Michael Chen, Product Manager"
              },
              {
                title: "Building an Effective Social Media Team",
                duration: "50 min",
                presenter: "Sarah Johnson, Operations Lead"
              }
            ].map((webinar, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-resort-800 mb-2">{webinar.title}</h3>
                <p className="text-sm text-resort-500 mb-4">{webinar.presenter}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-resort-500">{webinar.duration}</span>
                  <Button variant="ghost" size="sm" className="flex items-center text-ocean-600">
                    Watch <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-ocean-600 text-white rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Need Personalized Guidance?</h2>
          <p className="mb-6 opacity-90">
            Book a free 30-minute consultation with one of our resort social media experts
          </p>
          
          <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-ocean-600">
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Guides;

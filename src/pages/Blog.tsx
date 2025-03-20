
import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/landing/Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Blog = () => {
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
              Our Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-resort-900 mb-6">
              Latest Insights for <span className="text-ocean-600">Resort Marketers</span>
            </h1>
            <p className="text-lg text-resort-600">
              Discover tips, strategies, and trends to elevate your resort's social media presence.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-xs font-medium text-resort-500">{post.category}</span>
                    <span className="mx-2 text-resort-300">•</span>
                    <span className="text-xs text-resort-500">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-resort-800 mb-3">{post.title}</h3>
                  <p className="text-resort-600 mb-4">{post.excerpt}</p>
                  <Link 
                    to="#" 
                    className="text-ocean-600 font-medium hover:text-ocean-700 transition-colors"
                  >
                    Read More
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// Sample blog post data
const blogPosts = [
  {
    title: "How to Create Eye-Catching Social Media Content for Your Resort",
    excerpt: "Learn the secrets to creating content that stops scrollers in their tracks and converts them into guests.",
    category: "Content Creation",
    date: "May 15, 2023",
    image: "/placeholder.svg"
  },
  {
    title: "7 Social Media Trends Reshaping the Hospitality Industry in 2023",
    excerpt: "Stay ahead of the curve with these emerging trends that are transforming how resorts connect with guests online.",
    category: "Industry Trends",
    date: "April 28, 2023",
    image: "/placeholder.svg"
  },
  {
    title: "The Ultimate Guide to Instagram Reels for Luxury Resorts",
    excerpt: "Discover how to leverage Instagram's most engaging format to showcase your property's unique experiences.",
    category: "Platform Strategy",
    date: "April 10, 2023",
    image: "/placeholder.svg"
  },
  {
    title: "Building an Authentic Brand Voice for Your Resort on Social Media",
    excerpt: "Create a consistent and compelling voice that resonates with your target audience and reflects your brand values.",
    category: "Branding",
    date: "March 22, 2023",
    image: "/placeholder.svg"
  },
  {
    title: "How to Measure and Improve Your Resort's Social Media ROI",
    excerpt: "Turn your social media presence into a revenue-generating machine with these practical analytics strategies.",
    category: "Analytics",
    date: "March 5, 2023",
    image: "/placeholder.svg"
  },
  {
    title: "Responding to Guest Reviews: Best Practices for Resort Managers",
    excerpt: "Learn how to handle both positive and negative feedback professionally to build trust with potential guests.",
    category: "Reputation Management",
    date: "February 18, 2023",
    image: "/placeholder.svg"
  }
];

export default Blog;

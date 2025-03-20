
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Search, Calendar, User } from 'lucide-react';

const Blog = () => {
  // Sample blog post data
  const blogPosts = [
    {
      id: 1,
      title: "10 Instagram Tips for Resort Marketing",
      excerpt: "Learn how to effectively showcase your resort's amenities and experiences on Instagram.",
      author: "Emma Rodriguez",
      date: "June 15, 2023",
      category: "Social Media",
      image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"
    },
    {
      id: 2,
      title: "Using AI to Enhance Guest Experience",
      excerpt: "Discover how AI tools can help personalize and improve the guest experience at your resort.",
      author: "Michael Chen",
      date: "May 28, 2023",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"
    },
    {
      id: 3,
      title: "Sustainable Marketing for Eco-Friendly Resorts",
      excerpt: "How to promote your resort's sustainability initiatives effectively on social media.",
      author: "Sarah Johnson",
      date: "April 11, 2023",
      category: "Sustainability",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"
    },
    {
      id: 4,
      title: "Creating a Content Calendar for Seasonal Promotions",
      excerpt: "Plan your resort's seasonal promotions with an effective content calendar strategy.",
      author: "David Miller",
      date: "March 7, 2023",
      category: "Content Strategy",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"
    },
    {
      id: 5,
      title: "Responding to Guest Reviews: Best Practices",
      excerpt: "Learn how to handle both positive and negative guest reviews professionally.",
      author: "Lisa Wong",
      date: "February 23, 2023",
      category: "Customer Service",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"
    },
    {
      id: 6,
      title: "Video Marketing Strategies for Resorts",
      excerpt: "Effective ways to use video content to showcase your resort's unique experiences.",
      author: "James Wilson",
      date: "January 10, 2023",
      category: "Video Marketing",
      image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"
    }
  ];

  // Categories for filter
  const categories = ["All", "Social Media", "Technology", "Sustainability", "Content Strategy", "Customer Service", "Video Marketing"];

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
            ResortFlux Blog
          </h1>
          <p className="text-xl text-resort-600 max-w-3xl mx-auto">
            Insights, tips, and strategies for effective resort social media management
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="relative w-full md:w-96 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex flex-wrap gap-2">
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

        {/* Featured Post */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-16">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={blogPosts[0].image} 
                alt={blogPosts[0].title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="text-ocean-600 text-sm font-medium mb-2">{blogPosts[0].category}</div>
              <h2 className="text-2xl md:text-3xl font-bold text-resort-800 mb-4">{blogPosts[0].title}</h2>
              <p className="text-resort-600 mb-6">{blogPosts[0].excerpt}</p>
              
              <div className="flex items-center text-sm text-resort-500 mb-6">
                <div className="flex items-center mr-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  {blogPosts[0].date}
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {blogPosts[0].author}
                </div>
              </div>
              
              <Button className="self-start">
                Read More
              </Button>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.slice(1).map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-ocean-600 text-sm font-medium mb-2">{post.category}</div>
                <h3 className="text-xl font-semibold text-resort-800 mb-3">{post.title}</h3>
                <p className="text-resort-600 mb-4">{post.excerpt}</p>
                
                <div className="flex items-center text-sm text-resort-500 mb-4">
                  <div className="flex items-center mr-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                </div>
                
                <Button variant="ghost" className="text-ocean-600 hover:text-ocean-700 p-0">
                  Read More
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-ocean-50 rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-resort-800 mb-4">Stay Updated</h2>
          <p className="text-resort-600 mb-6">
            Subscribe to our newsletter for the latest resort marketing tips and insights
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow py-2 px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ocean-500"
            />
            <Button className="bg-resort-800 hover:bg-resort-900">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;

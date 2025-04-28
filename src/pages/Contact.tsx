
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CalendarDays, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center font-display">
            Get in Touch
          </h1>
          
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                {/* Contact Info */}
                <div className="w-full md:w-1/3 space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-brand-green mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">+1 (555) 234-5678</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-brand-green mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">contact@biggravity.com</p>
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <Link to="/book-call">
                      <Button 
                        className="w-full bg-gradient-to-r from-brand-green to-brand-secondary hover:opacity-90 text-gray-900"
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        Schedule a Call
                      </Button>
                    </Link>
                  </div>
                </div>
                
                {/* Contact Form */}
                <div className="w-full md:w-2/3">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Send Us a Message</h3>
                  
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                      ></textarea>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="bg-gradient-to-r from-brand-green to-brand-secondary hover:opacity-90 text-gray-900 px-6"
                    >
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;

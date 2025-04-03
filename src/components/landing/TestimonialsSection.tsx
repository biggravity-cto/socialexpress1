
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "GuestFlow transformed our digital strategy with intelligent AI content generation and scheduling. We've seen a 32% increase in engagement and 28% growth in direct bookings since implementation.",
    author: "Maria Johnson",
    role: "Marketing Director at Grand Resort & Spa",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "The AI Marketing Manager has become an essential part of our team. The platform's ability to analyze trends and create targeted content has significantly improved our customer satisfaction scores.",
    author: "Alex Thompson",
    role: "Social Media Manager at Oceanview Resorts",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "The analytics dashboard provides invaluable insights for our multi-property group. We've optimized our marketing strategy and seen a 45% increase in ROI from our digital channels.",
    author: "Sarah Williams",
    role: "CEO at Mountain Lodge Collection",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="inline-block bg-ocean-50 text-ocean-600 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-resort-900 mb-6">
            Trusted by Hospitality Leaders
          </h2>
          <p className="text-lg text-resort-600 max-w-3xl mx-auto">
            See how leading hotels and resorts are transforming their digital presence with GuestFlow.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-ocean-50 rounded-full transform translate-x-16 -translate-y-16 opacity-50"></div>
              
              <div className="relative z-10">
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-resort-700 mb-8 leading-relaxed italic">"​{testimonial.quote}"</p>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-ocean-100"
                  />
                  <div>
                    <h4 className="font-bold text-resort-800">{testimonial.author}</h4>
                    <p className="text-resort-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

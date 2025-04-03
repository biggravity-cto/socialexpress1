
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Guest Flow transformed our social media strategy with its AI-powered content generation. We've seen a 38% increase in engagement and 25% growth in direct bookings from social channels.",
    author: "Maria Johnson",
    role: "Marketing Director at Grand Resort & Spa",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "The unified platform streamlined our communication process across all social channels. We're responding to guests in real-time, which has significantly improved our customer satisfaction scores.",
    author: "Alex Thompson",
    role: "Social Media Manager at Oceanview Resorts",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "The analytics dashboard provides insights that help us make data-driven decisions. We've optimized our content strategy and seen a 45% increase in booking inquiries directly from our social channels.",
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
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="bg-ocean-50 p-3 rounded-full mr-4">
                  <Quote className="h-5 w-5 text-ocean-500" />
                </div>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <p className="text-resort-700 mb-8 leading-relaxed">"{testimonial.quote}"</p>
              
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

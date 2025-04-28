
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "BigGravity's Naver strategy increased our Korean bookings by 40% in 60 days.",
      author: "Jung Eunsub",
      role: "Director of Sales & Marketing, Premier Village Da Nang",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "Their WeChat campaign delivered a 4× ROI and streamlined our guest support.",
      author: "Ngan Pham",
      role: "Marketing Lead, Luxury Beach Resort",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-28 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="inline-block bg-ocean-900/50 text-ocean-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-ocean-700/30">
            Proof in Performance
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Real Results, Real Stories
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how we've helped leading hospitality brands transform their digital presence and bottom line
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-[#14142b]/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-ocean-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-ocean-500/10 relative"
            >
              <Quote className="absolute top-8 right-8 h-12 w-12 text-ocean-500/20" />
              
              <p className="text-lg md:text-xl text-white mb-8 leading-relaxed relative z-10">"{testimonial.quote}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-ocean-500/30"
                />
                <div>
                  <h4 className="font-bold text-white">{testimonial.author}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Trust Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 text-center"
        >
          <h3 className="text-lg text-gray-400 mb-6">Trusted by World-Class Brands</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
            <div className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Hilton_Hotels_and_Resorts_logo.svg" alt="Hilton" className="h-full" />
            </div>
            <div className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300">
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/8b/Hyatt_Logo.svg" alt="Hyatt" className="h-full" />
            </div>
            <div className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/56/Marriott_Logo.svg" alt="Marriott" className="h-full" />
            </div>
            <div className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/9b/M%C3%B6venpick.svg" alt="Mövenpick" className="h-full" />
            </div>
            <div className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Sofitel_logo_%28sans_texte%29.svg" alt="Sofitel" className="h-full" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;


import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, ChevronDown } from 'lucide-react';

const CaseStudies = () => {
  // Sample case studies data
  const caseStudies = [
    {
      id: 1,
      title: "Paradise Bay Resort: 300% Social Media Engagement Growth",
      description: "How Paradise Bay Resort used ResortFlux to transform their social media strategy and drive measurable results.",
      results: [
        "300% increase in social media engagement",
        "45% growth in direct bookings from social channels",
        "2.3x ROI on social media advertising spend"
      ],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      logo: "https://via.placeholder.com/80",
      clientName: "Paradise Bay Resort & Spa",
      isFeatured: true
    },
    {
      id: 2,
      title: "Mountain Peaks Lodge: Building Brand Awareness",
      description: "How this boutique mountain resort established a distinctive brand voice across social platforms.",
      results: [
        "210% increase in Instagram followers",
        "85% improvement in content engagement rates",
        "Featured in 3 major travel publications"
      ],
      image: "https://images.unsplash.com/photo-1601701119533-fde20cecbf4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      logo: "https://via.placeholder.com/80",
      clientName: "Mountain Peaks Lodge"
    },
    {
      id: 3,
      title: "Seaside Villas: UGC-Driven Marketing Strategy",
      description: "Leveraging user-generated content to create authentic marketing materials and build trust.",
      results: [
        "400+ pieces of UGC collected monthly",
        "35% decrease in content production costs",
        "28% increase in booking conversion rate"
      ],
      image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      logo: "https://via.placeholder.com/80",
      clientName: "Seaside Villas Resort"
    },
    {
      id: 4,
      title: "Tropical Palms: Crisis Management Success",
      description: "How this resort effectively managed its online reputation during a regional crisis.",
      results: [
        "Maintained 4.7/5 review rating during crisis period",
        "93% positive sentiment in social media mentions",
        "50% reduction in negative customer feedback"
      ],
      image: "https://images.unsplash.com/photo-1642548666500-7990b88e72f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      logo: "https://via.placeholder.com/80",
      clientName: "Tropical Palms Resort"
    },
    {
      id: 5,
      title: "Urban Skyline Hotel: Local Experience Marketing",
      description: "Creating a social strategy that highlighted local experiences to attract urban travelers.",
      results: [
        "25% increase in bookings from local experience packages",
        "180% growth in local partnership referrals",
        "Featured in city tourism campaign"
      ],
      image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      logo: "https://via.placeholder.com/80",
      clientName: "Urban Skyline Hotel & Suites"
    },
    {
      id: 6,
      title: "Island Breeze: Video-First Content Strategy",
      description: "How this resort leveraged short-form video to capture the attention of younger travelers.",
      results: [
        "500K+ views on TikTok content in first quarter",
        "37% increase in Gen Z and Millennial bookings",
        "42% engagement rate on video content"
      ],
      image: "https://images.unsplash.com/photo-1609602644879-dd158c993757?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      logo: "https://via.placeholder.com/80",
      clientName: "Island Breeze Resort"
    }
  ];

  // Filter categories
  const categories = ["All Case Studies", "Engagement Growth", "Brand Awareness", "UGC Strategy", "Crisis Management", "Video Marketing"];

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
            Success Stories
          </h1>
          <p className="text-xl text-resort-600 max-w-3xl mx-auto">
            See how resorts are transforming their social media presence with ResortFlux
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

        {/* Featured Case Study */}
        {caseStudies.find(study => study.isFeatured) && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-16">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={caseStudies.find(study => study.isFeatured)?.image} 
                  alt={caseStudies.find(study => study.isFeatured)?.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center mb-6">
                  <span className="bg-ocean-100 text-ocean-800 text-xs px-3 py-1 rounded-full font-medium">Featured Case Study</span>
                </div>
                
                <div className="mb-6">
                  <img 
                    src={caseStudies.find(study => study.isFeatured)?.logo} 
                    alt={caseStudies.find(study => study.isFeatured)?.clientName}
                    className="h-12 w-auto"
                  />
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-resort-800 mb-4">
                  {caseStudies.find(study => study.isFeatured)?.title}
                </h2>
                
                <p className="text-resort-600 mb-6">
                  {caseStudies.find(study => study.isFeatured)?.description}
                </p>
                
                <div className="mb-8">
                  <h3 className="font-semibold text-resort-800 mb-3">Key Results:</h3>
                  <ul className="space-y-2">
                    {caseStudies.find(study => study.isFeatured)?.results.map((result, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-ocean-500 mr-2">✓</span>
                        <span className="text-resort-700">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button className="self-start flex items-center">
                  Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {caseStudies.filter(study => !study.isFeatured).map((study) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col"
            >
              <div className="relative h-48">
                <img 
                  src={study.image} 
                  alt={study.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="mb-4">
                  <img 
                    src={study.logo} 
                    alt={study.clientName}
                    className="h-10 w-auto"
                  />
                </div>
                
                <h3 className="text-xl font-semibold text-resort-800 mb-3">{study.title}</h3>
                <p className="text-resort-600 mb-6">{study.description}</p>
                
                <div className="mt-auto">
                  <Button variant="ghost" className="text-ocean-600 hover:text-ocean-700 flex items-center p-0">
                    Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="bg-resort-50 rounded-xl p-8 md:p-12 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-resort-800 mb-3">What Our Clients Say</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "ResortFlux transformed our approach to social media. We've seen a dramatic increase in engagement and direct bookings.",
                author: "Emma Rodriguez",
                position: "Marketing Director, Paradise Bay Resort",
                image: "https://via.placeholder.com/64"
              },
              {
                quote: "The AI-powered content generation saves us hours of work each week, and the results have been phenomenal.",
                author: "Michael Chen",
                position: "Social Media Manager, Urban Skyline Hotel",
                image: "https://via.placeholder.com/64"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-resort-600 mb-6 italic">
                  "{testimonial.quote}"
                </div>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-medium text-resort-800">{testimonial.author}</div>
                    <div className="text-sm text-resort-500">{testimonial.position}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-resort-800 mb-4">Ready to become our next success story?</h2>
          <p className="text-resort-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of resorts that have transformed their social media presence with ResortFlux
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-ocean-600 hover:bg-ocean-700">
              Start Your Free Trial
            </Button>
            <Button variant="outline">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseStudies;

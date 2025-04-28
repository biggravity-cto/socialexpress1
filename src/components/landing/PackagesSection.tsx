
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PackagesSection: React.FC = () => {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);

  const packages = [
    {
      name: 'Launchpad',
      perfectFor: 'Boutique Hotels & B&Bs',
      outcomes: 'Naver & Kakao Foundations → 10K+ Impressions & 200 Leads',
      investment: '$1,500',
      period: '/mo',
      features: [
        'Local search optimization',
        'Social media setup & strategy',
        'Basic content creation (2 platforms)',
        'Monthly performance reports',
        'Email marketing templates'
      ],
      cta: 'Get Started',
      variant: 'outline',
      popular: false
    },
    {
      name: 'Momentum',
      perfectFor: 'Multi-Venue Restaurants & Tours',
      outcomes: '+ WeChat & LINE Ads → 100K+ Reach & 500 Leads',
      investment: '$3,000',
      period: '/mo',
      features: [
        'Everything in Launchpad, plus:',
        'Expanded to 4 regional platforms',
        'Advanced targeting & retargeting',
        'Custom content creation (8/month)',
        'Influencer partnership management',
        'Weekly analytics and optimization'
      ],
      cta: 'Most Popular Choice',
      variant: 'default',
      popular: true
    },
    {
      name: 'Pinnacle',
      perfectFor: 'Resorts & Destination Marketers',
      outcomes: '+ PR, Video Production, Advanced Analytics → 30% Rev Growth',
      investment: '$5,000',
      period: '/mo',
      features: [
        'Everything in Momentum, plus:',
        'Premium video & VR content',
        'Full PR & media outreach',
        'Dedicated account strategist',
        'Cross-platform campaign integration',
        'Custom dashboard & reporting',
        'Quarterly strategy sessions'
      ],
      cta: 'Contact Us',
      variant: 'outline',
      popular: false
    }
  ];

  return (
    <section id="packages" className="py-20 lg:py-28 text-white relative">
      {/* Decorative background element */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-ocean-900/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block bg-ocean-900/50 text-ocean-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-ocean-700/30">
              Signature Packages
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Clarity Meets Customization
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the package that aligns with your goals, or let us create a tailored solution for your unique needs
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative rounded-2xl backdrop-blur-sm border ${
                hoveredTier === index 
                  ? 'border-ocean-500 shadow-lg shadow-ocean-500/20' 
                  : pkg.popular 
                    ? 'border-ocean-700 shadow-md shadow-ocean-500/10' 
                    : 'border-white/10'
              } overflow-hidden transition-all duration-300`}
              onMouseEnter={() => setHoveredTier(index)}
              onMouseLeave={() => setHoveredTier(null)}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-ocean-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg z-10">
                  Popular
                </div>
              )}
              
              <div className={`p-8 ${
                pkg.popular 
                  ? 'bg-gradient-to-br from-[#14142b]/80 via-ocean-900/20 to-[#14142b]/80' 
                  : 'bg-[#14142b]/60'
              }`}>
                <h3 className="text-2xl font-bold text-white mb-2 font-display">{pkg.name}</h3>
                
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold text-ocean-300">{pkg.investment}</span>
                  <span className="text-gray-300 ml-1">{pkg.period}</span>
                </div>
                
                <div className="bg-ocean-900/30 px-4 py-3 rounded-lg mb-4">
                  <p className="text-sm font-medium text-ocean-200">Perfect For</p>
                  <p className="text-white">{pkg.perfectFor}</p>
                </div>
                
                <div className="bg-ocean-900/30 px-4 py-3 rounded-lg mb-6">
                  <p className="text-sm font-medium text-ocean-200">Outcomes</p>
                  <p className="text-white">{pkg.outcomes}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-ocean-300 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={pkg.variant as any} 
                  className={`w-full py-6 ${
                    pkg.popular 
                      ? 'bg-ocean-500 hover:bg-ocean-400 text-white' 
                      : 'text-ocean-300 border-ocean-700/50 hover:bg-ocean-900/30'
                  }`}
                >
                  {pkg.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-400 max-w-3xl mx-auto">
            All packages include dedicated account management and 24/7 support. 
            Minimum commitment of 3 months. Custom packages available for enterprise clients.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;

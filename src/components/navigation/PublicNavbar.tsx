
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EarlyAccessModal from '@/components/landing/EarlyAccessModal';

const PublicNavbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navbarClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
    isScrolled 
      ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm' 
      : 'bg-white/70 backdrop-blur-sm py-4'
  }`;

  return (
    <header className={navbarClasses}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          <motion.span 
            className="text-resort-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Guest<span className="text-ocean-600">Flow AI</span>
          </motion.span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <motion.button 
            onClick={() => scrollToSection('features')} 
            className="text-gray-600 hover:text-gray-900 relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ocean-500 group-hover:w-full transition-all duration-300"></span>
          </motion.button>
          
          <motion.button 
            onClick={() => scrollToSection('pricing')} 
            className="text-gray-600 hover:text-gray-900 relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ocean-500 group-hover:w-full transition-all duration-300"></span>
          </motion.button>
          
          <motion.button 
            onClick={() => scrollToSection('testimonials')} 
            className="text-gray-600 hover:text-gray-900 relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Success Stories
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ocean-500 group-hover:w-full transition-all duration-300"></span>
          </motion.button>
          
          <motion.button 
            onClick={() => scrollToSection('faq')} 
            className="text-gray-600 hover:text-gray-900 relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            FAQ
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ocean-500 group-hover:w-full transition-all duration-300"></span>
          </motion.button>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to="/auth" className="text-sm text-ocean-700 hover:text-ocean-900 font-medium hidden md:flex items-center">
            <User className="h-4 w-4 mr-1" />
            Demo Login
          </Link>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              className="bg-ocean-600 hover:bg-ocean-700 font-medium"
              onClick={() => setIsModalOpen(true)}
            >
              <Sparkles className="mr-1.5 h-4 w-4" /> Early Access
            </Button>
          </motion.div>
        </div>
        
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        )}
      </div>
      
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div 
            className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-gray-900">Features</button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-gray-900">Pricing</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 hover:text-gray-900">Success Stories</button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-600 hover:text-gray-900">FAQ</button>
              <div className="pt-2 border-t border-gray-100">
                <Button 
                  className="w-full mb-2"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsModalOpen(true);
                  }}
                >
                  <Sparkles className="mr-1.5 h-4 w-4" /> Early Access
                </Button>
                <Link to="/auth" className="w-full flex">
                  <Button variant="outline" className="w-full">
                    <User className="h-4 w-4 mr-1" />
                    Demo Login
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Early Access Modal */}
      <EarlyAccessModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </header>
  );
};

export default PublicNavbar;

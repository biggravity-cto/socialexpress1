
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, Sparkles, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoComponent from './LogoComponent';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  scrollToSection: (sectionId: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isMenuOpen, 
  setIsMenuOpen, 
  scrollToSection,
  setIsModalOpen
}) => {
  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-white z-50 flex flex-col px-6 py-4 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-8">
              <LogoComponent />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex flex-col space-y-8 flex-grow">
              {[
                {label: "Features", id: "features"},
                {label: "Pricing", id: "pricing"},
                {label: "Success Stories", id: "testimonials"},
                {label: "FAQ", id: "faq"}
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="text-xl font-medium text-gray-800 hover:text-ocean-600 py-2 text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            <div className="mt-auto pt-6 border-t border-gray-100 space-y-4 pb-10">
              <Button 
                className="w-full py-6 text-base bg-ocean-600 hover:bg-ocean-700"
                size="lg"
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                <Sparkles className="mr-2 h-5 w-5" /> Request Early Access
              </Button>
              
              <Link to="/auth" className="w-full block" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full py-6 text-base" size="lg">
                  <User className="h-5 w-5 mr-2" />
                  Demo Login
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;

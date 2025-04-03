
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, AlignJustify, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsMenuOpen(!isMenuOpen)} 
        className="md:hidden z-50 ml-2"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="h-5 w-5" /> : <AlignJustify className="h-5 w-5" />}
      </Button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-white flex flex-col pt-20 pb-8 px-6 overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-6 flex-grow">
              <MobileNavLink label="Features" sectionId="features" onClick={scrollToSection} />
              <MobileNavLink label="Pricing" sectionId="pricing" onClick={scrollToSection} />
              <MobileNavLink label="Success Stories" sectionId="testimonials" onClick={scrollToSection} />
              <MobileNavLink label="FAQ" sectionId="faq" onClick={scrollToSection} />
            </div>
            
            <div className="mt-auto pt-6 border-t border-gray-100 space-y-4">
              <Button 
                className="w-full py-6 text-base"
                size="lg"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsModalOpen(true);
                }}
              >
                <Sparkles className="mr-2 h-5 w-5" /> Request Early Access
              </Button>
              
              <Link to="/auth" className="w-full flex" onClick={() => setIsMenuOpen(false)}>
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

interface MobileNavLinkProps {
  label: string;
  sectionId: string;
  onClick: (sectionId: string) => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ label, sectionId, onClick }) => {
  return (
    <button 
      onClick={() => onClick(sectionId)} 
      className="text-xl font-medium text-gray-800 hover:text-ocean-600 py-2"
    >
      {label}
    </button>
  );
};

export default MobileMenu;

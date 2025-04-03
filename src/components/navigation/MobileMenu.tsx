
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
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden z-50 ml-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <AlignJustify className="h-5 w-5" />}
        </Button>
      </motion.div>

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
              {["Features", "Pricing", "Success Stories", "FAQ"].map((item, index) => (
                <MobileNavLink 
                  key={item}
                  label={item} 
                  sectionId={item.toLowerCase().replace(" ", "-")} 
                  onClick={scrollToSection}
                  index={index}
                />
              ))}
            </div>
            
            <motion.div 
              className="mt-auto pt-6 border-t border-gray-100 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
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
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link to="/auth" className="w-full flex" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full py-6 text-base" size="lg">
                    <User className="h-5 w-5 mr-2" />
                    Demo Login
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
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
  index: number;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ label, sectionId, onClick, index }) => {
  return (
    <motion.button 
      onClick={() => onClick(sectionId)} 
      className="text-xl font-medium text-gray-800 hover:text-ocean-600 py-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.3,
        delay: 0.1 + (index * 0.1)  // Staggered animation
      }}
      whileHover={{ 
        scale: 1.05, 
        x: 5,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
    >
      {label}
    </motion.button>
  );
};

export default MobileMenu;

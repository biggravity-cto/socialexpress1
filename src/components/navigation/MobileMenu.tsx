
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
    <div>
      {/* Mobile Menu Toggle Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsMenuOpen(!isMenuOpen)} 
        className="relative z-50"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? 
          <X className="h-5 w-5" /> : 
          <AlignJustify className="h-5 w-5" />
        }
      </Button>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-white z-40 flex flex-col pt-20 px-6 overflow-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-6 flex-grow">
              {[
                {label: "Features", id: "features"},
                {label: "Pricing", id: "pricing"},
                {label: "Success Stories", id: "testimonials"},
                {label: "FAQ", id: "faq"}
              ].map((item, index) => (
                <motion.button 
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="text-xl font-medium text-gray-800 hover:text-ocean-600 py-2 text-left"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.3,
                    delay: 0.1 + (index * 0.08)
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    x: 5,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
            
            <motion.div 
              className="mt-auto pt-6 border-t border-gray-100 space-y-4 pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
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
              >
                <Link to="/auth" className="w-full block" onClick={() => setIsMenuOpen(false)}>
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
    </div>
  );
};

export default MobileMenu;

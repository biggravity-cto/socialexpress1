
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, CalendarDays } from 'lucide-react';
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
  scrollToSection
}) => {
  if (!isMenuOpen) return null;
  
  const handleMenuItemClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };
  
  return (
    <div className="fixed inset-0 bg-space-dark z-50 flex flex-col">
      <div className="flex flex-col h-full w-full overflow-y-auto">
        <div className="flex flex-col h-full px-6 py-4">
          <div className="flex justify-between items-center mb-8">
            <LogoComponent />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex flex-col space-y-8 flex-grow">
            {[
              {label: "About", to: "/about"},
              {label: "Offerings", to: "/offerings"},
              {label: "Case Studies", to: "/case-studies"},
              {label: "Team", to: "/team"},
              {label: "Contact", to: "/contact"}
            ].map((item) => (
              <Link 
                key={item.label}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className="text-xl font-medium text-gray-300 hover:text-brand-green py-2 text-left"
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pt-6 border-t border-gray-800 space-y-4 pb-10">
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              <Button 
                className="w-full py-6 text-base bg-gradient-to-r from-brand-green to-brand-primary hover:opacity-90 text-space-dark"
                size="lg"
              >
                <CalendarDays className="mr-2 h-5 w-5" />
                Book a Strategy Call
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

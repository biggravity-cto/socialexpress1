
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import LogoComponent from './LogoComponent';
import NavigationLinks from './NavigationLinks';
import { Button } from '@/components/ui/button';
import { AlignJustify, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import MobileMenu from './MobileMenu';

const PublicNavbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navbarClasses = `w-full z-40 transition-all duration-300 ${
    isScrolled 
      ? 'bg-white shadow-md py-3' 
      : 'bg-white border-b border-gray-100 py-4'
  }`;

  return (
    <>
      <header className={navbarClasses}>
        <div className="container flex items-center justify-between">
          <div className="flex items-center">
            <LogoComponent />
            {!isMobile && <NavigationLinks scrollToSection={scrollToSection} />}
          </div>
          
          <div className="flex items-center gap-2">
            {!isMobile && (
              <Link to="/contact">
                <Button 
                  className="bg-gradient-to-r from-brand-green to-brand-secondary text-gray-900 hover:opacity-90 font-medium px-4 py-2"
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Book a Call
                </Button>
              </Link>
            )}
            
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(true)}
                aria-label="Toggle menu"
              >
                <AlignJustify className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </header>
      
      <MobileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
        setIsModalOpen={() => {}}
      />
    </>
  );
};

export default PublicNavbar;


import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import EarlyAccessModal from '@/components/landing/EarlyAccessModal';
import LogoComponent from './LogoComponent';
import NavigationLinks from './NavigationLinks';
import NavbarActions from './NavbarActions';
import MobileMenu from './MobileMenu';

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
        <div className="flex items-center">
          <LogoComponent />
          {!isMobile && <NavigationLinks scrollToSection={scrollToSection} />}
        </div>
        
        <div className="flex items-center">
          {!isMobile && <NavbarActions onEarlyAccessClick={() => setIsModalOpen(true)} />}
          
          {isMobile && (
            <div className="ml-auto">
              <MobileMenu
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                scrollToSection={scrollToSection}
                setIsModalOpen={setIsModalOpen}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Early Access Modal */}
      <EarlyAccessModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </header>
  );
};

export default PublicNavbar;

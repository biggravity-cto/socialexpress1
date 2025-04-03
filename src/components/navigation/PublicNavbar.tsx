
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import EarlyAccessModal from '@/components/landing/EarlyAccessModal';
import LogoComponent from './LogoComponent';
import NavigationLinks from './NavigationLinks';
import NavbarActions from './NavbarActions';
import MobileMenu from './MobileMenu';
import { Button } from '@/components/ui/button';
import { AlignJustify, Sparkles } from 'lucide-react';

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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navbarClasses = `fixed top-0 w-full z-40 transition-all duration-300 ${
    isScrolled 
      ? 'bg-white shadow-md py-3' 
      : 'bg-white/95 border-b border-gray-100 py-4'
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
            {isMobile && (
              <Button 
                className="bg-ocean-600 hover:bg-ocean-700 font-medium text-xs px-3 h-8"
                onClick={() => setIsModalOpen(true)}
              >
                <Sparkles className="mr-1 h-3 w-3" /> Early Access
              </Button>
            )}
            
            {!isMobile && (
              <NavbarActions onEarlyAccessClick={() => setIsModalOpen(true)} />
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
        setIsModalOpen={setIsModalOpen}
      />
      
      <EarlyAccessModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default PublicNavbar;

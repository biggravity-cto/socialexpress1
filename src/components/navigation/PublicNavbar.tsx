
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
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navbarClasses = `fixed top-0 w-full z-40 transition-all duration-300 ${
    isScrolled 
      ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm' 
      : 'bg-white/70 backdrop-blur-sm py-4'
  }`;

  // Function to handle menu button click
  const handleMenuToggle = () => {
    console.log("Toggle menu clicked, current state:", isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  return (
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
              onClick={handleMenuToggle}
              aria-label="Toggle menu"
            >
              <AlignJustify className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile Menu - rendered conditionally in its own component */}
      <MobileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
        setIsModalOpen={setIsModalOpen}
      />
      
      {/* Early Access Modal */}
      <EarlyAccessModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </header>
  );
};

export default PublicNavbar;

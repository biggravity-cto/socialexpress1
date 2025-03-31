
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X } from 'lucide-react';

const PublicNavbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm py-3">
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          BG Social Express
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-gray-900">Solutions</button>
          <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-gray-900">Pricing</button>
          <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 hover:text-gray-900">Success Stories</button>
          <button onClick={() => scrollToSection('faq')} className="text-gray-600 hover:text-gray-900">FAQ</button>
        </div>
        <div className="flex items-center">
          <Link to="/auth">
            <Button>Get Started</Button>
          </Link>
        </div>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        )}
      </div>
      {isMenuOpen && isMobile && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 md:hidden">
          <div className="flex flex-col space-y-4">
            <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-gray-900">Solutions</button>
            <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-gray-900">Pricing</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 hover:text-gray-900">Success Stories</button>
            <button onClick={() => scrollToSection('faq')} className="text-gray-600 hover:text-gray-900">FAQ</button>
            <div className="pt-2 border-t border-gray-100">
              <Link to="/auth" className="w-full">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;

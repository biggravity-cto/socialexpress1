
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X, User } from 'lucide-react';

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
          <span className="text-resort-800">Guest<span className="text-ocean-600">Flow AI</span></span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-gray-900">Solutions</button>
          <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-gray-900">Pricing</button>
          <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 hover:text-gray-900">Success Stories</button>
          <button onClick={() => scrollToSection('faq')} className="text-gray-600 hover:text-gray-900">FAQ</button>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/auth" className="text-sm text-ocean-700 hover:text-ocean-900 font-medium hidden md:flex items-center">
            <User className="h-4 w-4 mr-1" />
            Demo Login
          </Link>
          <Link to="/auth">
            <Button className="bg-ocean-600 hover:bg-ocean-700 font-medium">Get Started</Button>
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
                <Button className="w-full mb-2">Get Started</Button>
              </Link>
              <Link to="/auth" className="w-full flex">
                <Button variant="outline" className="w-full">
                  <User className="h-4 w-4 mr-1" />
                  Demo Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;


import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import GlassPanel from '../ui/GlassPanel';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3 bg-white/80 backdrop-blur-lg shadow-sm' : 'py-5 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center"
          >
            <span className="font-bold text-xl tracking-tight text-resort-800">Resort<span className="text-ocean-600">Flux</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm text-resort-700 hover:text-resort-900 transition-colors">Home</Link>
            <Link to="/features" className="text-sm text-resort-700 hover:text-resort-900 transition-colors">Features</Link>
            <Link to="/pricing" className="text-sm text-resort-700 hover:text-resort-900 transition-colors">Pricing</Link>
            
            <div className="relative group">
              <button className="flex items-center text-sm text-resort-700 hover:text-resort-900 transition-colors">
                Resources
                <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                <GlassPanel className="p-3">
                  <div className="py-1 space-y-1">
                    <Link to="/blog" className="block px-3 py-2 text-sm text-resort-700 hover:bg-resort-50 rounded-md">Blog</Link>
                    <Link to="/guides" className="block px-3 py-2 text-sm text-resort-700 hover:bg-resort-50 rounded-md">Guides</Link>
                    <Link to="/case-studies" className="block px-3 py-2 text-sm text-resort-700 hover:bg-resort-50 rounded-md">Case Studies</Link>
                  </div>
                </GlassPanel>
              </div>
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50">
                Log in
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button className="bg-ocean-600 hover:bg-ocean-700 text-white border-none">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-resort-800"
            onClick={handleMobileMenuToggle}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 px-4 md:hidden animate-fade-in">
          <nav className="flex flex-col space-y-5 py-8">
            <Link to="/" className="text-lg font-medium text-resort-800 hover:text-resort-900 py-2">Home</Link>
            <Link to="/features" className="text-lg font-medium text-resort-800 hover:text-resort-900 py-2">Features</Link>
            <Link to="/pricing" className="text-lg font-medium text-resort-800 hover:text-resort-900 py-2">Pricing</Link>
            
            <div className="border-b border-gray-100 my-4"></div>
            
            <Link to="/blog" className="text-lg font-medium text-resort-800 hover:text-resort-900 py-2">Blog</Link>
            <Link to="/guides" className="text-lg font-medium text-resort-800 hover:text-resort-900 py-2">Guides</Link>
            <Link to="/case-studies" className="text-lg font-medium text-resort-800 hover:text-resort-900 py-2">Case Studies</Link>
            
            <div className="border-b border-gray-100 my-4"></div>
            
            <div className="flex flex-col space-y-4 pt-4">
              <Link to="/login">
                <Button variant="outline" className="w-full justify-center">
                  Log in
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button className="w-full bg-ocean-600 hover:bg-ocean-700 text-white justify-center">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;

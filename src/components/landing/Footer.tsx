import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = [
  {
    title: "Explore",
    links: [
      { name: "About", url: "/about" },
      { name: "Offerings", url: "/offerings" },
      { name: "Case Studies", url: "/case-studies" },
      { name: "Team", url: "/team" },
      { name: "Blog", url: "/blog" }
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "Guides", url: "/guides" },
      { name: "Help Center", url: "#" },
      { name: "Contact", url: "#" },
      { name: "Privacy Policy", url: "#" },
      { name: "Terms of Service", url: "#" }
    ]
  },
  {
    title: "Connect",
    links: [
      { name: "Facebook", url: "#" },
      { name: "Twitter", url: "#" },
      { name: "Instagram", url: "#" },
      { name: "LinkedIn", url: "#" },
    ]
  }
];

const Footer: React.FC = () => {
  // Function to handle smooth scrolling for anchor links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only apply to anchor links
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a14] pt-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <span className="font-display font-bold text-2xl tracking-tight text-white">Big Gravity</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Global digital marketing excellence for luxury hospitality brands. Transforming guest experiences through data-driven strategies and cultural expertise.
            </p>
            
            <div className="flex space-x-4 mb-6">
              <a href="#" className="bg-gray-900 p-2 rounded-full text-gray-500 hover:bg-gray-700 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-gray-900 p-2 rounded-full text-gray-500 hover:bg-gray-700 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-gray-900 p-2 rounded-full text-gray-500 hover:bg-gray-700 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-gray-900 p-2 rounded-full text-gray-500 hover:bg-gray-700 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-brand-primary mt-0.5 mr-3" />
                <span className="text-gray-400">contact@biggravity.agency</span>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-brand-primary mt-0.5 mr-3" />
                <span className="text-gray-400">+1 (800) 123-4567</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-brand-primary mt-0.5 mr-3" />
                <span className="text-gray-400">Phoenix, AZ</span>
              </div>
            </div>
          </div>
          
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold text-white mb-6">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.url} 
                      onClick={(e) => handleAnchorClick(e, link.url)}
                      className="text-gray-400 hover:text-brand-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 py-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Big Gravity. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

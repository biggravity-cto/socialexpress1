
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", url: "#features" },
      { name: "Pricing", url: "#pricing" },
      { name: "Integrations", url: "#" },
      { name: "Updates", url: "#" },
      { name: "API", url: "#" }
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", url: "/blog" },
      { name: "Guides", url: "/guides" },
      { name: "Case Studies", url: "/case-studies" },
      { name: "Help Center", url: "#" },
      { name: "Community", url: "#" }
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About", url: "#" },
      { name: "Customers", url: "#testimonials" },
      { name: "Careers", url: "#" },
      { name: "Contact", url: "#" },
      { name: "Legal", url: "#" }
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
    <footer className="bg-white pt-16 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <span className="font-bold text-2xl tracking-tight text-resort-800">Guest<span className="text-ocean-600">Flow</span></span>
            </Link>
            <p className="text-resort-600 mb-6 max-w-md">
              The AI-powered hospitality marketing platform that helps hotels and resorts delight guests, drive revenue, and streamline operations.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="bg-gray-100 p-2 rounded-full text-resort-700 hover:bg-ocean-100 hover:text-ocean-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-gray-100 p-2 rounded-full text-resort-700 hover:bg-ocean-100 hover:text-ocean-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-gray-100 p-2 rounded-full text-resort-700 hover:bg-ocean-100 hover:text-ocean-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-gray-100 p-2 rounded-full text-resort-700 hover:bg-ocean-100 hover:text-ocean-600 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-ocean-500 mt-0.5 mr-3" />
                <span className="text-resort-600">contact@guestflow.com</span>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-ocean-500 mt-0.5 mr-3" />
                <span className="text-resort-600">+1 (800) 123-4567</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-ocean-500 mt-0.5 mr-3" />
                <span className="text-resort-600">Phoenix, AZ</span>
              </div>
            </div>
          </div>
          
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold text-resort-800 mb-6">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.url} 
                      onClick={(e) => handleAnchorClick(e, link.url)}
                      className="text-resort-600 hover:text-ocean-600 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-100 py-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-resort-500 text-sm mb-4 md:mb-0">
            © {currentYear} GuestFlow. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-resort-500 hover:text-resort-900 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-resort-500 hover:text-resort-900 transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-resort-500 hover:text-resort-900 transition-colors text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

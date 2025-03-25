
import React from 'react';
import { Link } from 'react-router-dom';

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Integrations", "Roadmap", "Updates"]
  },
  {
    title: "Resources",
    links: ["Blog", "Guides", "Case Studies", "API Docs", "Help Center"]
  },
  {
    title: "Company",
    links: ["About", "Customers", "Careers", "Contact", "Legal"]
  }
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="font-bold text-xl tracking-tight text-resort-800">BG Social<span className="text-ocean-600">Express</span></span>
            </Link>
            <p className="text-resort-600 mb-4">
              AI-powered social media management built specifically for hospitality resorts.
            </p>
          </div>
          
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="font-medium text-resort-800 mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-resort-600 hover:text-resort-900 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-resort-500 text-sm">
            © {new Date().getFullYear()} BG Social Express. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-resort-500 hover:text-resort-900 transition-colors">
              Twitter
            </Link>
            <Link to="#" className="text-resort-500 hover:text-resort-900 transition-colors">
              LinkedIn
            </Link>
            <Link to="#" className="text-resort-500 hover:text-resort-900 transition-colors">
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

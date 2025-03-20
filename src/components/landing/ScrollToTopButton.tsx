
import React from 'react';

interface ScrollToTopButtonProps {
  isVisible: boolean;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <button 
      className="fixed bottom-6 right-6 p-3 bg-ocean-600 text-white rounded-full shadow-md hover:bg-ocean-700 transition-all duration-300 z-50 animate-fade-in"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  );
};

export default ScrollToTopButton;

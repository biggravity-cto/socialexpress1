
import React from 'react';

export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-2',
    lg: 'h-16 w-16 border-3',
  };
  
  return (
    <div className={`animate-spin rounded-full ${sizeClasses[size]} border-t-ocean-600 border-b-ocean-600 border-r-transparent border-l-transparent`}></div>
  );
};


import { cn } from '@/lib/utils';
import React from 'react';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
  className?: string;
}

const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  variant = 'light',
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-xl transition-all duration-300',
        variant === 'light' 
          ? 'glass shadow-sm' 
          : 'glass-dark shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassPanel;

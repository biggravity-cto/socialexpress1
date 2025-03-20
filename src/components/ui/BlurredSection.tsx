
import { cn } from '@/lib/utils';
import React from 'react';

interface BlurredSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: 'light' | 'medium' | 'strong';
  color?: string;
  className?: string;
}

const BlurredSection: React.FC<BlurredSectionProps> = ({
  children,
  intensity = 'medium',
  color = 'bg-white/50',
  className,
  ...props
}) => {
  const blurIntensity = {
    light: 'backdrop-blur-sm',
    medium: 'backdrop-blur-md',
    strong: 'backdrop-blur-lg',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        blurIntensity[intensity],
        color,
        'border border-gray-100/20 rounded-xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default BlurredSection;

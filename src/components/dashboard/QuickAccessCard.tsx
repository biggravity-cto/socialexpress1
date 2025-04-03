
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AnimatedCard from '@/components/ui/AnimatedCard';

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  delay: number;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  title,
  description,
  icon,
  path,
  color,
  delay
}) => {
  return (
    <AnimatedCard
      className={`hover:shadow transition-all duration-300 bg-gradient-to-br ${color} border-none`}
      delay={delay}
    >
      <div className="flex flex-col h-full">
        <div className="p-3 rounded-xl bg-white inline-block mb-4 shadow-sm">
          {icon}
        </div>
        <h3 className="text-lg font-medium text-resort-800 mb-2">{title}</h3>
        <p className="text-resort-600 text-sm mb-4">{description}</p>
        <div className="mt-auto">
          <Link to={path}>
            <Button variant="ghost" className="text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50 p-0">
              Go to {title} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default QuickAccessCard;

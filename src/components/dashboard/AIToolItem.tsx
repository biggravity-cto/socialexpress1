
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface AIToolItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
  bgColor: string;
  iconColor: string;
}

const AIToolItem: React.FC<AIToolItemProps> = ({
  icon,
  title,
  description,
  path,
  bgColor,
  iconColor
}) => {
  return (
    <Link to={path} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex items-center">
        <div className={`p-2 rounded-full ${bgColor} mr-3`}>
          {React.cloneElement(icon as React.ReactElement, { className: `h-5 w-5 ${iconColor}` })}
        </div>
        <div>
          <p className="text-sm font-medium text-resort-800">{title}</p>
          <p className="text-xs text-resort-500">{description}</p>
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-resort-400" />
    </Link>
  );
};

export default AIToolItem;

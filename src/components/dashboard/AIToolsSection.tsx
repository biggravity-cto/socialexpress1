
import React from 'react';
import { Card } from '@/components/ui/card';
import {
  BrainCircuit,
  LineChart,
  Image,
  Video,
  FileText,
  Sparkles
} from 'lucide-react';
import AIToolItem from './AIToolItem';

const AIToolsSection: React.FC = () => {
  const tools = [
    {
      title: "Campaigns",
      description: "Create data-driven marketing campaigns",
      icon: <BrainCircuit />,
      path: "/campaigns",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      title: "Brand Intelligence",
      description: "Monitor trends and track your brand performance",
      icon: <LineChart />,
      path: "/brand-intelligence",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      title: "Image Generator",
      description: "Create AI-powered images for your content",
      icon: <Image />,
      path: "/content",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      title: "Video Generator",
      description: "Create engaging AI-powered videos",
      icon: <Video />,
      path: "/content",
      bgColor: "bg-red-50",
      iconColor: "text-red-600"
    },
    {
      title: "Text Generator",
      description: "Create compelling copy for posts",
      icon: <FileText />,
      path: "/content",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600"
    },
    {
      title: "Smart Suggestions",
      description: "Get AI recommendations based on analytics",
      icon: <Sparkles />,
      path: "/settings",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600"
    }
  ];

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm h-full shadow-sm border-ocean-100">
      <h3 className="text-lg font-medium text-resort-800 mb-4">AI Tools</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tools.map((tool, index) => (
          <AIToolItem
            key={index}
            icon={tool.icon}
            title={tool.title}
            description={tool.description}
            path={tool.path}
            bgColor={tool.bgColor}
            iconColor={tool.iconColor}
          />
        ))}
      </div>
    </Card>
  );
};

export default AIToolsSection;

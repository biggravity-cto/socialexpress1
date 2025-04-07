
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';

export const getTrendBadge = (trend: string) => {
  switch (trend) {
    case 'increase':
      return <Badge variant="outline" className="bg-[#ffd6d6]/20 text-[#ff8c8c] border-[#ffd6d6]/50 flex items-center gap-1">
        <ArrowUp className="h-3 w-3" /> Increasing
      </Badge>;
    case 'decrease':
      return <Badge variant="outline" className="bg-[#a3f7bf]/20 text-[#228b22] border-[#a3f7bf]/50 flex items-center gap-1">
        <ArrowDown className="h-3 w-3" /> Decreasing
      </Badge>;
    case 'stable':
      return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1">
        <Minus className="h-3 w-3" /> Stable
      </Badge>;
    case 'new':
      return <Badge variant="outline" className="bg-[#6ad4e0]/20 text-[#1d9cc8] border-[#6ad4e0]/50">
        New Issue
      </Badge>;
    default:
      return null;
  }
};

export const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge variant="outline" className="bg-[#ffd6d6]/20 text-[#ff8c8c] border-[#ffd6d6]/50">High</Badge>;
    case 'medium':
      return <Badge variant="outline" className="bg-[#fff3cd]/20 text-amber-700 border-[#fff3cd]/50">Medium</Badge>;
    case 'low':
      return <Badge variant="outline" className="bg-[#a3f7bf]/20 text-[#228b22] border-[#a3f7bf]/50">Low</Badge>;
    default:
      return null;
  }
};

// Custom tooltip component for the chart
export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="font-medium">{label}</p>
        <div className="flex flex-col gap-1 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#6ad4e0]"></div>
            <p className="text-sm">Q1 2025: {payload[0].value}%</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#91e6c8]"></div>
            <p className="text-sm">Q4 2024: {payload[1].value}%</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

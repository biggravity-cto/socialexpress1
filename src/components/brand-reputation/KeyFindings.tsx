
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Star, 
  MapPin, 
  Building2, 
  Droplets,
  Clock
} from 'lucide-react';

const strengths = [
  {
    id: 1,
    title: 'Family & Kid-Friendly',
    description: 'Consistently praised for pools, water slides, Little Birds Club, chocolate hour, and overall suitability for families with children.',
    icon: <Star className="h-5 w-5 text-amber-500" />,
    iconBg: 'bg-amber-100'
  },
  {
    id: 2,
    title: 'Pool Villas',
    description: 'Highly regarded option, often recommended.',
    icon: <Building2 className="h-5 w-5 text-blue-500" />,
    iconBg: 'bg-blue-100'
  },
  {
    id: 3,
    title: 'Airport Proximity',
    description: 'Convenient location near Cam Ranh airport is a frequently mentioned advantage.',
    icon: <MapPin className="h-5 w-5 text-green-500" />,
    iconBg: 'bg-green-100'
  },
  {
    id: 4,
    title: 'Atmosphere',
    description: 'Quiet, secluded, and private environment appreciated by some guests.',
    icon: <Star className="h-5 w-5 text-purple-500" />,
    iconBg: 'bg-purple-100'
  }
];

const weaknesses = [
  {
    id: 1,
    title: 'Location (Distance from City)',
    description: 'The most common concern remains the distance from Nha Trang city center, impacting guests wanting easy access to city attractions.',
    quote: '"시내와는 거리가 있어 조용하고 한적한 분위기를 원하는 여행객에게 추천합니다."',
    translation: 'Recommended for travelers who want a quiet and secluded atmosphere due to its distance from the city.',
    icon: <MapPin className="h-5 w-5 text-red-500" />,
    iconBg: 'bg-red-100'
  },
  {
    id: 2,
    title: 'Dining Experience',
    description: 'Feedback points to potential improvements in breakfast quality and variety, especially compared to other resorts.',
    quote: '"개인적으로 깜란 모벤픽 리조트의 조식보다 훨씬 더 좋았어요."',
    translation: "Personally, it [another resort's breakfast] was much better than the breakfast at Cam Ranh Movenpick Resort.",
    icon: <Star className="h-5 w-5 text-orange-500" />,
    iconBg: 'bg-orange-100'
  },
  {
    id: 3,
    title: 'Room Water Quality',
    description: 'Several guests specifically mentioned the need for shower filters, indicating potential water quality issues.',
    quote: '"모벤픽은 샤워기를 켜는순간 필터가 갈색으로 변해가는게 실시간으로 눈에 보이더라고요."',
    translation: 'At Movenpick, you could see the filter turning brown in real-time the moment you turned on the shower.',
    icon: <Droplets className="h-5 w-5 text-blue-500" />,
    iconBg: 'bg-blue-100'
  },
  {
    id: 4,
    title: 'Service Speed',
    description: 'Occasional mentions of slow buggy service.',
    quote: '',
    translation: '',
    icon: <Clock className="h-5 w-5 text-slate-500" />,
    iconBg: 'bg-slate-100'
  }
];

const KeyFindings = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <ThumbsUp className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-medium text-resort-800">Key Strengths</h3>
        </div>
        
        <div className="space-y-6">
          {strengths.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className={`${item.iconBg} p-3 rounded-full h-fit`}>
                {item.icon}
              </div>
              <div>
                <h4 className="font-medium text-resort-800 mb-1">{item.title}</h4>
                <p className="text-sm text-resort-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <ThumbsDown className="h-5 w-5 text-red-600" />
          <h3 className="text-lg font-medium text-resort-800">Areas for Improvement</h3>
        </div>
        
        <div className="space-y-6">
          {weaknesses.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className={`${item.iconBg} p-3 rounded-full h-fit`}>
                {item.icon}
              </div>
              <div>
                <h4 className="font-medium text-resort-800 mb-1">{item.title}</h4>
                <p className="text-sm text-resort-600">{item.description}</p>
                
                {item.quote && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-md border-l-4 border-gray-300">
                    <p className="text-sm italic text-gray-700">{item.quote}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.translation}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default KeyFindings;


import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Star, 
  MapPin, 
  Building2, 
  Droplets,
  Clock,
  ShieldCheck,
  CloudSun
} from 'lucide-react';

const strengths = [
  {
    id: 1,
    title: 'Family & Kid-Friendly',
    description: 'Consistently praised for pools, water slides, Little Birds Club, chocolate hour, and overall suitability for families with children.',
    icon: <ShieldCheck className="h-5 w-5 text-amber-500" />,
    iconBg: 'bg-amber-100',
    highlight: 'Most mentioned strength',
    recommendations: [
      'Continue to promote family-friendly amenities',
      "Highlight children's activities in marketing materials"
    ]
  },
  {
    id: 2,
    title: 'Pool Villas',
    description: 'Highly regarded option, often recommended.',
    icon: <Building2 className="h-5 w-5 text-blue-500" />,
    iconBg: 'bg-blue-100',
    highlight: 'Premium option',
    recommendations: [
      'Consider expanding the pool villa offering',
      'Highlight in marketing to Korean tourists'
    ]
  },
  {
    id: 3,
    title: 'Airport Proximity',
    description: 'Convenient location near Cam Ranh airport is a frequently mentioned advantage.',
    icon: <MapPin className="h-5 w-5 text-green-500" />,
    iconBg: 'bg-green-100',
    recommendations: [
      'Continue to emphasize convenient transfer times',
      'Partner with airport transfer services'
    ]
  },
  {
    id: 4,
    title: 'Atmosphere',
    description: 'Quiet, secluded, and private environment appreciated by some guests.',
    icon: <CloudSun className="h-5 w-5 text-purple-500" />,
    iconBg: 'bg-purple-100',
    recommendations: [
      'Market the resort as a retreat from busy city life',
      'Create more spaces for relaxation and privacy'
    ]
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
    iconBg: 'bg-red-100',
    impact: 'High - 10% of guests',
    recommendations: [
      'Enhance shuttle services to Nha Trang city',
      'Expand on-site activity programming',
      'Strengthen partnerships with local tour operators'
    ]
  },
  {
    id: 2,
    title: 'Dining Experience',
    description: 'Feedback points to potential improvements in breakfast quality and variety, especially compared to other resorts.',
    quote: '"개인적으로 깜란 모벤픽 리조트의 조식보다 훨씬 더 좋았어요."',
    translation: "Personally, it [another resort's breakfast] was much better than the breakfast at Cam Ranh Movenpick Resort.",
    icon: <Star className="h-5 w-5 text-orange-500" />,
    iconBg: 'bg-orange-100',
    impact: 'Medium - 5% of guests',
    recommendations: [
      'Review and enhance breakfast offerings',
      'Add more Korean-friendly options',
      'Implement quality control for food preparation'
    ]
  },
  {
    id: 3,
    title: 'Room Water Quality',
    description: 'Several guests specifically mentioned the need for shower filters, indicating potential water quality issues.',
    quote: '"모벤픽은 샤워기를 켜는순간 필터가 갈색으로 변해가는게 실시간으로 눈에 보이더라고요."',
    translation: 'At Movenpick, you could see the filter turning brown in real-time the moment you turned on the shower.',
    icon: <Droplets className="h-5 w-5 text-blue-500" />,
    iconBg: 'bg-blue-100',
    impact: 'Medium - 3% of guests',
    recommendations: [
      'Investigate and address water quality concerns',
      'Provide complimentary shower filters',
      'Communicate proactively about water system'
    ]
  },
  {
    id: 4,
    title: 'Service Speed',
    description: 'Occasional mentions of slow buggy service.',
    quote: '',
    translation: '',
    icon: <Clock className="h-5 w-5 text-slate-500" />,
    iconBg: 'bg-slate-100',
    impact: 'Low - <1% of guests',
    recommendations: [
      'Review buggy service efficiency during peak times',
      'Optimize scheduling for high-demand periods'
    ]
  }
];

const KeyFindings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ThumbsUp className="h-5 w-5 text-green-600" />
            Key Strengths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strengths.map((item) => (
              <Card key={item.id} className="border border-green-100 bg-green-50/30 overflow-hidden">
                <div className="flex">
                  <div className={`${item.iconBg} p-4 flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <div className="p-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-resort-800">{item.title}</h4>
                      {item.highlight && (
                        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                          {item.highlight}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-resort-600 mt-1">{item.description}</p>
                    
                    {item.recommendations && (
                      <div className="mt-3 pt-3 border-t border-green-100">
                        <h5 className="text-xs font-medium text-green-700 mb-1">Recommendations</h5>
                        <ul className="text-xs text-resort-600 list-disc pl-4 space-y-0.5">
                          {item.recommendations.map((rec, idx) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ThumbsDown className="h-5 w-5 text-red-600" />
            Areas for Improvement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weaknesses.map((item) => (
              <Card key={item.id} className="border border-red-100 bg-red-50/30 overflow-hidden">
                <div className="flex">
                  <div className={`${item.iconBg} p-4 flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <div className="p-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-resort-800">{item.title}</h4>
                      {item.impact && (
                        <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                          {item.impact}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-resort-600 mt-1">{item.description}</p>
                    
                    {item.quote && (
                      <div className="mt-2 p-3 bg-white rounded-md border-l-4 border-gray-300">
                        <p className="text-sm italic text-gray-700">{item.quote}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.translation}</p>
                      </div>
                    )}
                    
                    {item.recommendations && (
                      <div className="mt-3 pt-3 border-t border-red-100">
                        <h5 className="text-xs font-medium text-red-700 mb-1">Recommendations</h5>
                        <ul className="text-xs text-resort-600 list-disc pl-4 space-y-0.5">
                          {item.recommendations.map((rec, idx) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyFindings;

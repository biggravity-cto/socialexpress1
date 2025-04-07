
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
    description: 'Extensive facilities and activities (pools, slides, Little Birds Club, chocolate hour) make it a top choice for families.',
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
    description: 'Consistently mentioned as a desirable and high-quality accommodation option.',
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
    description: 'Major convenience factor for arrivals and departures to Cam Ranh airport.',
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
    description: 'Often described as quiet and suitable for relaxation, appealing to those seeking seclusion.',
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
    description: 'Remains the primary drawback for guests wishing to explore Nha Trang city frequently.',
    quote: '"시내와는 거리가 있어 조용하고 한적한 분위기를 원하는 여행객에게 추천합니다."',
    translation: 'Recommended for travelers who want a quiet and secluded atmosphere due to its distance from the city.',
    icon: <MapPin className="h-5 w-5 text-red-500" />,
    iconBg: 'bg-red-100',
    impact: 'High - ~6% of guests',
    recommendations: [
      'Enhance shuttle services to Nha Trang city',
      'Develop more robust on-site entertainment options',
      'Strengthen partnerships with local tour operators'
    ]
  },
  {
    id: 2,
    title: 'Dining Experience',
    description: 'Feedback indicates breakfast quality and variety could be improved, with unfavorable comparisons to other hotels mentioned.',
    quote: '"개인적으로 깜란 모벤픽 리조트의 조식보다 훨씬 더 좋았어요."',
    translation: "Personally, it [another resort's breakfast] was much better than the breakfast at Cam Ranh Movenpick Resort.",
    icon: <Star className="h-5 w-5 text-orange-500" />,
    iconBg: 'bg-orange-100',
    impact: 'Medium - ~4% of guests',
    recommendations: [
      'Conduct review of breakfast offerings',
      'Add more Korean-friendly options',
      'Implement quality control for food preparation'
    ]
  },
  {
    id: 3,
    title: 'Room Water Quality',
    description: 'Multiple guests reported needing shower filters, suggesting water quality needs assessment.',
    quote: '"모벤픽은 샤워기를 켜는순간 필터가 갈색으로 변해가는게 실시간으로 눈에 보이더라고요."',
    translation: 'At Movenpick, you could see the filter turning brown in real-time the moment you turned on the shower.',
    icon: <Droplets className="h-5 w-5 text-blue-500" />,
    iconBg: 'bg-blue-100',
    impact: 'Medium - ~3% of guests',
    recommendations: [
      'Investigate and address water quality concerns',
      'Provide complimentary shower filters',
      'Communicate proactively about water system improvements'
    ]
  },
  {
    id: 4,
    title: 'Service Speed',
    description: 'Some guests experienced delays with the internal resort transportation.',
    quote: '',
    translation: '',
    icon: <Clock className="h-5 w-5 text-slate-500" />,
    iconBg: 'bg-slate-100',
    impact: 'Low - <1% of guests',
    recommendations: [
      'Optimize buggy dispatching during peak times',
      'Review scheduling for high-demand periods'
    ]
  }
];

const KeyFindings = () => {
  return (
    <div className="space-y-6">
      <Card className="border-[#6ad4e0]/30">
        <CardHeader className="bg-gradient-to-r from-[#a3f7bf]/10 to-[#6ad4e0]/10">
          <CardTitle className="flex items-center gap-2 text-[#333]">
            <ThumbsUp className="h-5 w-5 text-[#6ad4e0]" />
            Key Strengths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strengths.map((item) => (
              <Card key={item.id} className="border border-[#a3f7bf]/30 bg-[#f7fcfd] overflow-hidden shadow-sm">
                <div className="flex">
                  <div className={`bg-[#6ad4e0]/10 p-4 flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <div className="p-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-[#333]">{item.title}</h4>
                      {item.highlight && (
                        <Badge variant="outline" className="bg-[#a3f7bf]/20 text-[#228b22] border-[#a3f7bf]/50">
                          {item.highlight}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-[#555] mt-1">{item.description}</p>
                    
                    {item.recommendations && (
                      <div className="mt-3 pt-3 border-t border-[#a3f7bf]/20">
                        <h5 className="text-xs font-medium text-[#228b22] mb-1">Recommendations</h5>
                        <ul className="text-xs text-[#555] list-disc pl-4 space-y-0.5">
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

      <Card className="border-[#6ad4e0]/30">
        <CardHeader className="bg-gradient-to-r from-[#ffd6d6]/10 to-[#ffe9e9]/10">
          <CardTitle className="flex items-center gap-2 text-[#333]">
            <ThumbsDown className="h-5 w-5 text-red-400" />
            Areas for Improvement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weaknesses.map((item) => (
              <Card key={item.id} className="border border-red-100 bg-red-50/30 overflow-hidden shadow-sm">
                <div className="flex">
                  <div className={`${item.iconBg} p-4 flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <div className="p-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-[#333]">{item.title}</h4>
                      {item.impact && (
                        <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                          {item.impact}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-[#555] mt-1">{item.description}</p>
                    
                    {item.quote && (
                      <div className="mt-2 p-3 bg-white rounded-md border-l-4 border-[#6ad4e0]">
                        <p className="text-sm italic text-gray-700">{item.quote}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.translation}</p>
                      </div>
                    )}
                    
                    {item.recommendations && (
                      <div className="mt-3 pt-3 border-t border-red-100">
                        <h5 className="text-xs font-medium text-red-700 mb-1">Recommendations</h5>
                        <ul className="text-xs text-[#555] list-disc pl-4 space-y-0.5">
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

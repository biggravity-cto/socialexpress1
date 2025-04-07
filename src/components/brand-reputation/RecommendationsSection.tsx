
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  UtensilsCrossed, 
  Wrench, 
  Clock 
} from 'lucide-react';

const recommendations = [
  {
    id: 1,
    title: 'Location Impact Mitigation',
    priority: 'High',
    priorityColor: 'bg-red-100 text-red-800',
    icon: <MapPin className="h-5 w-5 text-red-500" />,
    iconBg: 'bg-red-100',
    impact: 'Affects ~10% of guests',
    actions: [
      'Continue enhancing shuttle services to Nha Trang city (frequency, reliability)',
      'Expand diverse on-site activity programming to reduce the need for off-site travel',
      'Strengthen partnerships with local tour operators for convenient excursions'
    ]
  },
  {
    id: 2,
    title: 'Dining Experience Enhancement',
    priority: 'Medium',
    priorityColor: 'bg-orange-100 text-orange-800',
    icon: <UtensilsCrossed className="h-5 w-5 text-orange-500" />,
    iconBg: 'bg-orange-100',
    impact: 'Affects ~5% of guests',
    actions: [
      'Review and enhance breakfast offerings, focusing on quality and potentially adding more Korean-friendly options',
      'Consider introducing rotating or seasonal menu items for variety',
      'Reinforce quality control for food preparation and presentation'
    ]
  },
  {
    id: 3,
    title: 'Facility & Room Maintenance Optimization',
    priority: 'Medium',
    priorityColor: 'bg-amber-100 text-amber-800',
    icon: <Wrench className="h-5 w-5 text-amber-500" />,
    iconBg: 'bg-amber-100',
    impact: 'Affects ~3% of guests',
    actions: [
      'Investigate and address room water quality concerns. Communicate proactively if filters are recommended or provide complimentary filters',
      'Implement regular preventive maintenance for climate control (AC) and other room facilities (e.g., Smart TVs)',
      'Enhance room inspection protocols before guest arrival'
    ]
  },
  {
    id: 4,
    title: 'Operational Efficiency',
    priority: 'Low',
    priorityColor: 'bg-blue-100 text-blue-800',
    icon: <Clock className="h-5 w-5 text-blue-500" />,
    iconBg: 'bg-blue-100',
    impact: 'Affects <1% of guests',
    actions: [
      'Review buggy service efficiency during peak times to minimize wait times',
      'Monitor and ensure consistent operation of facilities like pool slides'
    ]
  }
];

const RecommendationsSection = () => {
  return (
    <div className="space-y-6">
      {recommendations.map((rec) => (
        <Card key={rec.id} className="p-6">
          <div className="flex gap-4">
            <div className={`${rec.iconBg} p-3 rounded-full h-fit`}>
              {rec.icon}
            </div>
            
            <div className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                <h3 className="text-lg font-medium text-resort-800">{rec.title}</h3>
                <div className="flex items-center gap-2">
                  <Badge className={rec.priorityColor}>
                    {rec.priority} Priority
                  </Badge>
                  <span className="text-xs text-resort-600">{rec.impact}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-xs text-resort-500 mb-1">
                  <span>Impact Level</span>
                  <span className="font-medium">
                    {rec.id === 1 ? '10%' : rec.id === 2 ? '5%' : rec.id === 3 ? '3%' : '1%'}
                  </span>
                </div>
                <Progress 
                  value={rec.id === 1 ? 10 : rec.id === 2 ? 5 : rec.id === 3 ? 3 : 1} 
                  max={10} 
                  className="h-2" 
                  style={{ 
                    backgroundColor: '#f1f5f9',
                    '--tw-progress-color': 
                      rec.id === 1 ? '#ef4444' : 
                      rec.id === 2 ? '#f97316' : 
                      rec.id === 3 ? '#f59e0b' : 
                      '#3b82f6'
                  } as React.CSSProperties}
                />
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-resort-700 text-sm">Recommended Actions:</h4>
                <ul className="space-y-2 list-disc list-inside">
                  {rec.actions.map((action, index) => (
                    <li key={index} className="text-sm text-resort-600">
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default RecommendationsSection;

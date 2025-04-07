
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, AlertTriangle, Lightbulb, ArrowUpRight, ChevronRight } from 'lucide-react';

const recommendations = [
  {
    id: 1,
    title: 'Location Impact Mitigation',
    priority: 'high',
    consistent: true,
    impact: '~10% of guests',
    description: 'Address the distance from Nha Trang city center, which continues to be the top concern for guests.',
    actions: [
      'Continue enhancing shuttle services to Nha Trang city (frequency, reliability).',
      'Expand diverse on-site activity programming to reduce the need for off-site travel.',
      'Strengthen partnerships with local tour operators for convenient excursions.'
    ],
    expectedOutcome: 'Reduced negative feedback regarding location, increased guest satisfaction with overall stay experience.'
  },
  {
    id: 2,
    title: 'Dining Experience Enhancement',
    priority: 'medium',
    consistent: true,
    additionalDetail: true,
    impact: '~5% of guests',
    description: 'Improve breakfast quality and variety, addressing specific comparisons to competitor offerings.',
    actions: [
      'Review and enhance breakfast offerings, focusing on quality and potentially adding more Korean-friendly options.',
      'Consider introducing rotating or seasonal menu items for variety.',
      'Reinforce quality control for food preparation and presentation.'
    ],
    expectedOutcome: 'Improved dining satisfaction scores, fewer negative comparisons to competitors.'
  },
  {
    id: 3,
    title: 'Facility & Room Maintenance Optimization',
    priority: 'medium',
    consistent: false,
    updatedFocus: true,
    impact: '~3% of guests',
    description: 'Address newly identified concerns regarding room water quality and maintenance issues.',
    actions: [
      'Investigate and address room water quality concerns. Communicate proactively if filters are recommended or provide complimentary filters.',
      'Implement regular preventive maintenance for climate control (AC) and other room facilities (e.g., Smart TVs).',
      'Enhance room inspection protocols before guest arrival.'
    ],
    expectedOutcome: 'Reduction in maintenance-related complaints, improved room comfort ratings.'
  },
  {
    id: 4,
    title: 'Operational Efficiency',
    priority: 'low',
    consistent: true,
    impact: '<1% of guests',
    description: 'Fine-tune operational aspects to enhance the overall guest experience.',
    actions: [
      'Review buggy service efficiency during peak times to minimize wait times.',
      'Monitor and ensure consistent operation of facilities like pool slides.'
    ],
    expectedOutcome: 'Smoother operations, fewer service-related complaints, and enhanced guest mobility around the resort.'
  }
];

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-200">High Priority</Badge>;
    case 'medium':
      return <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200">Medium Priority</Badge>;
    case 'low':
      return <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200">Low Priority</Badge>;
    default:
      return null;
  }
};

const StrategicRecommendations = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-ocean-600" />
            Strategic Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendations.map((rec) => (
              <Card 
                key={rec.id} 
                className={`border overflow-hidden ${
                  rec.priority === 'high' 
                    ? 'border-red-200' 
                    : rec.priority === 'medium'
                      ? 'border-amber-200'
                      : 'border-green-200'
                }`}
              >
                <div className={`p-3 border-b flex items-center justify-between ${
                  rec.priority === 'high' 
                    ? 'bg-red-50 border-red-200' 
                    : rec.priority === 'medium'
                      ? 'bg-amber-50 border-amber-200'
                      : 'bg-green-50 border-green-200'
                }`}>
                  <div className="flex items-center">
                    <h3 className="font-medium text-resort-800">{rec.title}</h3>
                    <div className="flex items-center ml-2">
                      {getPriorityBadge(rec.priority)}
                      
                      {rec.consistent && (
                        <Badge className="ml-1.5 bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200">
                          Consistent with Q4
                        </Badge>
                      )}
                      
                      {rec.additionalDetail && (
                        <Badge className="ml-1.5 bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200">
                          Added Detail
                        </Badge>
                      )}
                      
                      {rec.updatedFocus && (
                        <Badge className="ml-1.5 bg-ocean-100 text-ocean-800 border-ocean-200 hover:bg-ocean-200">
                          Updated Focus
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {rec.impact}
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-resort-600">{rec.description}</p>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-resort-800 mb-2">Recommended Actions</h4>
                    <ul className="space-y-2">
                      {rec.actions.map((action, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <ChevronRight className="h-4 w-4 text-ocean-500 mt-0.5 mr-1.5 flex-shrink-0" />
                          <span className="text-resort-600">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-start">
                      <ArrowUpRight className="h-4 w-4 text-green-600 mt-0.5 mr-1.5" />
                      <div className="text-sm">
                        <span className="font-medium text-resort-700">Expected Outcome: </span>
                        <span className="text-resort-600">{rec.expectedOutcome}</span>
                      </div>
                    </div>
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

export default StrategicRecommendations;

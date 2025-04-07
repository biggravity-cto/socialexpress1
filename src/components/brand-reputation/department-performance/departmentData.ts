
// Data for the department performance analysis

export type DepartmentDataType = {
  name: string;
  q1Negative: number;
  q4Negative: number;
  diffPercent: number;
  trend: 'increase' | 'decrease' | 'stable' | 'new';
  keyThemes: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
  color: string;
  recommendations: string[];
};

// Updated department data with the Q1 2025 estimates
export const departmentData: DepartmentDataType[] = [
  { 
    name: 'Location', 
    q1Negative: 10, 
    q4Negative: 3.88,
    diffPercent: 158,
    trend: 'increase',
    keyThemes: 'Distance from Nha Trang city center',
    priority: 'high',
    impact: '~10% of guests',
    color: '#6ad4e0',
    recommendations: [
      'Continue enhancing shuttle services to Nha Trang city (frequency, reliability)',
      'Develop more robust and varied on-site entertainment and activity schedules',
      'Explore partnerships with local tour operators for easy excursion booking'
    ]
  },
  { 
    name: 'Food & Beverage', 
    q1Negative: 5, 
    q4Negative: 2.94,
    diffPercent: 70,
    trend: 'increase',
    keyThemes: 'Breakfast quality/variety, comparison to other hotels',
    priority: 'medium',
    impact: '~5% of guests',
    color: '#91e6c8',
    recommendations: [
      'Review and enhance breakfast offerings, focusing on quality and potentially adding more Korean-friendly options',
      'Consider introducing rotating or seasonal menu items for variety',
      'Implement stricter quality control measures in food preparation'
    ]
  },
  { 
    name: 'Room Conditions', 
    q1Negative: 3, 
    q4Negative: 1.89,
    diffPercent: 59,
    trend: 'increase',
    keyThemes: 'Water quality (filters needed), AC issues',
    priority: 'medium',
    impact: '~3% of guests',
    color: '#a3f7bf',
    recommendations: [
      'Urgently investigate room water quality',
      'Provide complimentary shower filters',
      'Ensure regular preventive maintenance for in-room amenities'
    ]
  },
  { 
    name: 'Service', 
    q1Negative: 1, 
    q4Negative: 0,
    diffPercent: 100,
    trend: 'new',
    keyThemes: 'Buggy service speed',
    priority: 'low',
    impact: '<1% of guests',
    color: '#c2f8cb',
    recommendations: [
      'Optimize buggy dispatching during peak times',
      'Review scheduling for high-demand periods'
    ]
  },
  { 
    name: 'Pool Services', 
    q1Negative: 1, 
    q4Negative: 0.84,
    diffPercent: 19,
    trend: 'increase',
    keyThemes: 'Specific slide closure mentioned',
    priority: 'low',
    impact: '<1% of guests',
    color: '#d5f8d7',
    recommendations: [
      'Ensure consistent operation and maintenance of recreational facilities'
    ]
  },
  { 
    name: 'Front Desk', 
    q1Negative: 0.5, 
    q4Negative: 1.47,
    diffPercent: -66,
    trend: 'decrease',
    keyThemes: 'Minimal negative mentions',
    priority: 'low',
    impact: 'Minimal',
    color: '#e2f7e2',
    recommendations: [
      'Maintain current service standards'
    ]
  },
  { 
    name: 'Housekeeping', 
    q1Negative: 0.5, 
    q4Negative: 0.42,
    diffPercent: 19,
    trend: 'stable',
    keyThemes: 'Minimal negative mentions',
    priority: 'low',
    impact: 'Minimal',
    color: '#f0f7f4',
    recommendations: [
      'Maintain current service standards'
    ]
  },
];

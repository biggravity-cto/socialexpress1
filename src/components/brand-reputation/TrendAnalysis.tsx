
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Info, ArrowUp, ArrowDown, AlertTriangle, Minus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const trendData = [
  {
    metric: 'Overall Positive Sentiment',
    q4Value: '82.37%',
    q1Value: '~75%',
    change: -7.37,
    trend: 'decrease',
    notes: 'Slight decrease, but sample size difference limits comparability.'
  },
  {
    metric: 'Negative: Location',
    q4Value: '3.88%',
    q1Value: '~10%',
    change: 6.12,
    trend: 'increase',
    notes: 'Appears potentially higher, remains a top concern.'
  },
  {
    metric: 'Negative: Food & Beverage',
    q4Value: '2.94%',
    q1Value: '~5%',
    change: 2.06,
    trend: 'increase',
    notes: 'Appears potentially higher, breakfast quality specifically noted.'
  },
  {
    metric: 'Negative: Room Conditions',
    q4Value: '1.89%',
    q1Value: '~3%',
    change: 1.11,
    trend: 'increase',
    notes: 'Appears potentially higher, with water quality emerging as a specific theme.'
  },
  {
    metric: 'New Theme: Water Quality',
    q4Value: 'Not Highlighted',
    q1Value: 'Mentioned several times',
    change: null,
    trend: 'new',
    notes: 'Emerged as a specific negative point requiring attention.'
  },
  {
    metric: 'Key Strengths Consistency',
    q4Value: 'High',
    q1Value: 'High',
    change: null,
    trend: 'stable',
    notes: 'Family-friendliness, Pool Villas, Airport Proximity remain strong positive drivers.'
  }
];

const getTrendBadge = (trend: string) => {
  switch (trend) {
    case 'increase':
      return (
        <div className="flex items-center gap-1 text-red-600">
          <ArrowUp className="h-4 w-4" />
          <span>Increasing</span>
        </div>
      );
    case 'decrease':
      return (
        <div className="flex items-center gap-1 text-green-600">
          <ArrowDown className="h-4 w-4" />
          <span>Decreasing</span>
        </div>
      );
    case 'stable':
      return (
        <div className="flex items-center gap-1 text-gray-600">
          <Minus className="h-4 w-4" />
          <span>Stable</span>
        </div>
      );
    case 'new':
      return (
        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
          New Theme
        </Badge>
      );
    default:
      return null;
  }
};

const getChangeDisplay = (change: number | null) => {
  if (change === null) return '-';
  
  return (
    <span className={`font-medium ${
      change > 0 ? 'text-red-600' : 
      change < 0 ? 'text-green-600' : 'text-gray-600'
    }`}>
      {change > 0 ? '+' : ''}{change}%
    </span>
  );
};

const TrendAnalysis = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Trend Analysis (Q1 2025 vs. Q4 2024)</CardTitle>
          <CardDescription>
            Comparing key metrics between quarters with consideration for sample size difference
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Metric</TableHead>
                  <TableHead className="text-right">Q4 2024<br/><span className="text-xs font-normal">(953 Posts)</span></TableHead>
                  <TableHead className="text-right">Q1 2025<br/><span className="text-xs font-normal">(43 Posts)</span></TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trendData.map((item, index) => (
                  <TableRow key={index} className={index % 2 === 0 ? 'bg-muted/10' : ''}>
                    <TableCell className="font-medium">{item.metric}</TableCell>
                    <TableCell className="text-right">{item.q4Value}</TableCell>
                    <TableCell className="text-right">{item.q1Value}</TableCell>
                    <TableCell>{getChangeDisplay(item.change)}</TableCell>
                    <TableCell>{getTrendBadge(item.trend)}</TableCell>
                    <TableCell className="max-w-xs">{item.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-md p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-700 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-amber-800 mb-1">Interpretation Caution</h4>
                <p className="text-sm text-amber-700">
                  Due to the significant difference in sample size (43 vs. 953 posts), direct quarter-over-quarter 
                  comparisons should be interpreted cautiously. Trends indicated may be influenced by the smaller 
                  data set rather than representing true changes in guest sentiment.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Trend Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-ocean-100 rounded-md p-4 bg-ocean-50/50">
              <h3 className="font-medium text-resort-800 mb-3">Emerging Issues</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-sm">
                  <div className="h-5 w-5 bg-red-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-red-600 font-medium">1</span>
                  </div>
                  <div>
                    <span className="font-medium text-resort-700">Water Quality:</span>
                    <p className="text-resort-600 mt-0.5">
                      New concerns about water quality emerged this quarter, with guests specifically mentioning shower filters turning brown.
                    </p>
                  </div>
                </li>
                <li className="flex items-start text-sm">
                  <div className="h-5 w-5 bg-red-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-red-600 font-medium">2</span>
                  </div>
                  <div>
                    <span className="font-medium text-resort-700">Breakfast Comparison:</span>
                    <p className="text-resort-600 mt-0.5">
                      Direct comparisons to competitor breakfast offerings emerged as a specific point of critique.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="border border-green-100 rounded-md p-4 bg-green-50/50">
              <h3 className="font-medium text-resort-800 mb-3">Consistent Strengths</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-sm">
                  <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-green-600 font-medium">1</span>
                  </div>
                  <div>
                    <span className="font-medium text-resort-700">Family-Friendly Features:</span>
                    <p className="text-resort-600 mt-0.5">
                      Consistently mentioned across quarters as the primary strength, with specific praise for children's 
                      activities and pool facilities.
                    </p>
                  </div>
                </li>
                <li className="flex items-start text-sm">
                  <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-green-600 font-medium">2</span>
                  </div>
                  <div>
                    <span className="font-medium text-resort-700">Pool Villas & Airport Proximity:</span>
                    <p className="text-resort-600 mt-0.5">
                      These features remain consistently appreciated by guests across reporting periods.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendAnalysis;

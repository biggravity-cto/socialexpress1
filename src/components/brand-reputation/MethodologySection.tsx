
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Info, FileText, AlertTriangle, BarChart2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MethodologySection = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-ocean-600" />
            Research Methodology
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-2 text-resort-800">Data Collection</h3>
              <div className="space-y-3 text-sm text-resort-600">
                <p>
                  This analysis examines guest sentiment data collected from 43 unique blog posts primarily dated between January 1, 2025, and March 31, 2025, sourced from Naver.com.
                </p>
                <p>
                  Some posts dated April 1 were included in the source data but excluded from this Q1 analysis where possible based on date stamps.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2 text-resort-800">Analysis Approach</h3>
              <div className="space-y-3 text-sm text-resort-600">
                <p>
                  The methodology involved qualitative review and thematic categorization of guest feedback snippets.
                </p>
                <p>
                  Quantitative estimates (percentages, BSA score) are approximations due to the small sample size and lack of automated NLP analysis.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4 mt-4">
            <h3 className="text-sm font-medium mb-3 text-resort-800">Sample Size Comparison</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead>Time Period</TableHead>
                    <TableHead>Sample Size</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Analysis Type</TableHead>
                    <TableHead>Confidence Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Q1 2025</TableCell>
                    <TableCell>43 blog posts</TableCell>
                    <TableCell>Naver.com</TableCell>
                    <TableCell>Qualitative Review</TableCell>
                    <TableCell className="text-amber-600">Low / Indicative only</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Q4 2024</TableCell>
                    <TableCell>953 blog posts</TableCell>
                    <TableCell>Naver.com</TableCell>
                    <TableCell>NLP + Qualitative</TableCell>
                    <TableCell className="text-green-600">High</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mt-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-2" />
              <div>
                <h4 className="text-sm font-medium text-amber-800">Important Statistical Limitations</h4>
                <p className="text-sm text-amber-700 mt-1">
                  Confidence levels and margins of error from the Q4 report cannot be reliably applied to this Q1 data due to the significant difference in sample size (43 vs. 953). Trends indicated in this report should be considered preliminary and verified through additional data collection.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center pt-4 mt-4 border-t border-gray-100">
            <div className="flex items-center text-xs text-resort-500">
              <FileText className="h-3.5 w-3.5 mr-1.5" />
              Report produced by Big Gravity Analytics | Movenpick Resort Cam Ranh | Q1 2025
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MethodologySection;

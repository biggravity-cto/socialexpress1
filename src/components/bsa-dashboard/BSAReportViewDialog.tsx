
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Download, FileJson, FileText } from 'lucide-react';

const formatReportToSections = (reportText) => {
  if (!reportText) return {};

  // Try to extract basic sections
  const sections = {
    summary: '',
    sentimentDistribution: '',
    departmentPerformance: '',
    keyFindings: '',
    recommendations: '',
    trendAnalysis: '',
  };

  // Extract BSA Score
  const bsaScoreMatch = reportText.match(/BSA Score.*?(\d+\.?\d*)/i);
  sections.bsaScore = bsaScoreMatch ? bsaScoreMatch[1] : null;

  // Try to find sentiment distribution
  const sentimentMatch = reportText.match(/Positive:.*?\d+%.*?Negative:.*?\d+%.*?Neutral:.*?\d+%/is);
  if (sentimentMatch) {
    sections.sentimentDistribution = sentimentMatch[0];
  }

  // Extract other sections based on headings
  const headings = [
    { key: 'summary', pattern: /Summary|Overview|Report Overview/i },
    { key: 'departmentPerformance', pattern: /Department (Performance|Analysis)|Category Performance/i },
    { key: 'keyFindings', pattern: /Key Findings|Main Points|Findings/i },
    { key: 'recommendations', pattern: /Recommendations|Strategic Recommendations|Suggested Actions/i },
    { key: 'trendAnalysis', pattern: /Trend Analysis|Comparison|Historical/i },
  ];

  // Basic content splitting based on common markdown headings
  const lines = reportText.split('\n');
  let currentSection = 'summary';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if line starts a new section
    let foundSection = false;
    for (const heading of headings) {
      if (heading.pattern.test(line) && (line.startsWith('#') || lines[i-1]?.match(/^={3,}|^-{3,}/))) {
        currentSection = heading.key;
        foundSection = true;
        break;
      }
    }
    
    // Add line to current section
    if (!foundSection) {
      sections[currentSection] = (sections[currentSection] || '') + line + '\n';
    }
  }

  // If we couldn't extract structured sections, use the full text as summary
  if (!Object.values(sections).some(s => s && s.length > 100)) {
    sections.summary = reportText;
  }

  return sections;
};

const BSAReportViewDialog = ({ isOpen, onOpenChange, report, onDownloadJson, onDownloadTxt }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!report) return null;
  
  const reportSections = formatReportToSections(report.data?.report);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] sm:max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{report.title}</span>
            <div className="text-base font-normal flex items-center gap-2">
              <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-md">
                BSA Score: {report.bsa_score || 'N/A'}
              </span>
              <span className="text-sm text-gray-500">
                Q{report.quarter} {report.year}
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="findings">Findings</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="raw">Raw Report</TabsTrigger>
            </TabsList>
            
            <div className="overflow-y-auto max-h-[50vh] pr-2">
              <TabsContent value="overview">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Report Summary</h3>
                  <div className="whitespace-pre-line">
                    {reportSections.summary || report.data?.report}
                  </div>
                  
                  {reportSections.sentimentDistribution && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                      <h4 className="text-base font-medium mb-1">Sentiment Distribution</h4>
                      <div className="whitespace-pre-line">
                        {reportSections.sentimentDistribution}
                      </div>
                    </div>
                  )}
                </Card>
              </TabsContent>
              
              <TabsContent value="departments">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Department Performance</h3>
                  <div className="whitespace-pre-line">
                    {reportSections.departmentPerformance || "No department analysis found in report."}
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="findings">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Key Findings</h3>
                  <div className="whitespace-pre-line">
                    {reportSections.keyFindings || "No key findings section found in report."}
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="recommendations">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
                  <div className="whitespace-pre-line">
                    {reportSections.recommendations || "No recommendations found in report."}
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="trends">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Trend Analysis</h3>
                  <div className="whitespace-pre-line">
                    {reportSections.trendAnalysis || "No trend analysis found in report."}
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="raw">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Raw Report Data</h3>
                  <div className="whitespace-pre-line font-mono text-sm">
                    {report.data?.report || "No raw report data available."}
                  </div>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button 
              type="button"
              variant="outline"
              size="sm"
              onClick={onDownloadJson}
            >
              <FileJson className="h-4 w-4 mr-1" />
              Download JSON
            </Button>
            <Button 
              type="button"
              variant="outline"
              size="sm"
              onClick={onDownloadTxt}
            >
              <FileText className="h-4 w-4 mr-1" />
              Download TXT
            </Button>
          </div>
          <Button 
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BSAReportViewDialog;

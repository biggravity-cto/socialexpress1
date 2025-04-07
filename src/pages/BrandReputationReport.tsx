
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, FileText, Info, MessageSquare, BarChart2, Lightbulb, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SentimentDashboard from '@/components/brand-reputation/SentimentDashboard';
import DepartmentPerformance from '@/components/brand-reputation/DepartmentPerformance';
import KeyFindings from '@/components/brand-reputation/KeyFindings';
import TrendAnalysis from '@/components/brand-reputation/TrendAnalysis';
import ReviewsHighlights from '@/components/brand-reputation/ReviewsHighlights';
import RecommendationsSection from '@/components/brand-reputation/RecommendationsSection';
import StrategicRecommendations from '@/components/brand-reputation/StrategicRecommendations';
import MethodologySection from '@/components/brand-reputation/MethodologySection';

const BrandReputationReport = () => {
  const [viewingFullReport, setViewingFullReport] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pb-10"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-resort-800">Brand Reputation Report</h1>
            <span className="bg-ocean-100 text-ocean-800 text-xs px-2.5 py-1 rounded-full font-medium">
              Q1 2025
            </span>
          </div>
          <p className="text-resort-500">Movenpick Resort Cam Ranh | January 1 - March 31, 2025</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button 
            size="sm" 
            variant={viewingFullReport ? "secondary" : "default"}
            className={viewingFullReport 
              ? "bg-gray-200 hover:bg-gray-300 text-gray-800" 
              : "bg-ocean-600 hover:bg-ocean-700 flex items-center gap-2"
            }
            onClick={() => setViewingFullReport(!viewingFullReport)}
          >
            <FileText className="h-4 w-4" />
            {viewingFullReport ? 'Compact View' : 'Full Report'}
          </Button>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-amber-700 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-amber-800 text-sm">
            <span className="font-medium">Data Sample Note:</span> This analysis is based on 43 blog posts from Q1 2025 compared to 953 posts in Q4 2024. 
            Interpret trends with caution due to the significant difference in sample size.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-700">7.7</div>
            <div className="text-sm font-medium text-blue-800">BSA Score</div>
            <div className="text-xs text-blue-600 mt-1">7.9 in Q4 2024</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-700">75%</div>
            <div className="text-sm font-medium text-green-800">Positive Sentiment</div>
            <div className="text-xs text-green-600 mt-1">82.37% in Q4 2024</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-700">20%</div>
            <div className="text-sm font-medium text-red-800">Negative Sentiment</div>
            <div className="text-xs text-red-600 mt-1">11.44% in Q4 2024</div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard" className="flex items-center gap-1.5">
            <BarChart2 className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="findings" className="flex items-center gap-1.5">
            <Star className="h-4 w-4" /> Key Findings
          </TabsTrigger>
          <TabsTrigger value="department" className="flex items-center gap-1.5">
            <BarChart2 className="h-4 w-4" /> Department Performance
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-1.5">
            <BarChart2 className="h-4 w-4" /> Trend Analysis
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4" /> Key Reviews
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-1.5">
            <Lightbulb className="h-4 w-4" /> Recommendations
          </TabsTrigger>
          {viewingFullReport && (
            <TabsTrigger value="methodology" className="flex items-center gap-1.5">
              <Info className="h-4 w-4" /> Methodology
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="dashboard">
          <div className="space-y-6">
            <SentimentDashboard />
            {viewingFullReport ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ReviewsHighlights />
                <DepartmentPerformance />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ReviewsHighlights />
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="findings">
          <KeyFindings />
        </TabsContent>
        
        <TabsContent value="department">
          <DepartmentPerformance />
        </TabsContent>
        
        <TabsContent value="trends">
          <TrendAnalysis />
        </TabsContent>
        
        <TabsContent value="reviews">
          <ReviewsHighlights />
        </TabsContent>
        
        <TabsContent value="recommendations">
          <div className="space-y-6">
            {viewingFullReport ? <RecommendationsSection /> : null}
            <StrategicRecommendations />
          </div>
        </TabsContent>
        
        {viewingFullReport && (
          <TabsContent value="methodology">
            <MethodologySection />
          </TabsContent>
        )}
      </Tabs>

      {viewingFullReport && (
        <Card className="bg-blue-50 border-blue-200 mt-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Report Overview:</span> This report analyzes online guest sentiment for Movenpick Resort Cam Ranh during Q1 2025 (January 1 - March 31, 2025). The analysis is based on 43 relevant blog posts identified from Naver.com. The overall sentiment remains positive, though the significantly smaller sample size compared to Q4 2024 (43 posts vs. 953 posts) warrants caution when interpreting trends. Key areas like location convenience and dining experience continue to be focal points for guest feedback, alongside recurring positive mentions of family-friendly amenities and airport proximity.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default BrandReputationReport;

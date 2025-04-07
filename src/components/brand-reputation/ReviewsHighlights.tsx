
import React from 'react';
import { Card } from '@/components/ui/card';
import { MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

const ReviewsHighlights = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-resort-800 mb-4">Most Impactful Reviews</h3>
      
      <div className="space-y-6">
        <div className="border border-green-100 bg-green-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <ThumbsUp className="h-5 w-5 text-green-600 mr-2" />
            <h4 className="font-medium text-green-800">Most Positive Review</h4>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm text-green-700 font-medium">여행하는 김두브</div>
              <div className="text-xs text-green-600">March 7, 2025</div>
            </div>
            
            <div className="bg-white p-3 rounded-md border border-green-200">
              <p className="text-sm text-resort-700">
                "#나트랑가족숙소 #나트랑가족리조트 #나트랑키즈리조트 #나트랑대가족 #나트랑대가족여행 #나트랑대가족숙소..."
              </p>
              <div className="text-xs text-resort-500 mt-2 pt-2 border-t border-green-100">
                <span className="font-medium">Translation:</span> "#NhatrangFamilyAccommodation #NhatrangFamilyResort #NhatrangKidsResort #NhatrangLargeFamily #NhatrangLargeFamilyTrip #NhatrangLargeFamilyAccommodation..." (Highlights suitability for family and large group travel)
              </div>
            </div>
          </div>
        </div>
        
        <div className="border border-red-100 bg-red-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <ThumbsDown className="h-5 w-5 text-red-600 mr-2" />
            <h4 className="font-medium text-red-800">Most Critical Review</h4>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm text-red-700 font-medium">행</div>
              <div className="text-xs text-red-600">February 21, 2025</div>
            </div>
            
            <div className="bg-white p-3 rounded-md border border-red-200">
              <p className="text-sm text-resort-700">
                "...나트랑 시내에서 조금 떨어진 **모벤픽 리조트(Mövenpick Resort Cam Ranh)**는 깜란 국제공항에서 차로 약 10~15분 거리에 위치해 있어 이동이 편리합니다. 시내와는 거리가 있어 조용하고 한적한 분위기를 원하는 여행객에게 추천합니다..."
              </p>
              <div className="text-xs text-resort-500 mt-2 pt-2 border-t border-red-100">
                <span className="font-medium">Translation:</span> "...Movenpick Resort Cam Ranh, located a bit far from Nha Trang city center, is conveniently about a 10-15 minute drive from Cam Ranh International Airport. Recommended for travelers who want a quiet and secluded atmosphere due to its distance from the city..." (Highlights the distance from the city center as a key characteristic/potential drawback)
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
          <div className="flex items-start">
            <MessageSquare className="h-4 w-4 text-amber-600 mt-1 mr-2" />
            <div className="text-xs text-amber-800">
              <p><span className="font-medium">Sample Size Note:</span> Analysis based on 43 blog posts from Naver.com (Q1 2025) compared to 953 posts in Q4 2024.</p>
              <p className="mt-1"><span className="font-medium">Methodology:</span> Qualitative review and thematic categorization of guest feedback snippets.</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReviewsHighlights;

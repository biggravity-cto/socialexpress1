
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MessageSquare, ThumbsUp, ThumbsDown, Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const reviewsData = [
  {
    id: 1,
    type: 'positive',
    author: '여행하는 김두브',
    date: 'March 7, 2025',
    content: '#나트랑가족숙소 #나트랑가족리조트 #나트랑키즈리조트 #나트랑대가족 #나트랑대가족여행 #나트랑대가족숙소...',
    translation: '#NhatrangFamilyAccommodation #NhatrangFamilyResort #NhatrangKidsResort #NhatrangLargeFamily #NhatrangLargeFamilyTrip #NhatrangLargeFamilyAccommodation... (Highlights suitability for family and large group travel)',
    impact: 'High',
    sentiment: 'Overwhelmingly positive',
    key_themes: ['Family-friendly', 'Large groups', 'Accommodation quality']
  },
  {
    id: 2,
    type: 'critical',
    author: '행',
    date: 'February 21, 2025',
    content: '...나트랑 시내에서 조금 떨어진 **모벤픽 리조트(Mövenpick Resort Cam Ranh)**는 깜란 국제공항에서 차로 약 10~15분 거리에 위치해 있어 이동이 편리합니다. 시내와는 거리가 있어 조용하고 한적한 분위기를 원하는 여행객에게 추천합니다...',
    translation: '...Movenpick Resort Cam Ranh, located a bit far from Nha Trang city center, is conveniently about a 10-15 minute drive from Cam Ranh International Airport. Recommended for travelers who want a quiet and secluded atmosphere due to its distance from the city... (Highlights the distance from the city center as a key characteristic/potential drawback)',
    impact: 'Medium',
    sentiment: 'Mixed - positive about airport proximity, negative about city distance',
    key_themes: ['Location', 'Airport proximity', 'Distance from city']
  },
  {
    id: 3,
    type: 'critical',
    author: '여행자',
    date: 'January 15, 2025',
    content: '모벤픽은 샤워기를 켜는순간 필터가 갈색으로 변해가는게 실시간으로 눈에 보이더라고요.',
    translation: 'At Movenpick, you could see the filter turning brown in real-time the moment you turned on the shower.',
    impact: 'Medium',
    sentiment: 'Negative',
    key_themes: ['Water quality', 'Room facilities', 'Maintenance']
  },
  {
    id: 4,
    type: 'positive',
    author: '가족여행객',
    date: 'March 22, 2025',
    content: '키즈클럽과 수영장이 정말 좋았어요. 아이들이 정말 즐거워했고 우리도 휴식을 취할 수 있었습니다.',
    translation: 'The kids club and swimming pool were really good. The children really enjoyed it and we were able to relax too.',
    impact: 'High',
    sentiment: 'Very positive',
    key_themes: ['Kids facilities', 'Pool', 'Family experience']
  }
];

const ReviewsHighlights = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-ocean-600" />
            Most Impactful Reviews
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {reviewsData.map(review => (
            <Card 
              key={review.id} 
              className={`border ${
                review.type === 'positive' 
                  ? 'border-green-100 bg-green-50/30' 
                  : 'border-red-100 bg-red-50/30'
              }`}
            >
              <div className="p-4">
                <div className="flex items-center mb-3">
                  {review.type === 'positive' 
                    ? <ThumbsUp className="h-5 w-5 text-green-600 mr-2" />
                    : <ThumbsDown className="h-5 w-5 text-red-600 mr-2" />
                  }
                  <h4 className={`font-medium ${
                    review.type === 'positive' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {review.type === 'positive' ? 'Positive Review' : 'Critical Review'}
                    <Badge 
                      variant="outline" 
                      className={`ml-2 ${
                        review.impact === 'High' 
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {review.impact} Impact
                    </Badge>
                  </h4>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm">
                      <User className="h-3.5 w-3.5 mr-1.5 text-resort-500" />
                      <div className={`font-medium ${
                        review.type === 'positive' ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {review.author}
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-resort-500">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {review.date}
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-md border ${
                    review.type === 'positive' 
                      ? 'bg-white/80 border-green-200'
                      : 'bg-white/80 border-red-200'
                  }`}>
                    <p className="text-sm text-resort-700">
                      "{review.content}"
                    </p>
                    <div className="text-xs text-resort-500 mt-2 pt-2 border-t border-gray-100">
                      <span className="font-medium">Translation:</span> {review.translation}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="text-xs font-medium text-resort-600">Key Themes:</div>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {review.key_themes.map((theme, idx) => (
                        <Badge 
                          key={idx}
                          variant="outline" 
                          className={`${
                            review.type === 'positive'
                              ? 'bg-green-50 text-green-700 border-green-100'
                              : 'bg-red-50 text-red-700 border-red-100'
                          }`}
                        >
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
            <div className="flex items-start">
              <MessageSquare className="h-4 w-4 text-amber-600 mt-1 mr-2" />
              <div className="text-sm text-amber-800">
                <p><span className="font-medium">Sample Size Note:</span> Analysis based on 43 blog posts from Naver.com (Q1 2025) compared to 953 posts in Q4 2024.</p>
                <p className="mt-1.5"><span className="font-medium">Methodology:</span> Qualitative review and thematic categorization of guest feedback snippets. Reviews selected based on representativeness and impact.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewsHighlights;

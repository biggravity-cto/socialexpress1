
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  LineChart, 
  Search, 
  Plus, 
  Eye, 
  TrendingUp, 
  TrendingDown, 
  BarChart, 
  Activity,
  Users
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const MarketIntelligence = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">Market Intelligence</h1>
          <p className="text-resort-500">Monitor competitors, track trends, and gather market insights</p>
        </div>
        <Button className="bg-ocean-600 hover:bg-ocean-700 shadow-sm">
          <Plus className="mr-1.5 h-4 w-4" /> Add to Watchlist
        </Button>
      </div>

      <Tabs defaultValue="competitors">
        <TabsList className="mb-4">
          <TabsTrigger value="competitors">Competitor Watchlist</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
          <TabsTrigger value="influencers">Influencer Hub</TabsTrigger>
        </TabsList>
        
        <TabsContent value="competitors">
          <Card className="p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search competitors..."
                  className="pl-9"
                />
              </div>
              <Button variant="outline" className="justify-center sm:w-auto">
                <Eye className="mr-2 h-4 w-4" /> View All
              </Button>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 1, name: 'Luxury Resort A', social: 12500, change: 5.3, sentiment: 78 },
              { id: 2, name: 'Korean Spa B', social: 8700, change: -2.1, sentiment: 82 },
              { id: 3, name: 'Island Retreat C', social: 15300, change: 7.6, sentiment: 65 },
              { id: 4, name: 'Executive Hotel D', social: 9200, change: 1.2, sentiment: 71 },
              { id: 5, name: 'Wellness Center E', social: 11500, change: 3.8, sentiment: 88 },
              { id: 6, name: 'Beach Resort F', social: 10800, change: -0.5, sentiment: 69 }
            ].map((competitor) => (
              <Card key={competitor.id} className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-resort-800">{competitor.name}</h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-resort-600">Social Following</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{competitor.social.toLocaleString()}</span>
                        <span className={`ml-2 text-xs flex items-center ${
                          competitor.change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {competitor.change > 0 ? (
                            <TrendingUp className="h-3 w-3 mr-0.5" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-0.5" />
                          )}
                          {Math.abs(competitor.change)}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${(competitor.social / 20000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-resort-600">Sentiment Score</span>
                      <span className="text-sm font-medium">{competitor.sentiment}%</span>
                    </div>
                    <Progress value={competitor.sentiment} className="h-1" />
                  </div>
                  
                  <div className="pt-3 border-t border-gray-100 flex justify-between">
                    <Button variant="outline" size="sm">
                      <Activity className="mr-1.5 h-3 w-3" /> Activity
                    </Button>
                    <Button variant="outline" size="sm">
                      <BarChart className="mr-1.5 h-3 w-3" /> Compare
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="sentiment">
          <Card className="p-6">
            <div className="space-y-1 mb-6">
              <h2 className="text-xl font-medium text-resort-800">Brand Sentiment Analysis</h2>
              <p className="text-sm text-resort-500">Monitor and analyze sentiment across social media and review platforms</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="p-4 bg-green-50 border-green-200">
                <div className="text-center">
                  <h3 className="text-sm font-medium text-green-800 mb-1">Positive Sentiment</h3>
                  <p className="text-2xl font-bold text-green-700">72%</p>
                  <p className="text-xs text-green-600 mt-1">+5% from last month</p>
                </div>
              </Card>
              
              <Card className="p-4 bg-amber-50 border-amber-200">
                <div className="text-center">
                  <h3 className="text-sm font-medium text-amber-800 mb-1">Neutral Sentiment</h3>
                  <p className="text-2xl font-bold text-amber-700">18%</p>
                  <p className="text-xs text-amber-600 mt-1">-2% from last month</p>
                </div>
              </Card>
              
              <Card className="p-4 bg-red-50 border-red-200">
                <div className="text-center">
                  <h3 className="text-sm font-medium text-red-800 mb-1">Negative Sentiment</h3>
                  <p className="text-2xl font-bold text-red-700">10%</p>
                  <p className="text-xs text-red-600 mt-1">-3% from last month</p>
                </div>
              </Card>
            </div>
            
            <div className="text-center py-10">
              <p className="text-resort-500">Sentiment analysis visualization will appear here</p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card className="p-6">
            <div className="space-y-1 mb-6">
              <h2 className="text-xl font-medium text-resort-800">Market Trends & Predictions</h2>
              <p className="text-sm text-resort-500">Discover emerging trends and AI-powered market predictions</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="text-sm font-medium text-resort-800 mb-3">Trending Topics in Hospitality</h3>
                <div className="space-y-3">
                  {[
                    { id: 1, topic: 'Wellness Retreats', score: 92 },
                    { id: 2, topic: 'Sustainable Tourism', score: 87 },
                    { id: 3, topic: 'Digital Nomad Packages', score: 84 },
                    { id: 4, topic: 'Luxury Family Experiences', score: 79 },
                    { id: 5, topic: 'Korean Beauty Treatments', score: 76 }
                  ].map((trend) => (
                    <div key={trend.id} className="flex items-center">
                      <div className="flex-1">
                        <p className="text-sm text-resort-700">{trend.topic}</p>
                      </div>
                      <div className="w-1/2">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-100 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${trend.score}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-resort-600">{trend.score}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="text-sm font-medium text-resort-800 mb-3">AI Market Predictions</h3>
                <div className="space-y-3">
                  {[
                    { id: 1, prediction: 'Increased Korean tourist interest in Q3', probability: 'High' },
                    { id: 2, prediction: 'Rising demand for exclusive wellness packages', probability: 'Very High' },
                    { id: 3, prediction: 'Growth in business retreat bookings', probability: 'Medium' },
                    { id: 4, prediction: 'Trend toward longer average stays', probability: 'Medium-High' }
                  ].map((prediction) => (
                    <div key={prediction.id} className="p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-resort-800">{prediction.prediction}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-resort-500 mr-2">Probability:</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          prediction.probability === 'Very High' ? 'bg-green-100 text-green-800' :
                          prediction.probability === 'High' ? 'bg-blue-100 text-blue-800' :
                          prediction.probability === 'Medium-High' ? 'bg-teal-100 text-teal-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {prediction.probability}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="influencers">
          <Card className="p-6">
            <div className="space-y-1 mb-6">
              <h2 className="text-xl font-medium text-resort-800">Influencer Hub</h2>
              <p className="text-sm text-resort-500">Discover and manage potential influencer partnerships</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: 1, name: 'Min-ji Kim', platform: 'Instagram', followers: '850K', category: 'Travel & Lifestyle', image: 'https://i.pravatar.cc/150?img=21' },
                { id: 2, name: 'Daniel Wong', platform: 'YouTube', followers: '1.2M', category: 'Luxury Travel', image: 'https://i.pravatar.cc/150?img=22' },
                { id: 3, name: 'Sarah Johnson', platform: 'Instagram', followers: '620K', category: 'Wellness & Spa', image: 'https://i.pravatar.cc/150?img=23' },
                { id: 4, name: 'Jin-ho Park', platform: 'TikTok', followers: '950K', category: 'Travel & Photography', image: 'https://i.pravatar.cc/150?img=24' },
                { id: 5, name: 'Emma Chen', platform: 'Instagram', followers: '780K', category: 'Food & Travel', image: 'https://i.pravatar.cc/150?img=25' },
                { id: 6, name: 'Kyle Williams', platform: 'YouTube', followers: '550K', category: 'Adventure Travel', image: 'https://i.pravatar.cc/150?img=26' }
              ].map((influencer) => (
                <Card key={influencer.id} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <img 
                        src={influencer.image} 
                        alt={influencer.name} 
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h3 className="text-sm font-medium text-resort-800">{influencer.name}</h3>
                        <p className="text-xs text-resort-500">{influencer.platform} • {influencer.followers} followers</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        {influencer.category}
                      </span>
                    </div>
                    
                    <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                      <Button variant="outline" size="sm" className="flex-1">Profile</Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-ocean-50 text-ocean-600 border-ocean-200">Contact</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default MarketIntelligence;

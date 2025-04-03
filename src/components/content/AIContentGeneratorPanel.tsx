
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Sparkles, 
  Image as ImageIcon, 
  FileText, 
  Video,
  Send,
  Newspaper,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Lightbulb
} from 'lucide-react';

interface AIContentGeneratorPanelProps {
  setContentType: (type: 'post' | 'image' | 'video' | 'document') => void;
  setShowCreateContentDialog: (show: boolean) => void;
}

// Suggested prompts for different content types
const suggestedPrompts = {
  text: [
    "Write an engaging post about sustainability in business",
    "Create a listicle of top 10 industry trends for 2023",
    "Draft an announcement for our new product launch"
  ],
  image: [
    "Create a modern minimalist logo for a tech startup",
    "Design a social media graphic for Earth Day",
    "Generate a professional banner for our LinkedIn page"
  ],
  video: [
    "Create a 30-second product demonstration script",
    "Generate ideas for a short-form explainer video",
    "Draft a storyboard for a customer testimonial video"
  ]
};

const AIContentGeneratorPanel: React.FC<AIContentGeneratorPanelProps> = ({ 
  setContentType,
  setShowCreateContentDialog
}) => {
  const [activeContentType, setActiveContentType] = useState<'text' | 'image' | 'video'>('text');
  const [platform, setPlatform] = useState<string>('all');
  const [prompt, setPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleSuggestedPrompt = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
      
      // Map the active content type to the content type expected by the dialog
      const dialogContentType = 
        activeContentType === 'text' ? 'post' : 
        activeContentType === 'image' ? 'image' : 'video';
      
      setContentType(dialogContentType);
      setShowCreateContentDialog(true);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-2 border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-blue-500" />
            <h2 className="text-xl font-semibold">AI Content Generator</h2>
          </div>
          
          <Tabs defaultValue="text" className="w-full" onValueChange={(value) => setActiveContentType(value as 'text' | 'image' | 'video')}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="text" className="flex gap-2 items-center">
                <FileText className="h-4 w-4" /> Text
              </TabsTrigger>
              <TabsTrigger value="image" className="flex gap-2 items-center">
                <ImageIcon className="h-4 w-4" /> Image
              </TabsTrigger>
              <TabsTrigger value="video" className="flex gap-2 items-center">
                <Video className="h-4 w-4" /> Video
              </TabsTrigger>
            </TabsList>
            
            {/* Content type tabs */}
            <TabsContent value="text">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.text.map((suggestion, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1 bg-white"
                      onClick={() => handleSuggestedPrompt(suggestion)}
                    >
                      <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                      <span className="text-xs">{suggestion.substring(0, 25)}...</span>
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="image">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.image.map((suggestion, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1 bg-white"
                      onClick={() => handleSuggestedPrompt(suggestion)}
                    >
                      <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                      <span className="text-xs">{suggestion.substring(0, 25)}...</span>
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="video">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.video.map((suggestion, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1 bg-white"
                      onClick={() => handleSuggestedPrompt(suggestion)}
                    >
                      <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                      <span className="text-xs">{suggestion.substring(0, 25)}...</span>
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Newspaper className="h-4 w-4 text-slate-500" />
              <h3 className="text-sm font-medium">Target Platform</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge 
                className={`cursor-pointer ${platform === 'all' ? 'bg-blue-500' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}
                onClick={() => setPlatform('all')}
              >
                All Platforms
              </Badge>
              <Badge 
                className={`cursor-pointer flex items-center gap-1 ${platform === 'instagram' ? 'bg-fuchsia-500' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}
                onClick={() => setPlatform('instagram')}
              >
                <Instagram className="h-3 w-3" /> Instagram
              </Badge>
              <Badge 
                className={`cursor-pointer flex items-center gap-1 ${platform === 'twitter' ? 'bg-sky-500' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}
                onClick={() => setPlatform('twitter')}
              >
                <Twitter className="h-3 w-3" /> Twitter
              </Badge>
              <Badge 
                className={`cursor-pointer flex items-center gap-1 ${platform === 'facebook' ? 'bg-blue-700' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}
                onClick={() => setPlatform('facebook')}
              >
                <Facebook className="h-3 w-3" /> Facebook
              </Badge>
              <Badge 
                className={`cursor-pointer flex items-center gap-1 ${platform === 'linkedin' ? 'bg-blue-900' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}
                onClick={() => setPlatform('linkedin')}
              >
                <Linkedin className="h-3 w-3" /> LinkedIn
              </Badge>
            </div>
            
            <div className="relative">
              <Textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`Describe what ${activeContentType} you want to create. Be specific about tone, audience, and goals...`}
                className="min-h-24 pr-12 bg-white"
              />
              <Button 
                size="icon"
                className="absolute bottom-2 right-2 rounded-full bg-blue-500 hover:bg-blue-600"
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {isGenerating ? 'Generating Content...' : `Generate ${activeContentType.charAt(0).toUpperCase() + activeContentType.slice(1)}`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AIContentGeneratorPanel;

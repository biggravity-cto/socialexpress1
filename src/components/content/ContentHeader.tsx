
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Sparkles, CloudUpload, Image as ImageIcon, FileText, Video } from 'lucide-react';

interface ContentHeaderProps {
  setContentType: (type: 'post' | 'image' | 'video' | 'document') => void;
  setShowCreateContentDialog: (show: boolean) => void;
  setShowAIGenerator: (show: boolean) => void;
  showAIGenerator: boolean;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({
  setContentType,
  setShowCreateContentDialog,
  setShowAIGenerator,
  showAIGenerator
}) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Content Studio</h1>
        <p className="text-muted-foreground">Create, manage, and publish your digital assets</p>
      </div>
      
      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-primary text-primary-foreground">
                <Plus className="mr-2 h-4 w-4" /> Create Content
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] grid-cols-2">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-blue-900 p-6 no-underline outline-none focus:shadow-md"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setContentType('post');
                          setShowCreateContentDialog(true);
                        }}
                      >
                        <div className="mt-4 mb-2 text-lg font-medium text-white">
                          Quick Post
                        </div>
                        <p className="text-sm leading-tight text-white/90">
                          Create and schedule a text post for your social media platforms
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setContentType('image');
                          setShowCreateContentDialog(true);
                        }}
                      >
                        <div className="text-sm font-medium leading-none flex items-center">
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Image or Graphic
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Upload or create images for social media posts
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setContentType('video');
                          setShowCreateContentDialog(true);
                        }}
                      >
                        <div className="text-sm font-medium leading-none flex items-center">
                          <Video className="h-4 w-4 mr-2" />
                          Video Content
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Upload video content to your library
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setContentType('document');
                          setShowCreateContentDialog(true);
                        }}
                      >
                        <div className="text-sm font-medium leading-none flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Document
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Upload documents, PDFs, or other reference materials
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Dialog open={showAIGenerator} onOpenChange={setShowAIGenerator}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-blue-50 hover:bg-blue-100 border-blue-200">
                    <Sparkles className="mr-2 h-4 w-4 text-blue-500" /> AI Assistant
                  </Button>
                </DialogTrigger>
              </Dialog>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <Button variant="outline" className="flex items-center">
          <CloudUpload className="mr-2 h-4 w-4" /> Upload Assets
        </Button>
      </div>
    </div>
  );
};

export default ContentHeader;

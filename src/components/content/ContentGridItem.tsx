
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, MoreHorizontal, Copy, Share2, Download, Trash2, Video, FileText, MessageSquare } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ContentItem } from '@/types/content';

interface ContentGridItemProps {
  item: ContentItem;
  selectedItems: number[];
  toggleItemSelection: (id: number) => void;
  setContentItems: React.Dispatch<React.SetStateAction<ContentItem[]>>;
  toast: any;
}

const ContentGridItem: React.FC<ContentGridItemProps> = ({
  item,
  selectedItems,
  toggleItemSelection,
  setContentItems,
  toast
}) => {
  const getPlatformIcon = (platform?: string) => {
    switch (platform) {
      case 'instagram': return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
      case 'twitter': return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>;
      case 'facebook': return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'reviewing': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden border hover:shadow-md transition-shadow",
        selectedItems.includes(item.id) && "ring-2 ring-primary"
      )}
    >
      <div className="relative h-40 bg-muted">
        {/* Selection checkbox */}
        <div className="absolute top-2 left-2 z-20">
          <Button 
            variant="outline" 
            size="icon" 
            className={cn(
              "h-7 w-7 rounded-full bg-background/80 backdrop-blur-sm",
              selectedItems.includes(item.id) && "bg-primary text-primary-foreground"
            )}
            onClick={() => toggleItemSelection(item.id)}
          >
            {selectedItems.includes(item.id) 
              ? <CheckCircle2 className="h-4 w-4" /> 
              : <div className="h-4 w-4 rounded-full border-2" />
            }
          </Button>
        </div>
        
        <div className="absolute top-2 right-2 flex space-x-1 z-10">
          <Badge className={getStatusColor(item.status)} variant="outline">{item.status}</Badge>
          {item.platform && (
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
              {getPlatformIcon(item.platform)}
            </Badge>
          )}
        </div>
        
        {item.type === 'image' && item.thumbnail && (
          <img 
            src={item.thumbnail} 
            alt={item.title}
            className="w-full h-full object-cover"
          />
        )}
        
        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/20">
            <Video className="h-10 w-10 text-white" />
            {item.thumbnail && (
              <img 
                src={item.thumbnail} 
                alt={item.title}
                className="w-full h-full object-cover opacity-80"
              />
            )}
          </div>
        )}
        
        {item.type === 'document' && (
          <div className="h-full flex items-center justify-center bg-blue-50">
            <FileText className="h-12 w-12 text-blue-300" />
          </div>
        )}
        
        {item.type === 'post' && (
          <div className="absolute inset-0 flex items-center justify-center p-4 bg-purple-50">
            <p className="text-sm text-gray-600 line-clamp-4">{item.content || 'No content'}</p>
          </div>
        )}
      </div>
      
      <div className="p-3 space-y-2">
        <div className="flex justify-between">
          <h3 className="font-medium text-sm truncate">{item.title}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" /> Copy
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" /> Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" /> Download
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive"
                onClick={() => {
                  setContentItems(prev => prev.filter(i => i.id !== item.id));
                  toast({
                    title: "Item deleted",
                    description: "The content has been removed"
                  });
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <div>{item.date}</div>
          {item.size && <div>{item.size}</div>}
        </div>
        
        {(item.views !== undefined || item.interactions !== undefined) && (
          <div className="flex gap-3 text-xs text-muted-foreground pt-1">
            {item.views !== undefined && (
              <div className="flex items-center">
                <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {item.views}
              </div>
            )}
            {item.interactions !== undefined && (
              <div className="flex items-center">
                <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                {item.interactions}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ContentGridItem;


import React from 'react';
import { Post, Campaign } from '@/types/calendar';
import { Trash2 } from 'lucide-react';
import { getCampaignById, getPlatformIcon } from './helpers';

interface PostItemProps {
  post: Post;
  campaigns: Campaign[];
  onEditPost?: (post: Post) => void;
  onDeletePost?: (id: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ 
  post, 
  campaigns, 
  onEditPost, 
  onDeletePost 
}) => {
  const postCampaign = getCampaignById(campaigns, post.campaign_id);
  
  return (
    <div 
      key={post.id} 
      className="text-xs p-2 rounded bg-white border hover:shadow transition-shadow flex items-center gap-1 group"
      style={{
        borderLeft: postCampaign ? `3px solid ${postCampaign.color || '#e5e7eb'}` : 'none'
      }}
      onClick={(e) => {
        e.stopPropagation();
        onEditPost && onEditPost(post);
      }}
    >
      <div className="flex-1">
        <div className="flex items-center gap-1">
          {getPlatformIcon(post.platform)}
          <span className="font-medium">{post.title}</span>
        </div>
        <div className="text-gray-500 mt-0.5">{post.time}</div>
      </div>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onDeletePost && onDeletePost(post.id);
        }}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-red-500"
      >
        <Trash2 className="h-3 w-3" />
      </button>
    </div>
  );
};

export default PostItem;

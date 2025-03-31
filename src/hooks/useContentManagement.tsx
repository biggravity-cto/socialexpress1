
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { fetchPosts } from '@/services/calendarService';
import { ContentItem } from '@/types/content';

export const useContentManagement = () => {
  const { toast } = useToast();
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [showCreateContentDialog, setShowCreateContentDialog] = useState(false);
  const [contentType, setContentType] = useState<'post' | 'image' | 'video' | 'document'>('post');

  // Load content data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch actual posts from calendar service
        const postsData = await fetchPosts();
        
        // Convert posts to content items
        const convertedItems: ContentItem[] = postsData.map((post, index) => ({
          id: index + 1,
          type: post.type === 'image' || post.type === 'video' 
            ? post.type as 'image' | 'video' 
            : 'post',
          title: post.title || `Untitled ${post.type}`,
          date: post.date,
          status: post.status === 'published' 
            ? 'published' 
            : post.status === 'draft' 
              ? 'draft' 
              : 'reviewing',
          thumbnail: '/placeholder.svg',
          platform: post.platform as 'instagram' | 'twitter' | 'facebook',
          content: post.content,
          tags: ['content', post.platform, post.type],
          size: Math.floor(Math.random() * 5 + 1) + 'MB',
          views: Math.floor(Math.random() * 1000),
          interactions: Math.floor(Math.random() * 100)
        }));
        
        // Add more mock content items for a fuller experience
        const additionalItems: ContentItem[] = [
          {
            id: postsData.length + 1,
            type: 'image',
            title: 'Product Feature Highlight',
            date: '2023-09-15',
            status: 'published',
            thumbnail: '/placeholder.svg',
            platform: 'instagram',
            tags: ['product', 'feature', 'highlight'],
            size: '2.4MB',
            views: 754,
            interactions: 89
          },
          {
            id: postsData.length + 2,
            type: 'video',
            title: 'How-To Tutorial',
            date: '2023-09-10',
            status: 'published',
            thumbnail: '/placeholder.svg',
            platform: 'instagram',
            tags: ['tutorial', 'howto', 'video'],
            size: '15.7MB',
            views: 1250,
            interactions: 176
          },
          {
            id: postsData.length + 3,
            type: 'document',
            title: 'Brand Guidelines 2023',
            date: '2023-08-22',
            status: 'published',
            tags: ['brand', 'guidelines', 'design'],
            size: '4.2MB',
            views: 48,
            interactions: 5
          },
          {
            id: postsData.length + 4,
            type: 'post',
            title: 'Weekly Update Post',
            date: '2023-09-18',
            status: 'draft',
            platform: 'twitter',
            content: 'We\'re excited to announce our latest features coming next week! Stay tuned for more details.',
            tags: ['update', 'announcement', 'features'],
            views: 0,
            interactions: 0
          }
        ];
        
        const allItems = [...convertedItems, ...additionalItems];
        setContentItems(allItems);
        setFilteredItems(allItems);
      } catch (error) {
        console.error('Error loading content:', error);
        toast({
          title: "Error",
          description: "Failed to load content data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [toast]);

  // Filter content when tab or search changes
  useEffect(() => {
    let filtered = [...contentItems];
    
    // Filter by type (tab)
    if (activeTab !== 'all') {
      filtered = filtered.filter(item => item.type === activeTab);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        item.content?.toLowerCase().includes(query) ||
        item.platform?.toLowerCase().includes(query)
      );
    }
    
    // Sort items
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    setFilteredItems(filtered);
  }, [contentItems, activeTab, searchQuery, sortBy]);

  const toggleItemSelection = (id: number) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return;
    
    setContentItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    toast({
      title: `${selectedItems.length} items deleted`,
      description: "The selected items have been removed"
    });
    setSelectedItems([]);
  };

  const handleCreateContent = () => {
    // Add a new content item
    const newItem: ContentItem = {
      id: contentItems.length + 1,
      type: contentType,
      title: `New ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'draft',
      thumbnail: contentType === 'image' ? '/placeholder.svg' : undefined,
      tags: [contentType],
      size: contentType === 'document' ? '0.1MB' : contentType === 'video' ? '0MB' : undefined,
      views: 0,
      interactions: 0
    };

    setContentItems(prev => [newItem, ...prev]);
    setShowCreateContentDialog(false);
    
    toast({
      title: "Content created",
      description: `Your new ${contentType} has been created as a draft`
    });
  };

  return {
    contentItems,
    setContentItems,
    filteredItems,
    loading,
    selectedItems,
    setSelectedItems,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    showAIGenerator,
    setShowAIGenerator,
    showCreateContentDialog,
    setShowCreateContentDialog,
    contentType,
    setContentType,
    toggleItemSelection,
    handleSelectAll,
    handleBulkDelete,
    handleCreateContent,
    toast
  };
};

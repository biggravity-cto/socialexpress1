
import { Campaign, Post } from '@/types/calendar';
import { Twitter, Instagram, Facebook } from 'lucide-react';
import React from 'react';
import { format, isSameDay } from 'date-fns';

// Helper function to get campaign by ID
export const getCampaignById = (campaigns: Campaign[], campaignId?: string) => {
  if (!campaignId) return null;
  return campaigns.find(camp => camp.id === campaignId);
};

// Helper function to find active campaigns for a date
export const getActiveCampaignsForDate = (date: Date, campaigns: Campaign[]) => {
  const dateStr = format(date, 'yyyy-MM-dd');
  return campaigns.filter(campaign => {
    return dateStr >= campaign.startdate && dateStr <= campaign.enddate;
  });
};

// Helper function to group posts by date
export const groupPostsByDate = (posts: Post[]) => {
  return posts.reduce((acc, post) => {
    const dateStr = post.date;
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(post);
    return acc;
  }, {} as Record<string, Post[]>);
};

// Helper function to get platform icon
export const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'twitter':
      return <Twitter className="h-3 w-3 text-blue-400" />;
    case 'instagram':
      return <Instagram className="h-3 w-3 text-pink-500" />;
    case 'facebook':
      return <Facebook className="h-3 w-3 text-blue-600" />;
    default:
      return null;
  }
};

// Get the array of weekdays starting from the selected date
export const getWeekDays = (selectedDate: Date) => {
  // Get the start of the week (Sunday)
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
  
  // Generate days for the week
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    weekDays.push(day);
  }
  
  return weekDays;
};

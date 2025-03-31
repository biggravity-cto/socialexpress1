
import { supabase } from './supabaseClient';
import { Campaign } from '@/types/calendar';

// Campaigns
export const fetchCampaigns = async (): Promise<Campaign[]> => {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('startdate', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return [];
  }
};

export const createCampaign = async (campaignData: Omit<Campaign, 'id'>): Promise<Campaign | null> => {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .insert([campaignData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating campaign:', error);
    return null;
  }
};

export const updateCampaign = async (id: string, updates: Partial<Campaign>): Promise<Campaign | null> => {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating campaign:', error);
    return null;
  }
};

export const deleteCampaign = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('campaigns')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting campaign:', error);
    return false;
  }
};

// Mock campaigns data with more examples and better color coding
export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Campaign',
    startdate: '2023-06-01',
    enddate: '2023-08-31',
    color: '#FFE5CC',
    description: 'Promotion for summer products and vacation packages'
  },
  {
    id: '2',
    name: 'Back to School',
    startdate: '2023-08-15',
    enddate: '2023-09-15',
    color: '#CCE5FF',
    description: 'Special discounts for students and educational products'
  },
  {
    id: '3',
    name: 'Fall Collection',
    startdate: '2023-09-20',
    enddate: '2023-11-10',
    color: '#D4C2A8',
    description: 'Launching our new fall products lineup'
  },
  {
    id: '4',
    name: 'Holiday Season',
    startdate: '2023-11-20',
    enddate: '2023-12-31',
    color: '#FFCCCC',
    description: 'Christmas and New Year special offers'
  },
  {
    id: '5',
    name: 'Brand Awareness',
    startdate: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString().split('T')[0],
    enddate: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString().split('T')[0],
    color: '#D3E4FD',
    description: 'Increasing overall brand visibility across platforms'
  },
  {
    id: '6',
    name: 'Product Launch',
    startdate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().split('T')[0],
    enddate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0],
    color: '#E5DEFF',
    description: 'New product line release campaign'
  },
  {
    id: '7',
    name: 'Customer Appreciation',
    startdate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0],
    enddate: new Date(new Date().setDate(new Date().getDate() + 25)).toISOString().split('T')[0],
    color: '#FFDEE2',
    description: 'Thanking our loyal customers with special offers'
  },
  {
    id: '8',
    name: 'Winter Sale',
    startdate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
    enddate: new Date(new Date().setDate(new Date().getDate() + 60)).toISOString().split('T')[0],
    color: '#F2FCE2',
    description: 'End of year clearance and winter promotions'
  }
];

export const getMockCampaigns = () => mockCampaigns;

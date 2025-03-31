
import { supabase } from '../supabaseClient';
import { Campaign } from '@/types/calendar';

// Campaign API operations
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

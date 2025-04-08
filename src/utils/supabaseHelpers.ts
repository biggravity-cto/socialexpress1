
import { supabase } from '@/integrations/supabase/client';
import type { BSAClient, BSADataSource, BSAFile, BSAReport, BSAUserSettings } from '@/types/database.types';

// Helper functions to work with our custom tables
export const bsaClients = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('bsa_clients')
      .select('*')
      .order('name');
    
    return { data: data as BSAClient[] | null, error };
  },
};

export const bsaDataSources = {
  getByClientId: async (clientId: string) => {
    const { data, error } = await supabase
      .from('bsa_data_sources')
      .select('*')
      .eq('client_id', clientId)
      .order('name');
    
    return { data: data as BSADataSource[] | null, error };
  },
  
  add: async (dataSource: Omit<BSADataSource, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('bsa_data_sources')
      .insert(dataSource)
      .select();
    
    return { data: data as BSADataSource[] | null, error };
  },
  
  delete: async (id: string) => {
    const { error } = await supabase
      .from('bsa_data_sources')
      .delete()
      .eq('id', id);
    
    return { error };
  }
};

export const bsaFiles = {
  getByClientId: async (clientId: string) => {
    const { data, error } = await supabase
      .from('bsa_files')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });
    
    return { data: data as BSAFile[] | null, error };
  },
  
  upload: async (fileData: Omit<BSAFile, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('bsa_files')
      .insert(fileData)
      .select();
    
    return { data: data as BSAFile[] | null, error };
  },
  
  delete: async (id: string, filePath: string) => {
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('bsa_files')
      .remove([filePath]);
    
    if (storageError) return { error: storageError };
    
    // Delete from database
    const { error } = await supabase
      .from('bsa_files')
      .delete()
      .eq('id', id);
    
    return { error };
  }
};

export const bsaReports = {
  getByClientId: async (clientId: string) => {
    const { data, error } = await supabase
      .from('bsa_reports')
      .select('*')
      .eq('client_id', clientId)
      .order('year', { ascending: false })
      .order('quarter', { ascending: false });
    
    return { data: data as BSAReport[] | null, error };
  },
  
  create: async (report: Omit<BSAReport, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('bsa_reports')
      .insert(report)
      .select();
    
    return { data: data as BSAReport[] | null, error };
  },
  
  delete: async (id: string) => {
    const { error } = await supabase
      .from('bsa_reports')
      .delete()
      .eq('id', id);
    
    return { error };
  }
};

export const bsaUserSettings = {
  getByUserId: async (userId: string) => {
    const { data, error } = await supabase
      .from('bsa_user_settings')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    return { data: data as BSAUserSettings | null, error };
  },
  
  upsert: async (settings: Partial<BSAUserSettings> & { user_id: string }) => {
    // Check if settings exist
    const { data: existingSettings } = await bsaUserSettings.getByUserId(settings.user_id);
    
    if (existingSettings) {
      // Update
      const { data, error } = await supabase
        .from('bsa_user_settings')
        .update(settings)
        .eq('user_id', settings.user_id)
        .select();
      
      return { data: data as BSAUserSettings[] | null, error };
    } else {
      // Insert
      const { data, error } = await supabase
        .from('bsa_user_settings')
        .insert(settings)
        .select();
      
      return { data: data as BSAUserSettings[] | null, error };
    }
  }
};

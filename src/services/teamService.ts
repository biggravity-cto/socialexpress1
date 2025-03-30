
import { supabase } from '@/integrations/supabase/client';

export interface Team {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: 'admin' | 'editor' | 'viewer';
  created_at: string;
}

export interface TeamWithMembers extends Team {
  members: TeamMember[];
}

export const fetchTeams = async (): Promise<Team[]> => {
  try {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching teams:', error);
    return [];
  }
};

export const fetchTeamWithMembers = async (teamId: string): Promise<TeamWithMembers | null> => {
  try {
    // Fetch team details
    const { data: team, error: teamError } = await supabase
      .from('teams')
      .select('*')
      .eq('id', teamId)
      .single();
    
    if (teamError) throw teamError;
    
    // Fetch team members
    const { data: members, error: membersError } = await supabase
      .from('team_members')
      .select('*')
      .eq('team_id', teamId);
    
    if (membersError) throw membersError;
    
    return {
      ...team,
      members: members || []
    };
  } catch (error) {
    console.error('Error fetching team with members:', error);
    return null;
  }
};

export const createTeam = async (name: string, description?: string): Promise<Team | null> => {
  try {
    const { data, error } = await supabase
      .from('teams')
      .insert([{ name, description }])
      .select()
      .single();
    
    if (error) throw error;
    
    // Add current user as team admin
    const { user } = (await supabase.auth.getSession()).data.session || {};
    if (user) {
      await supabase
        .from('team_members')
        .insert([{
          team_id: data.id,
          user_id: user.id,
          role: 'admin'
        }]);
    }
    
    return data;
  } catch (error) {
    console.error('Error creating team:', error);
    return null;
  }
};

export const updateTeam = async (id: string, updates: Partial<Team>): Promise<Team | null> => {
  try {
    const { data, error } = await supabase
      .from('teams')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating team:', error);
    return null;
  }
};

export const deleteTeam = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting team:', error);
    return false;
  }
};

export const addTeamMember = async (teamId: string, email: string, role: 'admin' | 'editor' | 'viewer'): Promise<TeamMember | null> => {
  try {
    // First, get the user ID from their email
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();
    
    if (userError) throw new Error('User not found with that email');
    
    // Then add the team member
    const { data, error } = await supabase
      .from('team_members')
      .insert([{
        team_id: teamId,
        user_id: userData.id,
        role
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding team member:', error);
    return null;
  }
};

export const updateTeamMemberRole = async (id: string, role: 'admin' | 'editor' | 'viewer'): Promise<TeamMember | null> => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .update({ role })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating team member role:', error);
    return null;
  }
};

export const removeTeamMember = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error removing team member:', error);
    return false;
  }
};

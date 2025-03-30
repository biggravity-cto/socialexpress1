
import { supabase } from '@/integrations/supabase/client';

export interface Team {
  id: string;
  name: string;
  description: string | null;
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

export interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  job_title: string | null;
}

export interface TeamMemberWithProfile extends TeamMember {
  profile: UserProfile;
}

export const fetchUserTeams = async (userId: string): Promise<Team[]> => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('team_id')
      .eq('user_id', userId);

    if (error) throw error;
    if (!data || data.length === 0) return [];

    const teamIds = data.map(tm => tm.team_id);
    
    const { data: teamsData, error: teamsError } = await supabase
      .from('teams')
      .select('*')
      .in('id', teamIds);

    if (teamsError) throw teamsError;
    return teamsData || [];
  } catch (error) {
    console.error('Error fetching user teams:', error);
    return [];
  }
};

export const fetchTeamMembers = async (teamId: string): Promise<TeamMemberWithProfile[]> => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('team_id', teamId);

    if (error) throw error;
    
    // Cast to ensure role is of the correct type
    const typedMembers = (data || []).map(member => ({
      ...member,
      role: member.role as 'admin' | 'editor' | 'viewer'
    }));

    // Fetch profiles for each member
    const membersWithProfiles = await Promise.all(
      typedMembers.map(async (member) => {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', member.user_id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          return {
            ...member,
            profile: {
              id: member.user_id,
              first_name: null,
              last_name: null,
              avatar_url: null,
              job_title: null
            }
          };
        }

        return {
          ...member,
          profile: profileData
        };
      })
    );

    return membersWithProfiles;
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
};

export const createTeam = async (
  name: string,
  description: string | null,
  userId: string
): Promise<Team | null> => {
  try {
    // Create the team
    const { data: teamData, error: teamError } = await supabase
      .from('teams')
      .insert([{ name, description }])
      .select()
      .single();

    if (teamError) throw teamError;
    if (!teamData) return null;

    // Add the creator as admin
    const { error: memberError } = await supabase
      .from('team_members')
      .insert([
        {
          team_id: teamData.id,
          user_id: userId,
          role: 'admin'
        }
      ]);

    if (memberError) throw memberError;

    return teamData;
  } catch (error) {
    console.error('Error creating team:', error);
    return null;
  }
};

export const addTeamMember = async (
  teamId: string,
  userId: string,
  role: 'admin' | 'editor' | 'viewer'
): Promise<TeamMember | null> => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .insert([
        {
          team_id: teamId,
          user_id: userId,
          role
        }
      ])
      .select()
      .single();

    if (error) throw error;
    
    // Ensure the role is typed correctly
    return data ? {
      ...data,
      role: data.role as 'admin' | 'editor' | 'viewer'
    } : null;
  } catch (error) {
    console.error('Error adding team member:', error);
    return null;
  }
};

export const updateTeamMemberRole = async (
  memberId: string,
  role: 'admin' | 'editor' | 'viewer'
): Promise<TeamMember | null> => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .update({ role })
      .eq('id', memberId)
      .select()
      .single();

    if (error) throw error;
    
    // Ensure the role is typed correctly
    return data ? {
      ...data,
      role: data.role as 'admin' | 'editor' | 'viewer'
    } : null;
  } catch (error) {
    console.error('Error updating team member role:', error);
    return null;
  }
};

export const removeTeamMember = async (memberId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', memberId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error removing team member:', error);
    return false;
  }
};

export const updateTeam = async (
  teamId: string,
  updates: Partial<Pick<Team, 'name' | 'description'>>
): Promise<Team | null> => {
  try {
    const { data, error } = await supabase
      .from('teams')
      .update(updates)
      .eq('id', teamId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating team:', error);
    return null;
  }
};

export const deleteTeam = async (teamId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', teamId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting team:', error);
    return false;
  }
};

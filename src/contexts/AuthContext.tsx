
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType } from '@/types/auth';
import { useAuthUtils } from '@/hooks/useAuthUtils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { 
    fetchProfile: fetchProfileUtil, 
    signIn: signInUtil, 
    signUp: signUpUtil,
    signOut: signOutUtil,
    updateProfile: updateProfileUtil,
    resendConfirmationEmail: resendConfirmationEmailUtil
  } = useAuthUtils();

  const fetchProfile = async (userId: string) => {
    const profileData = await fetchProfileUtil(userId);
    if (profileData) {
      setProfile(profileData);
    }
  };

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state changed:', event);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Fetch profile when user changes
        if (newSession?.user) {
          setTimeout(() => {
            fetchProfile(newSession.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchProfile(currentSession.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    return signInUtil(email, password);
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    return signUpUtil(email, password, metadata);
  };

  const signOut = async () => {
    return signOutUtil();
  };

  const updateProfile = async (updates: any) => {
    if (!user) return;
    return updateProfileUtil(updates, user.id, fetchProfile);
  };

  const resendConfirmationEmail = async (email: string) => {
    return resendConfirmationEmailUtil(email);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        resendConfirmationEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

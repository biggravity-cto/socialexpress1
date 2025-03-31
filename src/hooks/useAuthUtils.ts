
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

export const useAuthUtils = () => {
  const { toast } = useToast();

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      return null;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      // Use window.location.origin to dynamically set the redirect URL
      const redirectTo = `${window.location.origin}/auth`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: redirectTo,
        },
      });

      if (error) throw error;

      toast({
        title: "Account created",
        description: "Please check your email to confirm your account.",
      });
      
      return { success: true };
    } catch (error: any) {
      toast({
        title: "Error creating account",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, message: error.message };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (updates: any, userId: string, fetchProfileFn: (id: string) => Promise<any>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);

      if (error) throw error;

      // Refresh profile data
      fetchProfileFn(userId);

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resendConfirmationEmail = async (email: string) => {
    try {
      // Get the current origin for redirect URL
      const redirectTo = `${window.location.origin}/auth`;
      console.log(`Sending verification email to ${email} with redirect URL: ${redirectTo}`);
      
      const { error, data } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: redirectTo,
        }
      });

      console.log('Resend response:', { error, data });

      if (error) {
        console.error('Error sending verification email:', error);
        throw error;
      }

      toast({
        title: "Verification email sent",
        description: "Please check your email for the confirmation link.",
      });
      
      return { success: true };
    } catch (error: any) {
      console.error('Exception in resendConfirmationEmail:', error);
      
      toast({
        title: "Error sending verification email",
        description: error.message,
        variant: "destructive",
      });
      
      return { success: false, message: error.message };
    }
  };

  return {
    fetchProfile,
    signIn,
    signUp,
    signOut,
    updateProfile,
    resendConfirmationEmail
  };
};


import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const EmailConfirmationHandler = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Handle the redirect from email confirmation
    const handleEmailConfirmation = async () => {
      const { hash, search } = window.location;
      const hasEmailConfirm = hash.includes('access_token') || search.includes('access_token');
      
      if (hasEmailConfirm) {
        try {
          const { data, error } = await supabase.auth.getSession();
          if (error) throw error;
          if (data.session) {
            // Successfully confirmed email, redirect to dashboard
            navigate('/dashboard');
          }
        } catch (error) {
          console.error('Error confirming email:', error);
        }
      }
    };
    
    handleEmailConfirmation();
  }, [navigate]);
  
  return null; // This component doesn't render anything
};

export default EmailConfirmationHandler;

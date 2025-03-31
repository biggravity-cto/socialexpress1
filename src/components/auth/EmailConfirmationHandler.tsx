
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const EmailConfirmationHandler = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Handle the redirect from email confirmation
    const handleEmailConfirmation = async () => {
      const { hash, search } = window.location;
      const hasAuthParams = 
        (hash && (hash.includes('access_token') || hash.includes('error'))) || 
        (search && (search.includes('access_token') || search.includes('error')));
      
      if (hasAuthParams) {
        try {
          setLoading(true);
          // This will automatically handle the token in the URL
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('Error in email confirmation:', error);
            throw error;
          }
          
          if (data.session) {
            console.log('Successfully authenticated with email confirmation');
            // Successfully confirmed email and logged in, redirect to dashboard
            setTimeout(() => {
              navigate('/dashboard');
            }, 500); // Short delay to avoid navigation race conditions
          } else {
            throw new Error('No session data found after authentication');
          }
        } catch (error: any) {
          console.error('Exception in email confirmation handling:', error);
          setError(error.message || 'Failed to authenticate');
        } finally {
          setLoading(false);
        }
      } else {
        // No auth params in URL, not a confirmation link
        setLoading(false);
      }
    };
    
    handleEmailConfirmation();
  }, [navigate]);
  
  if (!loading && !error) {
    return null; // Render nothing if not handling confirmation
  }
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      {loading ? (
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-resort-600">Authenticating your account...</p>
        </div>
      ) : error ? (
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
            <div className="mt-2">
              <button 
                onClick={() => navigate('/auth')} 
                className="text-sm underline"
              >
                Return to login
              </button>
            </div>
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
};

export default EmailConfirmationHandler;

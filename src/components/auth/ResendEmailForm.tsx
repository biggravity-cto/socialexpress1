
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type FormValues = z.infer<typeof formSchema>;

interface ResendEmailFormProps {
  onError?: (error: string) => void;
}

const ResendEmailForm: React.FC<ResendEmailFormProps> = ({ onError }) => {
  const { resendConfirmationEmail } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsResending(true);
    setError(null);
    
    try {
      console.log(`Attempting to resend confirmation email to: ${values.email}`);
      const result = await resendConfirmationEmail(values.email);
      
      console.log('Resend result:', result);
      setResendSuccess(result.success);
      
      if (!result.success && result.message) {
        setError(result.message);
        if (onError) onError(result.message);
      }
    } catch (err: any) {
      console.error('Error in email resend form submission:', err);
      setError(err.message || 'Failed to send verification email');
      setResendSuccess(false);
      if (onError) onError(err.message || 'Failed to send verification email');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="youremail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isResending}
          >
            {isResending ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Resend Verification Email'
            )}
          </Button>
          
          {resendSuccess && (
            <div className="p-3 bg-green-50 border border-green-100 rounded-md text-sm text-green-700 mt-4">
              Verification email has been sent. Please check your inbox and spam folders.
            </div>
          )}
        </form>
      </Form>
      
      <div className="mt-4">
        <Link to="/auth" className="w-full">
          <Button variant="outline" className="w-full">
            Back to Login
          </Button>
        </Link>
      </div>
    </>
  );
};

export default ResendEmailForm;

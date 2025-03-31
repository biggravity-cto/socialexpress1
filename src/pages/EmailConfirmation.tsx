
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Mail, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type FormValues = z.infer<typeof formSchema>;

const EmailConfirmation = () => {
  const { resendConfirmationEmail } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsResending(true);
    const result = await resendConfirmationEmail(values.email);
    setResendSuccess(result.success);
    setIsResending(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-resort-800">BG Social<span className="text-ocean-600">Express</span></h1>
          <p className="text-resort-500 mt-2">Thank you for signing up!</p>
        </div>
        
        <Card className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Mail className="h-10 w-10 text-green-600" />
            </div>
            
            <h2 className="text-xl font-semibold text-resort-800">
              Check your email
            </h2>
            
            <p className="text-resort-500">
              We've sent a confirmation link to your email address. Please check your inbox and click the link to activate your account.
            </p>
            
            <div className="w-full pt-4 border-t border-gray-100 mt-4">
              <div className="flex items-center justify-center gap-2 text-sm text-resort-500">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>A confirmation email has been sent</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-resort-500 mb-4 text-center">
              Didn't receive an email? Enter your email below to request a new confirmation link.
            </p>
            
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
                    Verification email has been sent. Please check your inbox.
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
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default EmailConfirmation;

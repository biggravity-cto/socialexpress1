
import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

const BookCall = () => {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase.functions.invoke('send-booking-notification', {
        body: data,
      });

      if (error) throw error;

      toast({
        title: "Request Submitted",
        description: "We'll be in touch shortly to confirm your strategy call.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-space-dark py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white font-display">
              Book Your Strategy Call
            </h1>
            <p className="text-lg text-gray-300">
              Let's discuss how we can help you reach the Korean market
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 shadow-2xl border border-white/10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your@email.com" 
                          type="email"
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Company (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your company name" 
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your goals..."
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-green to-brand-primary hover:opacity-90 text-space-dark font-medium py-6 h-auto text-lg"
                >
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Schedule Your Call
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookCall;


import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CalendarDays, Mail, User, MessageSquare } from 'lucide-react';
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
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface BookingFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

const BookCall = () => {
  const { toast } = useToast();
  const form = useForm<BookingFormData>();

  const onSubmit = (data: BookingFormData) => {
    console.log(data);
    toast({
      title: "Request Submitted",
      description: "We'll be in touch shortly to confirm your strategy call.",
    });
    form.reset();
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
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input 
                            placeholder="Your name" 
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400" 
                            {...field}
                          />
                        </div>
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
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input 
                            placeholder="your@email.com" 
                            type="email"
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400" 
                            {...field}
                          />
                        </div>
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
                      <FormLabel className="text-white">Company</FormLabel>
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
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Textarea 
                            placeholder="Tell us about your goals..."
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[120px]"
                            {...field}
                          />
                        </div>
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

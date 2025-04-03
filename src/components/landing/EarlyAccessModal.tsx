
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface EarlyAccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EarlyAccessModal: React.FC<EarlyAccessModalProps> = ({
  open,
  onOpenChange
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Show success message
      toast.success("You've been added to our early access list!");
      
      // Reset form after 1 second
      setTimeout(() => {
        setName('');
        setEmail('');
        setIsSuccess(false);
        onOpenChange(false);
      }, 1500);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-resort-800">
            Get Early Access
          </DialogTitle>
          <DialogDescription className="text-center text-resort-600 pt-2">
            Join our exclusive early access program and be among the first to experience our AI-powered guest journey platform.
          </DialogDescription>
        </DialogHeader>
        
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 py-4"
            >
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-resort-700">
                  Your Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="rounded-lg h-12"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-resort-700">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="rounded-lg h-12"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-6 bg-ocean-600 hover:bg-ocean-700 rounded-lg mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Request Early Access'}
              </Button>
              
              <p className="text-xs text-center text-gray-500 mt-3">
                We'll never share your information with third parties.
              </p>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-resort-800 mb-2">Thank You!</h3>
              <p className="text-center text-resort-600">
                Your early access request has been submitted. We'll be in touch soon!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default EarlyAccessModal;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BrainCircuit, X } from 'lucide-react';

interface AIMarketingManagerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AIMarketingManagerDialog: React.FC<AIMarketingManagerDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center">
            <BrainCircuit className="mr-2 h-5 w-5 text-ocean-600" />
            AI Marketing Manager
          </DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="flex-1 overflow-auto p-1">
          <div className="h-full bg-gray-50 rounded-md border p-4 flex flex-col">
            <div className="flex-1 overflow-auto">
              <div className="space-y-4 mb-4">
                <div className="bg-ocean-50 p-4 rounded-lg border border-ocean-100">
                  <p className="text-ocean-800 font-medium">How can I help manage your marketing today?</p>
                </div>
                
                <div className="bg-gray-100 p-3 rounded-md">
                  <p className="text-sm text-gray-600 font-medium mb-2">Try asking:</p>
                  <div className="space-y-2">
                    <div className="bg-white p-2 rounded border border-gray-200 text-sm cursor-pointer hover:bg-ocean-50 transition-colors">
                      Create a summer promotion campaign for our resort
                    </div>
                    <div className="bg-white p-2 rounded border border-gray-200 text-sm cursor-pointer hover:bg-ocean-50 transition-colors">
                      What are the current trends in hotel marketing?
                    </div>
                    <div className="bg-white p-2 rounded border border-gray-200 text-sm cursor-pointer hover:bg-ocean-50 transition-colors">
                      Analyze our recent social media performance
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-auto border-t pt-4">
              <div className="flex items-center rounded-md border bg-white">
                <input 
                  type="text" 
                  className="flex-1 px-3 py-2 bg-transparent outline-none text-sm" 
                  placeholder="Ask your AI Marketing Manager..."
                />
                <Button size="sm" className="rounded-l-none">Send</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIMarketingManagerDialog;

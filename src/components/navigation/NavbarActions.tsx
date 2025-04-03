
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarActionsProps {
  onEarlyAccessClick: () => void;
}

const NavbarActions: React.FC<NavbarActionsProps> = ({ onEarlyAccessClick }) => {
  return (
    <div className="flex items-center gap-3 mr-2">
      <Link to="/auth" className="text-sm text-ocean-700 hover:text-ocean-900 font-medium hidden md:flex items-center">
        <User className="h-4 w-4 mr-1" />
        Demo Login
      </Link>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button 
          className="bg-ocean-600 hover:bg-ocean-700 font-medium text-xs sm:text-sm py-1 px-2 sm:px-4 h-8 sm:h-10"
          onClick={onEarlyAccessClick}
        >
          <Sparkles className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Early Access
        </Button>
      </motion.div>
    </div>
  );
};

export default NavbarActions;


import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Import refactored components
import AccountSettings from '@/components/settings/AccountSettings';
import TeamSettings from '@/components/settings/TeamSettings';
import BrandSettings from '@/components/settings/BrandSettings';
import IntegrationSettings from '@/components/settings/IntegrationSettings';

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Here you would handle the actual logout logic
    // For now, just navigate to the login page
    navigate('/login');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">Settings</h1>
          <p className="text-resort-500">Manage your account, brand settings, and integrations</p>
        </div>
        <Button 
          variant="destructive" 
          onClick={handleLogout}
          className="flex items-center"
        >
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      </div>

      <Tabs defaultValue="account">
        <TabsList className="mb-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="brand">Brand Kit</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <AccountSettings />
        </TabsContent>
        
        <TabsContent value="team">
          <TeamSettings />
        </TabsContent>
        
        <TabsContent value="brand">
          <BrandSettings />
        </TabsContent>
        
        <TabsContent value="integrations">
          <IntegrationSettings />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Settings;


import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Save,
  Upload
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const AccountSettings = () => {
  return (
    <Card className="p-6">
      <div className="space-y-1 mb-6">
        <h2 className="text-xl font-medium text-resort-800">Account Settings</h2>
        <p className="text-sm text-resort-500">Manage your personal information and preferences</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-[240px] flex flex-col items-center p-4 bg-gray-50 rounded-lg">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-gray-400" />
          </div>
          <Button variant="outline" className="w-full">
            <Upload className="h-4 w-4 mr-2" /> Upload Photo
          </Button>
        </div>
        
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="john.doe@example.com" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input id="jobTitle" defaultValue="Marketing Manager" />
          </div>
          
          <Separator />
          
          <div className="pt-2">
            <h3 className="text-sm font-medium text-resort-800 mb-4">Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button className="bg-ocean-600 hover:bg-ocean-700">
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AccountSettings;

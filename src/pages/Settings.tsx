import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Building, 
  PaintBucket, 
  Link as LinkIcon, 
  Settings as SettingsIcon,
  Save,
  Upload,
  LogOut,
  UserPlus,
  UserCog,
  Shield,
  Mail
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';

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
        </TabsContent>
        
        <TabsContent value="team">
          <Card className="p-6">
            <div className="space-y-1 mb-6">
              <h2 className="text-xl font-medium text-resort-800">Team Management</h2>
              <p className="text-sm text-resort-500">Manage team members and their permissions</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-resort-800">Team Members</h3>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" /> Invite Member
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active' },
                    { name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor', status: 'Active' },
                    { name: 'Mike Johnson', email: 'mike.j@example.com', role: 'Viewer', status: 'Pending' },
                  ].map((member, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {member.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <UserCog className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-resort-800">Role Permissions</h3>
                <div className="grid gap-4">
                  {[
                    { role: 'Admin', description: 'Full access to all features and settings', icon: Shield },
                    { role: 'Editor', description: 'Can create and edit content, but cannot manage users or settings', icon: Mail },
                    { role: 'Viewer', description: 'Read-only access to content and analytics', icon: User },
                  ].map((role, i) => (
                    <div key={i} className="flex items-start p-4 border rounded-lg">
                      <div className="mr-4 mt-1">
                        <role.icon className="h-5 w-5 text-resort-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-resort-800">{role.role}</h4>
                        <p className="text-sm text-resort-500">{role.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="brand">
          <Card className="p-6">
            <div className="space-y-1 mb-6">
              <h2 className="text-xl font-medium text-resort-800">Brand Kit & AI Assets</h2>
              <p className="text-sm text-resort-500">Manage your brand identity and assets</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Brand Logo</Label>
                <div className="p-6 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center">
                  <Building className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-resort-500 mb-4">Upload your brand logo</p>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" /> Upload Logo
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Brand Colors</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {[
                    { label: 'Primary', color: '#0EA5E9' },
                    { label: 'Secondary', color: '#8B5CF6' },
                    { label: 'Accent', color: '#F97316' },
                    { label: 'Neutral', color: '#64748B' },
                    { label: 'Background', color: '#F8FAFC' }
                  ].map((color, index) => (
                    <div key={index} className="space-y-1">
                      <div
                        className="w-full h-12 rounded-md border border-gray-200 cursor-pointer flex items-center justify-center"
                        style={{ backgroundColor: color.color }}
                      >
                        <PaintBucket className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-xs text-resort-600 text-center">{color.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-resort-800 mb-4">Brand Voice for AI</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="brandTone">Brand Tone</Label>
                    <Input id="brandTone" defaultValue="Professional, friendly, and approachable" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brandPersonality">Brand Personality</Label>
                    <Input id="brandPersonality" defaultValue="Luxurious, caring, and attentive" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-ocean-600 hover:bg-ocean-700">
                  <Save className="h-4 w-4 mr-2" /> Save Brand Kit
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations">
          <Card className="p-6">
            <div className="space-y-1 mb-6">
              <h2 className="text-xl font-medium text-resort-800">Integrations</h2>
              <p className="text-sm text-resort-500">Connect your social media accounts and other services</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-resort-800">Global Social Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Instagram', status: 'connected', icon: 'instagram' },
                    { name: 'Facebook', status: 'connected', icon: 'facebook' },
                    { name: 'Twitter', status: 'not connected', icon: 'twitter' },
                    { name: 'LinkedIn', status: 'connected', icon: 'linkedin' }
                  ].map((social) => (
                    <div 
                      key={social.name} 
                      className="p-4 rounded-lg border border-gray-200 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          <LinkIcon className="h-5 w-5 text-resort-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-resort-800">{social.name}</h4>
                          <p className="text-xs text-resort-500 capitalize">{social.status}</p>
                        </div>
                      </div>
                      <Button 
                        variant={social.status === 'connected' ? 'outline' : 'default'}
                        size="sm"
                      >
                        {social.status === 'connected' ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-resort-800">Korean Platforms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Naver Blog', status: 'connected', icon: 'naver' },
                    { name: 'KakaoTalk', status: 'connected', icon: 'kakao' },
                    { name: 'Naver Café', status: 'not connected', icon: 'naver' },
                    { name: 'Naver Band', status: 'not connected', icon: 'naver' }
                  ].map((social) => (
                    <div 
                      key={social.name} 
                      className="p-4 rounded-lg border border-gray-200 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          <LinkIcon className="h-5 w-5 text-resort-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-resort-800">{social.name}</h4>
                          <p className="text-xs text-resort-500 capitalize">{social.status}</p>
                        </div>
                      </div>
                      <Button 
                        variant={social.status === 'connected' ? 'outline' : 'default'}
                        size="sm"
                      >
                        {social.status === 'connected' ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-resort-800">Other Integrations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'CRM System', status: 'connected', icon: 'crm' },
                    { name: 'Property Management System', status: 'not connected', icon: 'pms' },
                    { name: 'Analytics Platform', status: 'connected', icon: 'analytics' },
                    { name: 'Email Marketing', status: 'connected', icon: 'email' }
                  ].map((integration) => (
                    <div 
                      key={integration.name} 
                      className="p-4 rounded-lg border border-gray-200 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          <SettingsIcon className="h-5 w-5 text-resort-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-resort-800">{integration.name}</h4>
                          <p className="text-xs text-resort-500 capitalize">{integration.status}</p>
                        </div>
                      </div>
                      <Button 
                        variant={integration.status === 'connected' ? 'outline' : 'default'}
                        size="sm"
                      >
                        {integration.status === 'connected' ? 'Configure' : 'Connect'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Settings;

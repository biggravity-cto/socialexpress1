
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, MoreHorizontal, Mail, Phone, Check, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Marketing Director',
      avatar: 'https://i.pravatar.cc/150?img=11',
      email: 'alex.johnson@example.com',
      phone: '+1 (555) 123-4567',
      status: 'active'
    },
    {
      id: 2,
      name: 'Sarah Kim',
      role: 'Content Manager',
      avatar: 'https://i.pravatar.cc/150?img=12',
      email: 'sarah.kim@example.com',
      phone: '+1 (555) 234-5678',
      status: 'active'
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Social Media Specialist',
      avatar: 'https://i.pravatar.cc/150?img=13',
      email: 'michael.chen@example.com',
      phone: '+1 (555) 345-6789',
      status: 'active'
    },
    {
      id: 4,
      name: 'Emily Wilson',
      role: 'Creative Director',
      avatar: 'https://i.pravatar.cc/150?img=14',
      email: 'emily.wilson@example.com',
      phone: '+1 (555) 456-7890',
      status: 'away'
    },
    {
      id: 5,
      name: 'David Park',
      role: 'Korean Market Specialist',
      avatar: 'https://i.pravatar.cc/150?img=15',
      email: 'david.park@example.com',
      phone: '+1 (555) 567-8901',
      status: 'active'
    },
    {
      id: 6,
      name: 'Lisa Rodriguez',
      role: 'Analytics Manager',
      avatar: 'https://i.pravatar.cc/150?img=16',
      email: 'lisa.rodriguez@example.com',
      phone: '+1 (555) 678-9012',
      status: 'inactive'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'away':
        return 'bg-amber-100 text-amber-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">Team Management</h1>
          <p className="text-resort-500">Manage team members, roles, and permissions</p>
        </div>
        <Button className="bg-ocean-600 hover:bg-ocean-700 shadow-sm">
          <UserPlus className="mr-1.5 h-4 w-4" /> Add Team Member
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search team members..."
              className="pl-9"
            />
          </div>
          <Button variant="outline" className="justify-center sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </Card>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Members</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending Invites</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h3 className="text-sm font-medium text-resort-800">{member.name}</h3>
                        <p className="text-xs text-resort-500">{member.role}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(member.status)}>
                      {member.status === 'active' && <Check className="mr-1 h-3 w-3" />}
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-resort-600 text-sm truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-resort-600 text-sm">{member.phone}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.filter(member => member.status === 'active').map((member) => (
              <Card key={member.id} className="overflow-hidden hover:shadow-md transition-shadow">
                {/* Same content as "all" tab, filtered for active members */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h3 className="text-sm font-medium text-resort-800">{member.name}</h3>
                        <p className="text-xs text-resort-500">{member.role}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <Check className="mr-1 h-3 w-3" />
                      Active
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-resort-600 text-sm truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-resort-600 text-sm">{member.phone}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card className="p-6 text-center">
            <p className="text-resort-500">No pending invites at the moment.</p>
            <Button className="mt-4 bg-ocean-600 hover:bg-ocean-700">
              <Plus className="mr-1.5 h-4 w-4" /> Send New Invite
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Team;

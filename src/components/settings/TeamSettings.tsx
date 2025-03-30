
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  UserPlus,
  UserCog,
  Shield,
  Mail,
  User,
  Check
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

const TeamSettings = () => {
  return (
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
                    {member.status === 'Active' && <Check className="mr-1 h-3 w-3" />}
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
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
  );
};

export default TeamSettings;

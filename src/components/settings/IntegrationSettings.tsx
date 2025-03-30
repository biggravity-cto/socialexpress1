
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Link as LinkIcon,
  Settings as SettingsIcon
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const IntegrationSettings = () => {
  return (
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
  );
};

export default IntegrationSettings;

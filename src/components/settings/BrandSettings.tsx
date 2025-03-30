
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Building,
  PaintBucket,
  Upload,
  Save
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const BrandSettings = () => {
  return (
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
  );
};

export default BrandSettings;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Save, Trash2, Settings, Eye, EyeOff, LayoutGrid } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

import OccupancyChart from '@/components/analytics/OccupancyChart';
import RevenueMetrics from '@/components/analytics/RevenueMetrics';
import GuestDemographics from '@/components/analytics/GuestDemographics';
import ChannelPerformance from '@/components/analytics/ChannelPerformance';
import ReviewSentiment from '@/components/analytics/ReviewSentiment';
import MarketingROI from '@/components/analytics/MarketingROI';

// Component catalog
const componentCatalog = [
  { id: 'occupancy-chart', title: 'Occupancy Chart', component: OccupancyChart, description: 'View hotel occupancy rates over time' },
  { id: 'revenue-metrics', title: 'Revenue Metrics', component: RevenueMetrics, description: 'Track key revenue metrics including RevPAR and ADR' },
  { id: 'guest-demographics', title: 'Guest Demographics', component: GuestDemographics, description: 'Analyze your guest demographic data' },
  { id: 'channel-performance', title: 'Channel Performance', component: ChannelPerformance, description: 'Compare booking channels effectiveness' },
  { id: 'review-sentiment', title: 'Review Sentiment', component: ReviewSentiment, description: 'Monitor sentiment from guest reviews' },
  { id: 'marketing-roi', title: 'Marketing ROI', component: MarketingROI, description: 'Calculate return on marketing investments' },
];

// Predefined dashboard templates
const dashboardTemplates = [
  { 
    id: 'revenue-focused', 
    name: 'Revenue Focus', 
    description: 'Focus on revenue metrics and performance',
    components: ['revenue-metrics', 'occupancy-chart', 'channel-performance', 'marketing-roi']
  },
  { 
    id: 'guest-experience', 
    name: 'Guest Experience', 
    description: 'Monitor guest satisfaction and experience metrics',
    components: ['review-sentiment', 'guest-demographics', 'occupancy-chart']
  },
  { 
    id: 'marketing-performance', 
    name: 'Marketing Performance', 
    description: 'Track marketing effectiveness and ROI',
    components: ['marketing-roi', 'channel-performance', 'review-sentiment']
  },
];

const Analytics = () => {
  const { toast } = useToast();
  const [activeComponents, setActiveComponents] = useState<string[]>(['occupancy-chart', 'revenue-metrics', 'guest-demographics']);
  const [dashboardName, setDashboardName] = useState('My Dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateDescription, setNewTemplateDescription] = useState('');
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Handle drag and drop reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(activeComponents);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setActiveComponents(items);
  };

  // Add component to dashboard
  const addComponent = (componentId: string) => {
    if (!activeComponents.includes(componentId)) {
      setActiveComponents([...activeComponents, componentId]);
      toast({
        title: "Component added",
        description: "The component has been added to your dashboard",
      });
    }
  };

  // Remove component from dashboard
  const removeComponent = (componentId: string) => {
    setActiveComponents(activeComponents.filter(id => id !== componentId));
    toast({
      title: "Component removed",
      description: "The component has been removed from your dashboard",
    });
  };

  // Save current layout as template
  const saveAsTemplate = () => {
    // In a real app, this would save to a database
    toast({
      title: "Template saved",
      description: `"${newTemplateName}" has been saved to your templates`,
    });
    setSaveDialogOpen(false);
  };

  // Load a predefined template
  const loadTemplate = (templateId: string) => {
    const template = dashboardTemplates.find(t => t.id === templateId);
    if (template) {
      setActiveComponents(template.components);
      setDashboardName(template.name);
      toast({
        title: "Template loaded",
        description: `"${template.name}" template has been loaded`,
      });
    }
    setTemplateDialogOpen(false);
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
          <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">
            {isEditing ? (
              <Input 
                value={dashboardName} 
                onChange={(e) => setDashboardName(e.target.value)}
                className="font-bold h-10 text-2xl md:text-3xl"
                onBlur={() => setIsEditing(false)}
                autoFocus
              />
            ) : (
              <span onClick={() => setIsEditing(true)} className="cursor-pointer hover:text-resort-600 transition-colors">
                {dashboardName}
              </span>
            )}
          </h1>
          <p className="text-resort-500">Customizable analytics for your hospitality business</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <LayoutGrid className="mr-1.5 h-4 w-4" /> Templates
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Load Dashboard Template</DialogTitle>
                <DialogDescription>
                  Choose a predefined template to start with
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 my-4">
                {dashboardTemplates.map((template) => (
                  <div 
                    key={template.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedTemplate === template.id ? 'border-primary bg-primary/5' : 'hover:border-primary/30'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setTemplateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => selectedTemplate && loadTemplate(selectedTemplate)}
                  disabled={!selectedTemplate}
                >
                  Load Template
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Save className="mr-1.5 h-4 w-4" /> Save Dashboard
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Save Dashboard Template</DialogTitle>
                <DialogDescription>
                  Save your current dashboard layout as a template for future use
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    className="col-span-3"
                    placeholder="My Custom Dashboard"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={newTemplateDescription}
                    onChange={(e) => setNewTemplateDescription(e.target.value)}
                    className="col-span-3"
                    placeholder="A custom dashboard for my hotel analytics"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveAsTemplate} disabled={!newTemplateName}>
                  Save Template
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Component Selector Panel */}
        <Card className="p-4 md:col-span-1">
          <h2 className="font-medium text-lg mb-4">Analytics Components</h2>
          <div className="space-y-3">
            {componentCatalog.map((component) => (
              <motion.div
                key={component.id}
                whileHover={{ scale: 1.02 }}
                className="p-3 border rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-sm">{component.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{component.description}</p>
                  </div>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => addComponent(component.id)}
                    className="h-7 w-7 rounded-full"
                    disabled={activeComponents.includes(component.id)}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Dashboard Display Area */}
        <div className="md:col-span-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="dashboard">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-6"
                >
                  {activeComponents.length === 0 ? (
                    <Card className="p-10 border-dashed flex flex-col items-center justify-center">
                      <p className="text-muted-foreground text-center mb-4">
                        Your dashboard is empty. Add components from the panel on the left.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => setTemplateDialogOpen(true)}
                      >
                        Load a Template
                      </Button>
                    </Card>
                  ) : (
                    activeComponents.map((componentId, index) => {
                      const componentInfo = componentCatalog.find(c => c.id === componentId);
                      if (!componentInfo) return null;
                      
                      const Component = componentInfo.component;
                      
                      return (
                        <Draggable key={componentId} draggableId={componentId} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <Card className="p-4">
                                <div className="flex justify-between items-center mb-4">
                                  <h3 className="font-medium">{componentInfo.title}</h3>
                                  <div 
                                    className="cursor-grab"
                                    {...provided.dragHandleProps}
                                  >
                                    <div className="flex space-x-1">
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 rounded-full"
                                        onClick={() => removeComponent(componentId)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 rounded-full"
                                      >
                                        <Settings className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                                <Component />
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      );
                    })
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;

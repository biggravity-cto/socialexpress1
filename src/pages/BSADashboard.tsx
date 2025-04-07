
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import BSAReportsTab from '@/components/bsa-dashboard/BSAReportsTab';
import BSAFilesTab from '@/components/bsa-dashboard/BSAFilesTab';
import BSADataSourcesTab from '@/components/bsa-dashboard/BSADataSourcesTab';
import BSASettingsTab from '@/components/bsa-dashboard/BSASettingsTab';
import BSAClientSelector from '@/components/bsa-dashboard/BSAClientSelector';
import BSAGenerateReportDialog from '@/components/bsa-dashboard/BSAGenerateReportDialog';

const BSADashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('reports');
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch clients on component mount
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data, error } = await supabase
          .from('bsa_clients')
          .select('*')
          .order('name');

        if (error) {
          throw error;
        }

        setClients(data || []);
        if (data && data.length > 0) {
          setSelectedClient(data[0]);
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
        toast({
          title: 'Error',
          description: 'Failed to load clients. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchClients();
    } else {
      setIsLoading(false);
    }
  }, [user, toast]);

  // Handle client change
  const handleClientChange = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    setSelectedClient(client);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">BSA Management Dashboard</h1>
          <p className="text-resort-500">Generate, manage and analyze brand sentiment reports</p>
        </div>

        <div className="flex items-center gap-3">
          <BSAClientSelector 
            clients={clients} 
            selectedClientId={selectedClient?.id} 
            onClientChange={handleClientChange}
            isLoading={isLoading}
          />
          <button
            onClick={() => setIsGenerateDialogOpen(true)} 
            disabled={!selectedClient || isLoading}
            className="bg-[#6ad4e0] hover:bg-[#1d9cc8] text-white py-2 px-4 rounded-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="font-medium">Generate Report</span>
          </button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="data-sources">Data Sources</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reports">
          <BSAReportsTab clientId={selectedClient?.id} />
        </TabsContent>
        
        <TabsContent value="files">
          <BSAFilesTab clientId={selectedClient?.id} />
        </TabsContent>
        
        <TabsContent value="data-sources">
          <BSADataSourcesTab clientId={selectedClient?.id} />
        </TabsContent>
        
        <TabsContent value="settings">
          <BSASettingsTab />
        </TabsContent>
      </Tabs>

      <BSAGenerateReportDialog 
        isOpen={isGenerateDialogOpen} 
        onOpenChange={setIsGenerateDialogOpen}
        client={selectedClient}
      />
    </motion.div>
  );
};

export default BSADashboard;


import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const BSAGenerateReportDialog = ({ isOpen, onOpenChange, client }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [files, setFiles] = useState([]);
  const [dataSources, setDataSources] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedDataSource, setSelectedDataSource] = useState('');
  const [settings, setSettings] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [quarter, setQuarter] = useState(
    Math.ceil((new Date().getMonth() + 1) / 3).toString()
  );
  const [reportTitle, setReportTitle] = useState('');
  const [dataContent, setDataContent] = useState('');
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [years] = useState(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => (currentYear - 2 + i).toString());
  });
  const [quarters] = useState(['1', '2', '3', '4']);

  useEffect(() => {
    if (isOpen && client) {
      // Reset form state
      setSelectedFiles([]);
      setSelectedDataSource('');
      setDataContent('');
      setReportTitle(`${client.name} BSA Report - Q${quarter} ${year}`);
      
      // Fetch user settings
      fetchUserSettings();
      
      // Fetch files and data sources
      fetchFiles();
      fetchDataSources();
    }
  }, [isOpen, client, year, quarter]);

  const fetchUserSettings = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('bsa_user_settings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      setSettings(data);
    } catch (error) {
      console.error('Error fetching user settings:', error);
    }
  };

  const fetchFiles = async () => {
    if (!client) return;
    
    try {
      const { data, error } = await supabase
        .from('bsa_files')
        .select('*')
        .eq('client_id', client.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const fetchDataSources = async () => {
    if (!client) return;
    
    try {
      const { data, error } = await supabase
        .from('bsa_data_sources')
        .select('*')
        .eq('client_id', client.id)
        .order('name');

      if (error) throw error;
      setDataSources(data || []);
    } catch (error) {
      console.error('Error fetching data sources:', error);
    }
  };

  const handleFileSelect = (fileId) => {
    setSelectedFiles((prev) => {
      if (prev.includes(fileId)) {
        return prev.filter(id => id !== fileId);
      } else {
        return [...prev, fileId];
      }
    });
  };

  const loadFileContents = async () => {
    if (selectedFiles.length === 0 && !selectedDataSource) {
      toast({
        title: 'Error',
        description: 'Please select at least one file or data source.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoadingData(true);
    try {
      let contentFromFiles = '';
      
      // Load selected files content
      for (const fileId of selectedFiles) {
        const file = files.find(f => f.id === fileId);
        if (file) {
          const { data, error } = await supabase.storage
            .from('bsa_files')
            .download(file.file_path);

          if (error) throw error;

          const text = await data.text();
          contentFromFiles += text + '\n\n';
        }
      }

      // Add data source content if selected
      if (selectedDataSource) {
        const source = dataSources.find(s => s.id === selectedDataSource);
        if (source && source.source_url) {
          contentFromFiles += `Data Source: ${source.name}\nURL: ${source.source_url}\n\n`;
        }
      }

      setDataContent(contentFromFiles);
      toast({
        title: 'Data loaded',
        description: 'File contents loaded successfully.',
      });
    } catch (error) {
      console.error('Error loading file contents:', error);
      toast({
        title: 'Error',
        description: 'Failed to load file contents. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  const generateReport = async () => {
    if (!client || !user) return;

    if (!dataContent) {
      toast({
        title: 'Error',
        description: 'Please load data from files or data sources first.',
        variant: 'destructive',
      });
      return;
    }

    if (!reportTitle.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a title for the report.',
        variant: 'destructive',
      });
      return;
    }

    // Check if we have an API key for the selected LLM
    const llmType = settings?.default_llm || 'openai';
    const apiKeyField = `${llmType}_api_key`;
    const apiKey = settings?.[apiKeyField];

    if (!apiKey) {
      toast({
        title: 'API Key Missing',
        description: `Please add your ${llmType.toUpperCase()} API key in the Settings tab.`,
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Call edge function to generate report
      const { data: reportData, error: functionError } = await supabase.functions.invoke('generate-bsa-report', {
        body: {
          dataSource: dataContent,
          clientName: client.name,
          quarter: parseInt(quarter),
          year: parseInt(year),
          llmType,
          llmApiKey: apiKey
        }
      });

      if (functionError) throw functionError;

      if (!reportData || reportData.error) {
        throw new Error(reportData?.error || 'Failed to generate report');
      }

      // Process the generated report
      const bsaScoreMatch = reportData.report.match(/BSA Score.*?(\d+\.?\d*)/i);
      const bsaScore = bsaScoreMatch ? parseFloat(bsaScoreMatch[1]) : null;

      // Save report to database
      const { error: saveError } = await supabase
        .from('bsa_reports')
        .insert({
          client_id: client.id,
          title: reportTitle,
          year: parseInt(year),
          quarter: parseInt(quarter),
          bsa_score: bsaScore,
          data: {
            report: reportData.report,
            files: selectedFiles,
            dataSources: selectedDataSource ? [selectedDataSource] : [],
            generatedAt: new Date().toISOString(),
            generatedBy: user.id,
            model: llmType
          },
          created_by: user.id
        });

      if (saveError) throw saveError;

      toast({
        title: 'Report generated',
        description: 'The BSA report has been successfully generated and saved.',
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate report. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Generate BSA Report</DialogTitle>
          <DialogDescription>
            Select files and data sources to generate a new BSA report for {client?.name}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="year">Year</Label>
              <Select
                value={year}
                onValueChange={setYear}
                disabled={isGenerating}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={y}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="quarter">Quarter</Label>
              <Select
                value={quarter}
                onValueChange={setQuarter}
                disabled={isGenerating}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select quarter" />
                </SelectTrigger>
                <SelectContent>
                  {quarters.map((q) => (
                    <SelectItem key={q} value={q}>Q{q}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="title">Report Title</Label>
            <Input
              id="title"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          <div className="space-y-2">
            <Label>Select Files</Label>
            <div className="max-h-[150px] overflow-y-auto border rounded-md p-2">
              {files.length === 0 ? (
                <p className="text-sm text-gray-500 py-2 text-center">No files available</p>
              ) : (
                files.map((file) => (
                  <div key={file.id} className="flex items-start gap-2 py-1">
                    <Checkbox
                      id={`file-${file.id}`}
                      checked={selectedFiles.includes(file.id)}
                      onCheckedChange={() => handleFileSelect(file.id)}
                      disabled={isGenerating || isLoadingData}
                    />
                    <Label
                      htmlFor={`file-${file.id}`}
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      {file.filename}
                      <span className="block text-xs text-gray-500">
                        Q{file.quarter} {file.year} | {(file.file_size / 1024).toFixed(2)} KB
                      </span>
                    </Label>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="data-source">Data Source (Optional)</Label>
            <Select
              value={selectedDataSource}
              onValueChange={setSelectedDataSource}
              disabled={isGenerating || isLoadingData}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a data source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">None</SelectItem>
                {dataSources.map((source) => (
                  <SelectItem key={source.id} value={source.id}>
                    {source.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="data-preview">Data Content</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={loadFileContents}
                disabled={isLoadingData || isGenerating}
              >
                {isLoadingData ? 'Loading...' : 'Load Selected Data'}
              </Button>
            </div>
            <Textarea
              id="data-preview"
              value={dataContent}
              onChange={(e) => setDataContent(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
              placeholder="Load data from selected files or enter manually..."
              disabled={isGenerating}
            />
          </div>
        </div>

        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isGenerating}
          >
            Cancel
          </Button>
          <Button 
            type="button"
            onClick={generateReport}
            disabled={isGenerating || !dataContent}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> 
                Generating...
              </>
            ) : (
              'Generate Report'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BSAGenerateReportDialog;

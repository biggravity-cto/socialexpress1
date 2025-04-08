
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { PlusCircle, Database, Link, Trash2, Globe } from 'lucide-react';
import { bsaDataSources } from '@/utils/supabaseHelpers';
import { BSADataSource } from '@/types/database.types';

interface BSADataSourcesTabProps {
  clientId: string | undefined;
}

const BSADataSourcesTab: React.FC<BSADataSourcesTabProps> = ({ clientId }) => {
  const { toast } = useToast();
  const [dataSources, setDataSources] = useState<BSADataSource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newSource, setNewSource] = useState({ name: '', source_type: 'file', source_url: '' });
  const [isAddingSource, setIsAddingSource] = useState(false);

  useEffect(() => {
    const fetchDataSources = async () => {
      if (!clientId) {
        setDataSources([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await bsaDataSources.getByClientId(clientId);

        if (error) throw error;
        setDataSources(data || []);
      } catch (error) {
        console.error('Error fetching data sources:', error);
        toast({
          title: 'Error',
          description: 'Failed to load data sources. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataSources();
  }, [clientId, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSource((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setNewSource((prev) => ({ ...prev, source_type: value }));
  };

  const handleAddSource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) return;

    if (!newSource.name.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a name for the data source.',
        variant: 'destructive',
      });
      return;
    }

    setIsAddingSource(true);
    try {
      const { data, error } = await bsaDataSources.add({
        client_id: clientId,
        name: newSource.name,
        source_type: newSource.source_type,
        source_url: newSource.source_url || null,
      });

      if (error) throw error;

      if (data && data.length > 0) {
        setDataSources([...dataSources, data[0]]);
      }
      
      setNewSource({ name: '', source_type: 'file', source_url: '' });
      toast({
        title: 'Data source added',
        description: 'The data source has been successfully added.',
      });
    } catch (error: any) {
      console.error('Error adding data source:', error);
      toast({
        title: 'Error',
        description: 'Failed to add data source. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAddingSource(false);
    }
  };

  const handleDeleteSource = async (sourceId: string) => {
    try {
      const { error } = await bsaDataSources.delete(sourceId);

      if (error) throw error;

      setDataSources(dataSources.filter(source => source.id !== sourceId));
      toast({
        title: 'Data source deleted',
        description: 'The data source has been successfully deleted.',
      });
    } catch (error: any) {
      console.error('Error deleting data source:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete data source. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (!clientId) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-10">
            <p className="text-gray-500">Please select a client to manage data sources</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getSourceTypeIcon = (type: string) => {
    switch (type) {
      case 'file':
        return <Database className="h-4 w-4" />;
      case 'api':
        return <Link className="h-4 w-4" />;
      case 'web':
        return <Globe className="h-4 w-4" />;
      default:
        return <Database className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Add New Data Source</h3>
          <form onSubmit={handleAddSource} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={newSource.name}
                onChange={handleInputChange}
                placeholder="Enter data source name"
                disabled={isAddingSource}
                required
              />
            </div>
            <div>
              <Label htmlFor="source_type">Source Type</Label>
              <Select
                value={newSource.source_type}
                onValueChange={handleTypeChange}
                disabled={isAddingSource}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="file">File</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                  <SelectItem value="web">Web</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="source_url">URL (optional)</Label>
              <div className="flex gap-2">
                <Input
                  id="source_url"
                  name="source_url"
                  value={newSource.source_url}
                  onChange={handleInputChange}
                  placeholder="Enter source URL (if applicable)"
                  disabled={isAddingSource}
                />
                <Button 
                  type="submit"
                  disabled={isAddingSource}
                >
                  {isAddingSource ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> 
                      Adding...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="h-4 w-4 mr-2" /> Add
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Data Sources</h3>
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6ad4e0]"></div>
            </div>
          ) : dataSources.length === 0 ? (
            <div className="text-center py-10">
              <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No data sources found</h3>
              <p className="text-gray-500">Add data sources to get started.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataSources.map((source) => (
                  <TableRow key={source.id}>
                    <TableCell>{getSourceTypeIcon(source.source_type)}</TableCell>
                    <TableCell className="font-medium">{source.name}</TableCell>
                    <TableCell>
                      {source.source_url ? (
                        <a 
                          href={source.source_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <span className="truncate max-w-[200px]">{source.source_url}</span>
                          <Globe className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell>{new Date(source.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => handleDeleteSource(source.id)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        title="Delete Source"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BSADataSourcesTab;

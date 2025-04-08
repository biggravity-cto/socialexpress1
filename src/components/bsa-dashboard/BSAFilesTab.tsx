
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { FileUp, FilePlus, FileText, Trash2, Download } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { bsaFiles } from '@/utils/supabaseHelpers';
import { BSAFile } from '@/types/database.types';

interface BSAFilesTabProps {
  clientId: string | undefined;
}

const BSAFilesTab: React.FC<BSAFilesTabProps> = ({ clientId }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [files, setFiles] = useState<BSAFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedQuarter, setSelectedQuarter] = useState(
    Math.ceil((new Date().getMonth() + 1) / 3).toString()
  );
  const [years] = useState(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => (currentYear - 2 + i).toString());
  });
  const [quarters] = useState(['1', '2', '3', '4']);

  const fetchFiles = useCallback(async () => {
    if (!clientId) {
      setFiles([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await bsaFiles.getByClientId(clientId);

      if (error) throw error;
      setFiles(data || []);
    } catch (error) {
      console.error('Error fetching files:', error);
      toast({
        title: 'Error',
        description: 'Failed to load files. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [clientId, toast]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !clientId || !user) return;

    setIsUploading(true);
    try {
      // 1. Upload file to Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${clientId}/${selectedYear}_Q${selectedQuarter}/${fileName}`;

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('bsa_files')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // 2. Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('bsa_files')
        .getPublicUrl(filePath);

      // 3. Create a database record
      const { data, error } = await bsaFiles.upload({
        client_id: clientId,
        filename: file.name,
        file_path: filePath,
        file_type: file.type,
        file_size: file.size,
        year: parseInt(selectedYear),
        quarter: parseInt(selectedQuarter),
        created_by: user.id,
      });

      if (error) throw error;

      toast({
        title: 'File uploaded',
        description: 'The file has been successfully uploaded.',
      });

      // Refresh the files list
      fetchFiles();
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Upload failed',
        description: error.message || 'Failed to upload the file. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const handleDeleteFile = async (fileId: string, filePath: string) => {
    try {
      const { error } = await bsaFiles.delete(fileId, filePath);

      if (error) throw error;

      // 3. Update UI
      setFiles(files.filter(file => file.id !== fileId));
      toast({
        title: 'File deleted',
        description: 'The file has been successfully deleted.',
      });
    } catch (error: any) {
      console.error('Error deleting file:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete the file. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const downloadFile = async (file: BSAFile) => {
    try {
      const { data, error } = await supabase.storage
        .from('bsa_files')
        .download(file.file_path);

      if (error) throw error;

      // Create a download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Download started',
        description: 'The file is being downloaded.',
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: 'Error',
        description: 'Failed to download the file. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getFileTypeIcon = (fileType: string) => {
    if (fileType.includes('text')) return <FileText className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  if (!clientId) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-10">
            <p className="text-gray-500">Please select a client to manage files</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Upload New File</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label htmlFor="year">Year</Label>
              <Select
                value={selectedYear}
                onValueChange={setSelectedYear}
                disabled={isUploading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="quarter">Quarter</Label>
              <Select
                value={selectedQuarter}
                onValueChange={setSelectedQuarter}
                disabled={isUploading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select quarter" />
                </SelectTrigger>
                <SelectContent>
                  {quarters.map((quarter) => (
                    <SelectItem key={quarter} value={quarter}>Q{quarter}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="relative">
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".txt,.csv,.json"
                  disabled={isUploading}
                />
                <Button 
                  type="button"
                  className="w-full"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> 
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FileUp className="h-4 w-4 mr-2" /> Upload File
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Files</h3>
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6ad4e0]"></div>
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-10">
              <FilePlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No files found</h3>
              <p className="text-gray-500">Upload files to get started.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Filename</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Quarter</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>{getFileTypeIcon(file.file_type)}</TableCell>
                    <TableCell className="font-medium">{file.filename}</TableCell>
                    <TableCell>{(file.file_size / 1024).toFixed(2)} KB</TableCell>
                    <TableCell>Q{file.quarter}</TableCell>
                    <TableCell>{file.year}</TableCell>
                    <TableCell>{new Date(file.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => downloadFile(file)}
                          className="p-2 hover:bg-gray-100 rounded-full"
                          title="Download File"
                        >
                          <Download className="h-4 w-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteFile(file.id, file.file_path)}
                          className="p-2 hover:bg-gray-100 rounded-full"
                          title="Delete File"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
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

export default BSAFilesTab;

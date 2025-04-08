
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Check, Download, Eye, FileText, Trash2 } from 'lucide-react';
import BSAReportViewDialog from './BSAReportViewDialog';
import BSAReportDeleteConfirmDialog from './BSAReportDeleteConfirmDialog';
import { bsaReports } from '@/utils/supabaseHelpers';
import { BSAReport } from '@/types/database.types';

interface BSAReportsTabProps {
  clientId: string | undefined;
}

const BSAReportsTab: React.FC<BSAReportsTabProps> = ({ clientId }) => {
  const { toast } = useToast();
  const [reports, setReports] = useState<BSAReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeReport, setActiveReport] = useState<BSAReport | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedReportForDelete, setSelectedReportForDelete] = useState<BSAReport | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      if (!clientId) {
        setReports([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await bsaReports.getByClientId(clientId);

        if (error) throw error;
        setReports(data || []);
      } catch (error) {
        console.error('Error fetching reports:', error);
        toast({
          title: 'Error',
          description: 'Failed to load reports. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, [clientId, toast]);

  const handleViewReport = (report: BSAReport) => {
    setActiveReport(report);
    setIsViewDialogOpen(true);
  };

  const handleDeleteReport = (report: BSAReport) => {
    setSelectedReportForDelete(report);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteReport = async () => {
    if (!selectedReportForDelete) return;
    
    try {
      const { error } = await bsaReports.delete(selectedReportForDelete.id);

      if (error) throw error;

      setReports(reports.filter(r => r.id !== selectedReportForDelete.id));
      toast({
        title: 'Report deleted',
        description: 'The report has been successfully deleted.',
      });
    } catch (error: any) {
      console.error('Error deleting report:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete the report. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedReportForDelete(null);
    }
  };

  const downloadReport = (report: BSAReport, format = 'json') => {
    try {
      let content;
      let filename;
      
      if (format === 'json') {
        content = JSON.stringify(report.data, null, 2);
        filename = `${report.title.replace(/\s+/g, '_')}_Q${report.quarter}_${report.year}.json`;
      } else {
        // Convert JSON to plain text format
        const reportData = report.data as { report?: string };
        content = `BSA Report: ${report.title}\n`;
        content += `Quarter: Q${report.quarter} ${report.year}\n`;
        content += `BSA Score: ${report.bsa_score}\n\n`;
        
        // Add report content
        if (reportData.report) content += reportData.report;
        
        filename = `${report.title.replace(/\s+/g, '_')}_Q${report.quarter}_${report.year}.txt`;
      }
      
      // Create download link
      const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Download started',
        description: `The ${format.toUpperCase()} file is being downloaded.`,
      });
    } catch (error) {
      console.error(`Error downloading report as ${format}:`, error);
      toast({
        title: 'Error',
        description: `Failed to download the report as ${format.toUpperCase()}. Please try again.`,
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6ad4e0]"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!clientId) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-10">
            <p className="text-gray-500">Please select a client to view reports</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (reports.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-10">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No reports found</h3>
            <p className="text-gray-500">There are no reports for this client yet.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Quarter</TableHead>
                <TableHead>Year</TableHead>
                <TableHead className="text-center">BSA Score</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.title}</TableCell>
                  <TableCell>Q{report.quarter}</TableCell>
                  <TableCell>{report.year}</TableCell>
                  <TableCell className="text-center">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {report.bsa_score || 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(report.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleViewReport(report)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        title="View Report"
                      >
                        <Eye className="h-4 w-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => downloadReport(report, 'json')}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        title="Download as JSON"
                      >
                        <Download className="h-4 w-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteReport(report)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        title="Delete Report"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <BSAReportViewDialog
        isOpen={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        report={activeReport}
        onDownloadJson={() => activeReport && downloadReport(activeReport, 'json')}
        onDownloadTxt={() => activeReport && downloadReport(activeReport, 'txt')}
      />

      <BSAReportDeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDeleteReport}
        reportTitle={selectedReportForDelete?.title}
      />
    </>
  );
};

export default BSAReportsTab;

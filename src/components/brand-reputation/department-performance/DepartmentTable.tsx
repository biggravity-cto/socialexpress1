
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronRight } from 'lucide-react';
import { departmentData } from './departmentData';
import { getTrendBadge, getPriorityBadge } from './utils';
import DepartmentDetailsPanel from './DepartmentDetailsPanel';

const DepartmentTable = () => {
  const [expandedDept, setExpandedDept] = useState<string | null>(null);

  const toggleDept = (deptName: string) => {
    if (expandedDept === deptName) {
      setExpandedDept(null);
    } else {
      setExpandedDept(deptName);
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-[#e9f7f9] shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-[#a3f7bf]/20 to-[#6ad4e0]/20">
            <TableHead className="font-semibold text-[#333]">Department</TableHead>
            <TableHead className="text-right font-semibold text-[#333]">Q1 2025</TableHead>
            <TableHead className="text-right font-semibold text-[#333]">Q4 2024</TableHead>
            <TableHead className="text-right font-semibold text-[#333]">% Change</TableHead>
            <TableHead className="font-semibold text-[#333]">Trend</TableHead>
            <TableHead className="font-semibold text-[#333]">Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departmentData.map((dept) => (
            <React.Fragment key={dept.name}>
              <TableRow 
                className="cursor-pointer hover:bg-[#f7fcfd] transition-colors"
                onClick={() => toggleDept(dept.name)}
              >
                <TableCell className="font-medium flex items-center gap-1">
                  {expandedDept === dept.name ? 
                    <ChevronDown className="h-4 w-4 text-[#6ad4e0]" /> : 
                    <ChevronRight className="h-4 w-4 text-[#6ad4e0]" />}
                  {dept.name}
                </TableCell>
                <TableCell className="text-right font-medium text-[#333]">{dept.q1Negative}%</TableCell>
                <TableCell className="text-right text-[#555]">{dept.q4Negative}%</TableCell>
                <TableCell 
                  className={`text-right font-medium ${
                    dept.diffPercent > 0 ? 'text-[#ff8c8c]' : 
                    dept.diffPercent < 0 ? 'text-[#228b22]' : 'text-gray-600'
                  }`}
                >
                  {dept.diffPercent > 0 ? '+' : ''}{dept.diffPercent}%
                </TableCell>
                <TableCell>{getTrendBadge(dept.trend)}</TableCell>
                <TableCell>{getPriorityBadge(dept.priority)}</TableCell>
              </TableRow>
              {expandedDept === dept.name && (
                <TableRow className="bg-[#f7fcfd]">
                  <TableCell colSpan={6} className="p-4">
                    <DepartmentDetailsPanel department={dept} />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DepartmentTable;


import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import DepartmentChart from './department-performance/DepartmentChart';
import DepartmentTable from './department-performance/DepartmentTable';
import MethodologyNote from './department-performance/MethodologyNote';

const DepartmentPerformance = () => {
  return (
    <div className="space-y-6">
      <Card className="border-[#6ad4e0]/30">
        <CardHeader className="bg-gradient-to-r from-[#a3f7bf]/10 to-[#6ad4e0]/10">
          <CardTitle className="text-[#333]">Department & Category Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Interactive vertical chart */}
          <div className="mb-8">
            <DepartmentChart />
          </div>

          {/* Responsive table with department data */}
          <DepartmentTable />
        </CardContent>
      </Card>
      
      <MethodologyNote />
    </div>
  );
};

export default DepartmentPerformance;

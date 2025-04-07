
import React from 'react';
import { DepartmentDataType } from './departmentData';

type DepartmentDetailsPanelProps = {
  department: DepartmentDataType;
};

const DepartmentDetailsPanel = ({ department }: DepartmentDetailsPanelProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-[#333] mb-1">Key Issues</h4>
        <p className="text-sm text-[#555]">{department.keyThemes}</p>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-[#333] mb-1">Impact</h4>
        <p className="text-sm text-[#555]">{department.impact}</p>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-[#333] mb-2">Recommendations</h4>
        <ul className="list-disc pl-5 text-sm text-[#555] space-y-1">
          {department.recommendations.map((rec, idx) => (
            <li key={idx}>{rec}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-medium text-[#333] mb-2">Trend Visualization</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-[#555] w-20">Q4 2024</span>
            <div className="flex-grow h-8 bg-[#f0f0f0] rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-[#91e6c8]" 
                style={{ width: `${Math.min(department.q4Negative * 10, 100)}%` }}
              ></div>
            </div>
            <span className="text-xs font-medium text-[#555] w-12">{department.q4Negative}%</span>
          </div>
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-[#555] w-20">Q1 2025</span>
            <div className="flex-grow h-8 bg-[#f0f0f0] rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full" 
                style={{ 
                  width: `${Math.min(department.q1Negative * 10, 100)}%`,
                  backgroundColor: department.color 
                }}
              ></div>
            </div>
            <span className="text-xs font-medium text-[#555] w-12">{department.q1Negative}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetailsPanel;

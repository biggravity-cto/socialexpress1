
import React from 'react';
import { Info } from 'lucide-react';

const MethodologyNote = () => {
  return (
    <div className="bg-[#f7fcfd] border border-[#6ad4e0]/30 rounded-md p-4 flex items-start gap-3">
      <Info className="h-5 w-5 text-[#6ad4e0] mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-[#333] text-sm">
          <span className="font-medium">Methodology Note:</span> This analysis examines guest sentiment data collected from 43 unique blog posts primarily dated between January 1, 2025, and March 31, 2025, sourced from Naver.com. Some posts dated April 1 were included in the source data but excluded from this Q1 analysis where possible based on date stamps. Quantitative estimates (percentages, BSA score) are approximations based on qualitative review.
        </p>
      </div>
    </div>
  );
};

export default MethodologyNote;


import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface EmptyApprovalStateProps {
  type: 'approved' | 'declined';
}

const EmptyApprovalState: React.FC<EmptyApprovalStateProps> = ({ type }) => {
  const icon = type === 'approved' ? (
    <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
  ) : (
    <XCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
  );

  const title = type === 'approved' ? 'No Approved Content' : 'No Declined Content';
  const description = type === 'approved'
    ? 'All approved content will appear here. Start by reviewing and approving pending content.'
    : 'Content that doesn\'t meet your standards will appear here after being declined.';

  return (
    <div className="text-center py-10">
      {icon}
      <h3 className="text-lg font-medium text-resort-800 mb-2">{title}</h3>
      <p className="text-resort-500 max-w-md mx-auto">
        {description}
      </p>
    </div>
  );
};

export default EmptyApprovalState;

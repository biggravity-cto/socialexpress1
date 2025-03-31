
import React from 'react';
import { ApprovalItemProps } from './ApprovalItem';
import ApprovalItem from './ApprovalItem';
import EmptyApprovalState from './EmptyApprovalState';

interface ApprovalsListProps {
  items: ApprovalItemProps[];
  status: 'pending' | 'approved' | 'declined' | 'all';
}

const ApprovalsList: React.FC<ApprovalsListProps> = ({ items, status }) => {
  // Filter items based on status, except when "all" is selected
  const filteredItems = status === 'all' 
    ? items 
    : items.filter(item => item.status === status);

  if (filteredItems.length === 0) {
    if (status === 'approved') {
      return <EmptyApprovalState type="approved" />;
    }
    if (status === 'declined') {
      return <EmptyApprovalState type="declined" />;
    }
    // Return a generic empty state for pending or all
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-resort-800 mb-2">No Items Found</h3>
        <p className="text-resort-500 max-w-md mx-auto">
          There are currently no items to display in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredItems.map((item) => (
        <ApprovalItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ApprovalsList;

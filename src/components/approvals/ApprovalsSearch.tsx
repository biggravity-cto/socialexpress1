
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

interface ApprovalsSearchProps {
  onSearch: (value: string) => void;
}

const ApprovalsSearch: React.FC<ApprovalsSearchProps> = ({ onSearch }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <Card className="p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            placeholder="Search approvals..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500"
            onChange={handleSearchChange}
          />
        </div>
        <Button variant="outline" className="justify-center sm:w-auto">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>
    </Card>
  );
};

export default ApprovalsSearch;

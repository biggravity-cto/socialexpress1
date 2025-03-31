
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Grid, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContentSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  selectedItems: number[];
  setSelectedItems: (items: number[]) => void;
  handleBulkDelete: () => void;
  filteredItems: any[];
  children?: React.ReactNode;
}

const ContentSearch: React.FC<ContentSearchProps> = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  selectedItems,
  setSelectedItems,
  handleBulkDelete,
  filteredItems,
  children
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              className="pl-9"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Viewed</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex rounded-md shadow-sm">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                className={`rounded-r-none ${viewMode === 'grid' ? '' : ''}`}
                onClick={() => setViewMode('grid')}
                size="icon"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                className={`rounded-l-none ${viewMode === 'list' ? '' : ''}`}
                onClick={() => setViewMode('list')}
                size="icon"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bulk Actions Bar - passed as children */}
        {children}
      </CardContent>
    </Card>
  );
};

export default ContentSearch;

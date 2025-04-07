
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface BSAClientSelectorProps {
  clients: any[];
  selectedClientId: string | null;
  onClientChange: (clientId: string) => void;
  isLoading: boolean;
}

const BSAClientSelector = ({ 
  clients, 
  selectedClientId, 
  onClientChange,
  isLoading 
}: BSAClientSelectorProps) => {
  return (
    <Select
      value={selectedClientId || undefined}
      onValueChange={onClientChange}
      disabled={isLoading || clients.length === 0}
    >
      <SelectTrigger className="min-w-[200px]">
        <SelectValue placeholder="Select a client" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Clients</SelectLabel>
          {clients.map((client) => (
            <SelectItem key={client.id} value={client.id}>
              {client.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default BSAClientSelector;

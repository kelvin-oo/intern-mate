"use client";

import { useInternshipStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ApplicationStatus } from '@prisma/client';

export default function ApplicationsFilters() {
  const { filters, setFilters } = useInternshipStore();

  const handleStatusChange = (status) => {
    setFilters({
      ...filters,
      status: status,
    });
  };

  const clearFilters = () => {
    setFilters({
      status: null,
      search: '',
    });
  };

  return (
    <div className="flex items-center gap-4">
      <Select
        value={filters.status || "ALL"}
        onValueChange={(value) =>
          handleStatusChange(value)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Statuses</SelectItem>
          <SelectItem value="NOT_STARTED">Not Started</SelectItem>
          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
          <SelectItem value="APPLIED">Applied</SelectItem>
          <SelectItem value="ACCEPTED">Accepted</SelectItem>
          <SelectItem value="REJECTED">Rejected</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );
}
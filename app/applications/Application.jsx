"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ApplicationCard from '../components/applications/card';
import { useMediaQuery } from '../hooks/use-media-query';
import { Search, SlidersHorizontal, Plus } from 'lucide-react';
import { useProfileStore } from '@/store';
import { currentClientUser } from '@/helpers/current-client-user';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data
const mockApplications = [
  {
    id: '1',
    companyName: 'Tech Giants Inc.',
    location: 'San Francisco, CA',
    deadline: '2024-05-05',
    applicationLink: 'https://example.com/apply',
    status: 'not_applied',
    description: 'Software Engineer position focusing on full-stack development',
    salary: '$120,000 - $150,000'
  },
  {
    id: '2',
    companyName: 'Startup Dreams',
    location: 'Remote',
    deadline: '2024-05-05',
    applicationLink: 'https://example.com/apply2',
    status: 'in_progress',
    description: 'Frontend Developer role with React expertise',
    salary: '$90,000 - $120,000'
  },
  // Add more mock data as needed
];

export default function Application({ user }) {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const sessionuser = currentClientUser()
  
  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });


  const name = useProfileStore((state) => state.name);
   
  const { setCredentials } = useProfileStore();
  if (user && !name) {
    setCredentials(
      user.name,
      user.email,
      user.image
    );
  }
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Applications</h1>
          <Button 
                  variant="default"
                  // onClick={() => setIsOpen(false)}
                  className="w-full ml-4 flex items-center justify-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                 <Link href="/applications/new">Submit Internship</Link>
                </Button>
        </div>
        
        {/* Search and Filter Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 md:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search companies or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Filter applications by status
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Applications</SelectItem>
                      <SelectItem value="not_applied">Not Applied</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="applied">Applied</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications</SelectItem>
                <SelectItem value="not_applied">Not Applied</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* <h2>{sessionuser?.name || name}</h2> */}

      {/* Applications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredApplications.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </div>

      {/* Empty State */}
      {filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No applications found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
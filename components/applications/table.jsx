"use client";

import { useInternshipStore } from '@/lib/store';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ExternalLink, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ApplicationStatus } from '@prisma/client';

const statusColors = {
  NOT_STARTED: 'bg-gray-500',
  IN_PROGRESS: 'bg-yellow-500',
  APPLIED: 'bg-green-500',
  REJECTED: 'bg-red-500',
  ACCEPTED: 'bg-blue-500',
};



export default function ApplicationsTable({ searchQuery }) {
  const { applications, internships, filters, updateApplication } = useInternshipStore();

  const filteredApplications = applications
    .filter((app) => {
      const internship = internships.find((i) => i.id === app.internshipId);
      if (!internship) return false;

      const matchesSearch = searchQuery
        ? internship.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          internship.position.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchesStatus = filters.status ? app.status === filters.status : true;

      return matchesSearch && matchesStatus;
    })
    .map((app) => ({
      ...app,
      internship: internships.find((i) => i.id === app.internshipId),
    }));

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredApplications.map((app) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium">
                {app.internship?.companyName}
              </TableCell>
              <TableCell>{app.internship?.position}</TableCell>
              <TableCell>
                {app.internship?.deadline &&
                  format(app.internship.deadline, 'MMM d, yyyy')}
              </TableCell>
              <TableCell>
                <Badge className={statusColors[app.status]}>{app.status}</Badge>
              </TableCell>
              <TableCell>{format(app.updatedAt, 'MMM d, yyyy')}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    asChild
                  >
                    <a
                      href={app.internship?.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => updateApplication(app.id, 'NOT_STARTED')}
                      >
                        Mark as Not Started
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => updateApplication(app.id, 'IN_PROGRESS')}
                      >
                        Mark as In Progress
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => updateApplication(app.id, 'APPLIED')}
                      >
                        Mark as Applied
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => updateApplication(app.id, 'ACCEPTED')}
                      >
                        Mark as Accepted
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => updateApplication(app.id, 'REJECTED')}
                      >
                        Mark as Rejected
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
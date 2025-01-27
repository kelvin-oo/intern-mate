"use state"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import markApplied from "@/actions/intership";
import { Checkbox } from "@/components/ui/checkbox";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Briefcase, Calendar, Globe, ExternalLink } from 'lucide-react';
import Link from "next/link";

function getStatusColor(status) {
  switch (status) {
    case 'OPEN': return 'bg-green-500';
    case 'CLOSED': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
}

const queryClient = new QueryClient();

export default function ApplicationCard({ internship, onMarkApplied }) {
  const queryClient = useQueryClient();

  const { mutateAsync: markAsApplied } = useMutation({
    mutationFn: async (internshipId) => {
      await markApplied(internshipId); // Call your API function here
    },
    onSuccess: () => {
      // Optionally invalidate queries if necessary
      queryClient.invalidateQueries('internships');
    }
  });

  const handleMarkAsRead = async (internshipId, currentStatus) => {
    // Optimistically update the UI
    const newStatus = !currentStatus;

    // Update local state immediately (optimistic update)
    onMarkApplied(internshipId, newStatus);

    try {
      // Then execute the mutation
      await markAsApplied(internshipId);

      // If successful, no further action needed
    } catch (error) {
      // Handle error case and revert UI state if necessary
      onMarkApplied(internshipId, currentStatus); // Revert back to the previous state
    }
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-2">
        <div>
          <CardTitle className="font-bold text-xl">{internship.companyName}</CardTitle>
          <CardDescription>
            <Badge className={`mt-1 ${getStatusColor(internship.status)} text-white`}>
              {internship.status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Badge>
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`applied-${internship.id}`}
            onCheckedChange={(e) => handleMarkAsRead(internship.id, internship.isApplied)}
            checked={internship.isApplied}
          />
          <label
            htmlFor={`applied-${internship.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Mark as Applied
          </label>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
          <div className="flex-grow">
            <span className="font-medium text-foreground">Deadline: </span>
            <span>{internship.deadline ? internship.deadline : 'N/A'}</span>
          </div>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
          <div className="flex-grow">
            <span className="font-medium text-foreground">Position: </span>
            <span>Intern</span>
          </div>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Globe className="h-4 w-4 mr-2 flex-shrink-0" />
          <a
            href={internship.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline truncate flex-grow"
          >
            Application Link
          </a>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="w-full"
          >
            <Link
              href={internship.companyWebsite ? internship.companyWebsite : 'https://panoceanoilnigeria.com/careers/'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-1"
            >
              <span>Visit Website</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/internships/${internship.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

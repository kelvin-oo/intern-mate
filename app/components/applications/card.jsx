import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Globe, MapPin } from "lucide-react";
import Link from "next/link";

// interface Application {
//   id: string;
//   companyName: string;
//   location: string;
//   deadline: string;
//   applicationLink: string;
//   status: string;
//   description: string;
//   salary: string;
// }

// interface ApplicationCardProps {
//   application: Application;
// }

export default function ApplicationCard({ application }) {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-bold text-lg">
            {application.companyName}
          </span>
          <Select defaultValue={application.status}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not_applied">Not Applied</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="applied">Applied</SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{application.location}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <div>
            <span className="font-medium text-foreground">Deadline: </span>
            <span>{new Date(application.deadline).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Globe className="h-4 w-4 mr-2" />
          <a
            href={application.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline truncate"
          >
            Application Link
          </a>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button asChild className="w-full">
          <Link href={`/applications/${application.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 
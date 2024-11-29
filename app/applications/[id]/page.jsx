"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Badge } from "@/components/ui/badge";
import { Calendar, Globe, MapPin, Building2, GraduationCap } from "lucide-react";
import Link from 'next/link';

// Mock data for demonstration
const applicationData = {
  id: "1",
  companyName: "Tech Giants Inc.",
  position: "Software Engineer",
  location: "San Francisco, CA",
  applicationLink: "https://example.com/apply",
  deadline: "2024-05-05",
  description: "We are seeking a talented Software Engineer to join our dynamic team. You will be responsible for developing and maintaining high-quality software solutions that contribute to our core products.",
  requirements: [
    "Bachelor's degree in Computer Science or related field",
    "3+ years of experience with React and TypeScript",
    "Strong problem-solving abilities",
    "Excellent communication skills",
    "Experience with cloud platforms (AWS/Azure)",
  ],
  status: "in_progress",
};

 function ApplicationPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Button variant="outline" asChild>
          <Link href="/applications">← Back to Applications</Link>
        </Button>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Main information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {applicationData.position}
                  </CardTitle>
                  <CardDescription className="flex items-center mt-2">
                    <Building2 className="h-4 w-4 mr-2" />
                    {applicationData.companyName}
                  </CardDescription>
                </div>
                <Select defaultValue={applicationData.status}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not_applied">Not Applied</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{applicationData.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <div>
                    <span className="font-medium text-foreground">Deadline: </span>
                    <span>{applicationData.deadline}</span>
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Globe className="h-4 w-4 mr-2" />
                  <a
                    href={applicationData.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Application Link
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="text-muted-foreground">
                  {applicationData.description}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {applicationData.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Additional information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <Badge variant="outline">Apr 15, 2024</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Updated</span>
                  <Badge variant="outline">Apr 20, 2024</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Deadline</span>
                  <Badge variant="outline">May 5, 2024</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" asChild>
                <a
                  href={applicationData.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply Now
                </a>
              </Button>
              <Button variant="outline" className="w-full">
                Mark as Applied
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 

export default ApplicationPage;

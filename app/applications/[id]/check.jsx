"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, Calendar, Globe, Grid, Layout } from "lucide-react";
import Link from "next/link";

function getStatusColor(status) {
  switch (status) {
    case "OPEN":
      return "bg-green-500";
    case "CLOSED":
      return "bg-red-500";
    case "UPCOMING":
      return "bg-yellow-500";
    default:
      return "bg-blue-500";
  }
}

// Mock data for demonstration
const mockApplications = [
  {
    id: "1",
    companyName: "Tech Giants Inc.",
    status: "OPEN",
    position: "Software Engineer",
    location: "San Francisco, CA",
    applicationLink: "https://example.com/apply",
    deadline: "2024-05-05",
    description:
      "We are seeking a talented Software Engineer to join our dynamic team. You will be responsible for developing and maintaining high-quality software solutions that contribute to our core products.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience with React and TypeScript",
      "Strong problem-solving abilities",
      "Excellent communication skills",
      "Experience with cloud platforms (AWS/Azure)",
    ],
  },
  {
    id: "2",
    companyName: "DataCorp Solutions",
    status: "CLOSED",
    position: "Data Analyst Intern",
    location: "New York, NY",
    applicationLink: "https://example.com/apply",
    deadline: null,
    description:
      "As a Data Analyst Intern, you will work closely with our team to analyze large datasets, generate actionable insights, and create impactful reports for stakeholders.",
    requirements: [
      "Proficiency in SQL and Excel",
      "Experience with BI tools like Power BI or Tableau",
      "Strong analytical and problem-solving skills",
      "Excellent written and verbal communication skills",
    ],
  },
];

export default function ApplicationsPage() {
  const [viewMode, setViewMode] = useState("detail"); // Default is detail view
  const [currentIndex, setCurrentIndex] = useState(0); // For navigating in detail view

  const currentApplication = mockApplications[currentIndex];

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Toggle Buttons */}
      <div className="flex justify-end mb-4">
        <Button
          variant={viewMode === "card" ? "solid" : "outline"}
          onClick={() => setViewMode("card")}
          className="mr-2"
        >
          <Grid className="mr-2 h-4 w-4" />
          Card View
        </Button>
        <Button
          variant={viewMode === "detail" ? "solid" : "outline"}
          onClick={() => setViewMode("detail")}
        >
          <Layout className="mr-2 h-4 w-4" />
          Detail View
        </Button>
      </div>

      {/* Conditional Rendering */}
      {viewMode === "detail" ? (
        <div className="space-y-6">
          {/* Detail View */}
          <div className="flex items-center justify-between">
            <Button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + mockApplications.length) % mockApplications.length)}
              variant="outline"
              className="flex items-center"
            >
              ← Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {mockApplications.length}
            </span>
            <Button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % mockApplications.length)}
              variant="outline"
              className="flex items-center"
            >
              Next →
            </Button>
          </div>
          <DetailView application={currentApplication} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card View */}
          {mockApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onMarkApplied={(id, isChecked) =>
                console.log(`Marked ${id} as ${isChecked ? "Applied" : "Not Applied"}`)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DetailView({ application }) {
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">{application.position}</CardTitle>
              <p className="flex items-center text-muted-foreground">
                <Briefcase className="h-4 w-4 mr-2" />
                {application.companyName}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              <span className="font-medium">Deadline: </span>
              {application.deadline || "N/A"}
            </span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Globe className="h-4 w-4 mr-2" />
            <a
              href={application.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Application Link
            </a>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Description</h3>
            <p>{application.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Requirements</h3>
            <ul className="list-disc list-inside">
              {application.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ApplicationCard({ application, onMarkApplied }) {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-bold text-xl">{application.companyName}</CardTitle>
          <Badge className={`${getStatusColor(application.status)} text-white`}>
            {application.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`applied-${application.id}`}
            onCheckedChange={(checked) => onMarkApplied(application.id, !!checked)}
          />
          <label
            htmlFor={`applied-${application.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Mark as Applied
          </label>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <div>
            <span className="font-medium">Deadline: </span>
            {application.deadline || "N/A"}
          </div>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Globe className="h-4 w-4 mr-2" />
          <a
            href={application.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Application Link
          </a>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/applications/${application.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

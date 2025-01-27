"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Badge } from "@/components/ui/badge";
import { Calendar, Globe, MapPin, Building2, GraduationCap } from "lucide-react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Grid, Layout } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import ApplicationCard from "@/app/components/applications/card";

// Mock data for demonstration
const applications = [
  {
    id: "1",
    companyName: "Tech Giants Inc.",
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
    status: "in_progress",
  },
  {
    id: "2",
    companyName: "DataCorp Solutions",
    position: "Data Analyst Intern",
    location: "New York, NY",
    applicationLink: "https://example.com/apply",
    deadline: "2024-06-10",
    description:
      "As a Data Analyst Intern, you will work closely with our team to analyze large datasets, generate actionable insights, and create impactful reports for stakeholders.",
    requirements: [
      "Proficiency in SQL and Excel",
      "Experience with BI tools like Power BI or Tableau",
      "Strong analytical and problem-solving skills",
      "Excellent written and verbal communication skills",
    ],
    status: "not_applied",
  },
];

// function ApplicationCard({ application, onMarkApplied }) {
//   function getStatusColor(status) {
//     switch (status) {
//       case "OPEN":
//         return "bg-green-500";
//       case "CLOSED":
//         return "bg-red-500";
//       case "UPCOMING":
//         return "bg-yellow-500";
//       default:
//         return "bg-blue-500";
//     }
//   }
//   return (
//     <Card className="w-full hover:shadow-lg transition-shadow">
//       <CardHeader>
//         <div className="flex justify-between items-center">
//           <CardTitle className="font-bold text-xl">{application.companyName}</CardTitle>
//           <Badge className={`${getStatusColor(application.status)} text-white`}>
//             {application.status}
//           </Badge>
//         </div>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="flex items-center space-x-2">
//           <Checkbox
//             id={`applied-${application.id}`}
//             onCheckedChange={(checked) => onMarkApplied(application.id, !!checked)}
//           />
//           <label
//             htmlFor={`applied-${application.id}`}
//             className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//           >
//             Mark as Applied
//           </label>
//         </div>
//         <div className="flex items-center text-muted-foreground">
//           <Calendar className="h-4 w-4 mr-2" />
//           <div>
//             <span className="font-medium">Deadline: </span>
//             {application.deadline || "N/A"}
//           </div>
//         </div>
//         <div className="flex items-center text-muted-foreground">
//           <Globe className="h-4 w-4 mr-2" />
//           <a
//             href={application.applicationLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-primary hover:underline"
//           >
//             Application Link
//           </a>
//         </div>
//       </CardContent>
//       <CardFooter>
//         <Button asChild className="w-full">
//           <Link href={`/applications/${application.id}`}>View Details</Link>
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }

function ApplicationPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState("detail"); // 'card' or 'detail'

  const currentApplication = applications[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % applications.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + applications.length) % applications.length);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Toggle between Card View and Detail View */}
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

      {/* Carousel Navigation */}
      <div className="flex items-center gap-4">
        <Button
          onClick={handlePrevious}
          variant="outline"
          className="flex items-center"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} of {applications.length}
        </span>
        <Button
          onClick={handleNext}
          variant="outline"
          className="flex items-center"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Main content */}
     {
      viewMode === "detail" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Main information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {currentApplication.position}
                  </CardTitle>
                  <CardDescription className="flex items-center mt-2">
                    <Building2 className="h-4 w-4 mr-2" />
                    {currentApplication.companyName}
                  </CardDescription>
                </div>
                <Select defaultValue={currentApplication.status}>
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
                  <span>{currentApplication.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <div>
                    <span className="font-medium text-foreground">Deadline: </span>
                    <span>{currentApplication.deadline}</span>
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Globe className="h-4 w-4 mr-2" />
                  <a
                    href={currentApplication.applicationLink}
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
                  {currentApplication.description}
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
                {currentApplication.requirements.map((requirement, index) => (
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
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" asChild>
                <a
                  href={currentApplication.applicationLink}
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card View */}
        {applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onMarkApplied={(id, isChecked) =>
              console.log(`Marked ${id} as ${isChecked ? "Applied" : "Not Applied"}`)
            }
          />
        ))}
      </div>
      )
     }
    </div>
  );
}

export default ApplicationPage;

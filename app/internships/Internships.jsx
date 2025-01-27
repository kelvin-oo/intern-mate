"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ComponentLevelLoader from "@/components/Loader";
import { updateApplication } from "@/actions/application";
import markApplied from "@/actions/intership";
import { currentClientUser } from "@/helpers/current-client-user";
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
import { Calendar, Globe, MapPin, Building2, GraduationCap, ExternalLink  } from "lucide-react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Grid, Layout } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import ApplicationCard from "@/app/components/applications/card";
import { getInternships } from "@/actions/intership";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react"

function Internships({}) {
    const session = useSession()
    console.log(session)

    const user = currentClientUser()
    console.log(user)
    const queryClient = useQueryClient();
    const { data:internships, error, isLoading, isFetched } = useQuery({
        queryKey: [`interships`],
        queryFn: async () => {
          const result = await getInternships();
          if (result.error) {
            throw new Error(result.error);
          }
    
          return result;
        },
        refetchOnMount: true
      });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState("detail"); // 'card' or 'detail'

  const currentApplication = internships[currentIndex];
  // console.log(`currentApplication: ${currentApplication}`);
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % internships.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + internships.length) % internships.length);
  };

  function getStatusColor(status) {
    switch (status?.toUpperCase()) {
      case "OPEN":
        return "bg-green-500 text-white";
      case "CLOSED":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white"; // For UNKNOWN or undefined
    }
  }

  
  console.log(user)

  const handleMarkAsRead = async () => {
    await markApplied(currentApplication.id)
    queryClient.invalidateQueries('interships');
  }



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
          {currentIndex + 1} of {internships.length}
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
            <div className="flex flex-col gap-4">
              <div>
                <CardTitle className="text-2xl font-bold">
                  {currentApplication.companyName}
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  {currentApplication.position}
                </CardDescription>
              </div>
              <Badge className={`w-fit px-3 py-1 rounded ${getStatusColor(currentApplication.status)}`}>
                {currentApplication.status?.toUpperCase() || "UNKNOWN"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start text-muted-foreground">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{currentApplication.location}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-5 w-5 mr-2 flex-shrink-0" />
                <div>
                  <span className="font-medium text-foreground">Deadline: </span>
                  <span>{currentApplication.deadline || "N/A"}</span>
                </div>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Globe className="h-5 w-5 mr-2 flex-shrink-0" />
                <a
                  href={currentApplication.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Application Link
                </a>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Building2 className="h-5 w-5 mr-2 flex-shrink-0" />
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link
                    href={currentApplication.companyWebsite || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1"
                  >
                    <span>Visit Company Website</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-muted-foreground">
                {currentApplication.description || "No description provided."}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Relevant Emails</h3>
              {currentApplication.contactEmails?.length > 0 ? (
                <ul className="list-disc list-inside text-muted-foreground">
                  {currentApplication.contactEmails.map((email, index) => (
                    <li key={index} className="text-primary hover:underline">
                      <a href={`mailto:${email}`}>{email}</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No contact emails provided.</p>
              )}
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
            <p>{currentApplication.requirements || "No requirements provided."}</p>
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
            <Button
              variant="outline"
              className="w-full"
              onClick={handleMarkAsRead}
            >
              {currentApplication.isApplied ? "Applied" : "Mark as applied"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>

      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card View */}
        {internships.map((internship) => (
          <ApplicationCard
            key={internship.id}
            internship={internship}
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

export default Internships;

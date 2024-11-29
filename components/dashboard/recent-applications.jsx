"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInternshipStore } from "@/lib/store";
import { ApplicationStatus } from "@prisma/client";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const statusColors = {
  NOT_STARTED: "bg-gray-500",
  IN_PROGRESS: "bg-yellow-500",
  APPLIED: "bg-green-500",
  REJECTED: "bg-red-500",
  ACCEPTED: "bg-blue-500",
};

export default function RecentApplications() {
  const { applications, internships } = useInternshipStore();

  const recentApplications = applications
    .slice(0, 5)
    .map((app) => ({
      ...app,
      internship: internships.find((i) => i.id === app.internshipId),
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentApplications.map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <h4 className="font-semibold">{app.internship?.companyName}</h4>
                <p className="text-sm text-muted-foreground">
                  {app.internship?.position}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary">
                  {format(app.updatedAt, "MMM d, yyyy")}
                </Badge>
                <Badge className={statusColors[app.status]}>
                  {app.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
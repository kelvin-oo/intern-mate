"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInternshipStore } from "@/lib/store";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

export default function UpcomingDeadlines() {
  const { internships } = useInternshipStore();

  const upcomingDeadlines = internships
    .filter((internship) => internship.status === "OPEN")
    .sort((a, b) => a.deadline.getTime() - b.deadline.getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingDeadlines.map((internship) => (
            <div
              key={internship.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <h4 className="font-semibold">{internship.companyName}</h4>
                <p className="text-sm text-muted-foreground">
                  {internship.position}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <Badge variant="outline">
                  {format(internship.deadline, "MMM d, yyyy")}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
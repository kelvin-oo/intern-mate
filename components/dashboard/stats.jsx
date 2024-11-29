"use client";

import { Card } from "@/components/ui/card";
import { useInternshipStore } from "@/lib/store";
import { CheckCircle, Clock, Send, XCircle } from "lucide-react";

export default function ApplicationStats() {
  const { applications } = useInternshipStore();

  const stats = {
    total: applications.length,
    applied: applications.filter((app) => app.status === "APPLIED").length,
    inProgress: applications.filter((app) => app.status === "IN_PROGRESS").length,
    rejected: applications.filter((app) => app.status === "REJECTED").length,
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Applications"
        value={stats.total}
        icon={Clock}
        className="bg-blue-50 dark:bg-blue-950"
      />
      <StatsCard
        title="Applied"
        value={stats.applied}
        icon={Send}
        className="bg-green-50 dark:bg-green-950"
      />
      <StatsCard
        title="In Progress"
        value={stats.inProgress}
        icon={CheckCircle}
        className="bg-yellow-50 dark:bg-yellow-950"
      />
      <StatsCard
        title="Rejected"
        value={stats.rejected}
        icon={XCircle}
        className="bg-red-50 dark:bg-red-950"
      />
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, className = "" }) {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
        </div>
        <Icon className="h-8 w-8 text-muted-foreground/50" />
      </div>
    </Card>
  );
}
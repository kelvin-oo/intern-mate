"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Clock, FileSpreadsheet, Send } from "lucide-react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Mock data
const applicationStats = {
  total: 25,
  applied: 15,
  inProgress: 5,
  notStarted: 5,
  accepted: 3,
  rejected: 2,
};

const weeklyData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [{
    label: 'Applications Submitted',
    data: [3, 5, 4, 3],
    backgroundColor: 'rgba(147, 51, 234, 0.5)',
    borderColor: 'rgb(147, 51, 234)',
    borderWidth: 1,
  }]
};

const statusData = {
  labels: ['Yet to apply', 'Applied'],
  datasets: [{
    data: [5, 2,],
    backgroundColor: [
      'rgba(148, 163, 184, 0.7)',
      // 'rgba(147, 51, 234, 0.7)',
      'rgba(34, 197, 94, 0.7)',
      // 'rgba(59, 130, 246, 0.7)',
      // 'rgba(239, 68, 68, 0.7)',
    ],
    borderColor: [
      'rgba(148, 163, 184, 0.7)',
      // 'rgba(147, 51, 234, 0.7)',
      'rgba(34, 197, 94, 0.7)',
      // 'rgba(59, 130, 246, 0.7)',
      // 'rgba(239, 68, 68, 0.7)',
    ],
    borderWidth: 1,
  }]
};

export default function OverviewPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Overview</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applied</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.applied}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.accepted}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar 
              data={weeklyData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' 
                  },
                },
              }}
              height={300}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Pie 
              data={statusData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right' 
                  },
                },
              }}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Notifications Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Upcoming Deadlines</h2>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Attention Needed</AlertTitle>
          <AlertDescription>
            3 applications have deadlines this week. Don&apos;t miss out!
          </AlertDescription>
        </Alert>
      </div>

      {/* Motivational Section */}
      <Card className="bg-purple-50 dark:bg-purple-950/50">
        <CardHeader>
          <CardTitle>Keep Going! 💪</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Pro tip: Customize each application to match the job description. 
            Use specific keywords from the posting in your resume and cover letter.
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 
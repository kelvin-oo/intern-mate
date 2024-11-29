"use client";

import { useEffect } from 'react';
import { useInternshipStore } from '@/lib/store';
import DashboardHeader from '@/components/dashboard/header';
import ApplicationStats from '@/components/dashboard/stats';
import RecentApplications from '@/components/dashboard/recent-applications';
import UpcomingDeadlines from '@/components/dashboard/upcoming-deadlines';

export default function DashboardPage() {
  const { setInternships, setApplications } = useInternshipStore();

  useEffect(() => {
    // Temporary mock data - will be replaced with API calls
    setInternships([
      {
        id: '1',
        companyName: 'Tech Corp',
        position: 'Software Engineer Intern',
        location: 'San Francisco, CA',
        applicationLink: 'https://example.com',
        deadline: new Date('2024-05-01'),
        status: 'OPEN',
        createdBy: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    setApplications([
      {
        id: '1',
        internshipId: '1',
        userId: 'user1',
        status: 'IN_PROGRESS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }, [setInternships, setApplications]);

  return (
    <div className="space-y-8">
      <DashboardHeader />
      <ApplicationStats />
      <div className="grid md:grid-cols-2 gap-8">
        <RecentApplications />
        <UpcomingDeadlines />
      </div>
    </div>
  );
}
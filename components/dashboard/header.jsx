import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Track your internship applications and deadlines
        </p>
      </div>
      <Button asChild>
        <Link href="/applications/new" className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Application
        </Link>
      </Button>
    </div>
  );
}
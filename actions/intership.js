"use server"
import db from "@/lib/db";
import { currentServerUser } from "@/lib/serverAuthState";
import { auth } from "@/auth";


export async function getInternships() {
    const user = await currentServerUser();
    const internships = await db.internship.findMany({
        include: {
            applications: {
        where: {
          userId: user.id, // Check applications for the current user
        },
        select: {
          status: true, // Include only the application status
        },
      },
    },
  });
  
  // Transforming the data for frontend consumption
  return internships.map((internship) => ({
    ...internship,
    isApplied: internship.applications.length > 0,
    applicationStatus: internship.applications[0]?.status || "NOT_APPLIED",
  }));
}


export default async function markApplied(internshipId) {
    const session = await auth();
    console.log(session)
  
      if (!internshipId) {
        return { message: "Internship ID is required" };
      }
  
      try {
        // Update the application status in the database
        const updatedApplication = await db.application.create({
          data: {
            internshipId: internshipId, 
            userId:session.user.id,
            status: "APPLIED",
          },
        });

        console.log(updatedApplication)
  
        return updatedApplication;
      } catch (error) {
        console.error(error);
        return { message: "Failed to update application status" };
      }
}

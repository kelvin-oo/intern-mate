"use server";

import db from "@/lib/db";
import ApplicationSchema from "@/schemas/application";
import { currentServerUser } from "@/lib/serverAuthState";

export async function createApplication(values) {
  const validatedFields = ApplicationSchema.safeParse(values);
  const user = await currentServerUser();
  
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    companyName,
    position,
    location,
    applicationLink,
    deadline,
    description,
    requirements,
    status,
    relevantEmails,
    resourceUrl,
  } = validatedFields.data;

  try {
    await db.internship.create({
      data: {
        companyName,
        position,
        location,
        applicationLink,
        deadline: deadline ? new Date(deadline) : null,
        description,
        requirements,
        status,
        contactEmails: relevantEmails,
        resourceUrl,
        createdBy: user.id,
      },
    });

    return { success: "Application created!" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong!" };
  }
} 
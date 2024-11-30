import * as z from "zod";

const ApplicationSchema = z.object({
  companyName: z.string().min(1, {
    message: "Company name is required",
  }),
  position: z.string().min(1, {
    message: "Position is required",
  }),
  location: z.string().min(1, {
    message: "Location is required",
  }),
  applicationLink: z.string().optional(),
  deadline: z.string().optional(),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  resourceUrl: z.string().optional().nullable(), // Updated
  requirements: z.string().optional(),
  status: z.enum(["OPEN", "CLOSED", "UPCOMING"]),
  relevantEmails: z.array(z.string().email()),
});

export default ApplicationSchema;

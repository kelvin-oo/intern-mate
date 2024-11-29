import * as z from "zod";


const SignupSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),

  email: z.string().email().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export default SignupSchema;
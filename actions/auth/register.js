"use server";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import SignupSchema from "@/schemas/register";
import { getUserByEmail } from "@/data/user";
import { sendVerificationMail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";

export const register = async (values) => {

  console.log(values);
  const result = SignupSchema.safeParse(values);
  console.log(result);
  if (!result.success) {
    return { error: "Invalid fields!" };
  }
  const {  name, email, password } =
    result.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already in use!" };
  }


  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  try {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationMail(verificationToken.email, verificationToken.token);
  } catch (error) {
    console.log(error);
    return { error: error || "An error occurred during registration." }; // Return user-friendly error message
  }


  return { success: "Confirmation email sent!" };
};

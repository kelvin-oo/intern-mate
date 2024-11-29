"use server";

import { getVerificationTokenByEmail } from "@/data/verification-token";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationMail } from "@/lib/mail";
import db from "@/lib/db";

export const resendVerificationEmail = async (email) => {
  try {
    // Find existing token
    const existingToken = await getVerificationTokenByEmail(email);
    
    if (existingToken) {
      // Delete the existing token from the database
      await db.verificationToken.delete({
        where: {
          id: existingToken.id
        }
      });
    }

    // Generate new token
    const verificationToken = await generateVerificationToken(email);
    
    // Send new verification email
    await sendVerificationMail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification email sent!" };
    
  } catch (error) {
    console.error("Error resending verification:", error);
    return { error: "Something went wrong!" };
  }
}; 
"use server";

import db from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    console.log('no user found');
    return { error: "Email does not exist!" };

  }

  console.log('i got here 1', existingUser);

  await db.user.update({
    where: { id: existingUser.id },
    data: { 
      emailVerified: new Date(), 
      email: existingToken.email,
    }
  });

  console.log('i got here 2', existingUser);

  await db.verificationToken.delete({
    where: { id: existingToken.id }
  });

  console.log('i got here 3');

  return { success: "Email verified!" };
};

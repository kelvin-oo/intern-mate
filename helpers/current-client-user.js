import { useSession } from "next-auth/react";

export const currentClientUser = () => {
  const session = useSession();

  return session.data?.user;
};

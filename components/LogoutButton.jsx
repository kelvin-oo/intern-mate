"use client";
import { signOut } from "next-auth/react";
import { useProfileStore } from "@/store";

export const LogoutButton = ({ children }) => {
  const clearCredentials = useProfileStore(state => state.clearCredentials);

  const handleLogout = () => {
    // Clear zustand store state
    clearCredentials();

    // Remove all relevant localStorage keys
    if (typeof window !== 'undefined') {
      localStorage.removeItem('profile-storage');
     
      localStorage.clear(); 
    }

    // Sign out and redirect to home
    signOut({ callbackUrl: '/' });
  };

  return (
    <span onClick={handleLogout} className="cursor-pointer">
      {children}
    </span>
  );
};
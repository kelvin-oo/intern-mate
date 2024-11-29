import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useModalStore = create((set) => ({
  // Sign Up Modal State
  isSignUpModalOpen: false,
  toggleSignUpModal: () => {
    set((state) => ({ isSignUpModalOpen: !state.isSignUpModalOpen }));
  },

  // Sign In Modal State
  isSignInModalOpen: false,
  toggleSignInModal: () => {
    set((state) => ({ isSignInModalOpen: !state.isSignInModalOpen }));
  },

  isMemberModalOpen: false,
  toggleMemberModal: () => {
    set((state) => ({ isMemberModalOpen: !state.isMemberModalOpen }));
  },

  isVerificationModalOpen: false,
  toggleVerificationModal: () => {
    set((state) => ({ isVerificationModalOpen: !state.isVerificationModalOpen }));
  },

  isOtpModalOpen: false,
  toggleOtpModalOpen: () => {
    set((state) => ({ isOtpModalOpen: !state.isOtpModalOpen }));
  },


  isemailVerificationSuccessOpen: false,
  toggleIsemailVerificationSuccessOpen: () => {
    set((state) => ({ isemailVerificationSuccessOpen: !state.isemailVerificationSuccessOpen }));
  },


  isNavMenuOpen: false,
  toggleNavMenu: () => {
    set((state) => ({ isNavMenuOpen: !state.isNavMenuOpen }));
  },

  

  ispaymentModalOpen: false,
  toggleIspaymentModalOpen: () => {
    set((state) => ({ ispaymentModalOpen: !state.ispaymentModalOpen }));
  },
}));

export const useProfileStore = create(
  persist(
    (set) => ({
      name: '',
      email: '',
      image: '',
      setCredentials: (name, email, image) => set({ name, email, image }),
      clearCredentials: () => set({ name: '', email: '', image: '' })
    }),
    {
      name: 'profile-storage',
    }
  )
);

export const useSignUpEmailStore = create(
  persist(
    (set) => ({
      email: null,
      setEmail: (email) => set({ email }),
      clearEmail: () => set({ email: null }),
    }),
    {
      name: 'signup-email-storage', // Key to store in localStorage
    }
  )
);


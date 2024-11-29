import { create } from 'zustand';
import { ApplicationStatus, Internship, Application } from '@prisma/client';

interface InternshipStore {
  internships: Internship[];
  applications: Application[];
  filters: {
    status: ApplicationStatus | null;
    search: string;
  };
  setInternships: (internships: Internship[]) => void;
  setApplications: (applications: Application[]) => void;
  updateApplication: (applicationId: string, status: ApplicationStatus) => void;
  setFilters: (filters: { status: ApplicationStatus | null; search: string }) => void;
}

export const useInternshipStore = create<InternshipStore>((set) => ({
  internships: [],
  applications: [],
  filters: {
    status: null,
    search: '',
  },
  setInternships: (internships) => set({ internships }),
  setApplications: (applications) => set({ applications }),
  updateApplication: (applicationId, status) =>
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === applicationId ? { ...app, status } : app
      ),
    })),
  setFilters: (filters) => set({ filters }),
}));
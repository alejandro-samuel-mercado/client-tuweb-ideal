"use client";

import { API_URL } from "@/config";
import { Plan } from "@/data/plans";
import Logger from "@/lib/logger";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface PersonalData {
  email: string;
  phone: string;
  address: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
}


interface Project {
  id: number;
  title: string;
  slug: string;
  tagline: string;
  tagline_en?: string;
  description: string;
  description_en?: string;
  detailedDescription: string;
  detailedDescription_en?: string;
  imageUrl: string;
  category: string;
  url?: string;
  tags?: string[];
  features?: string[];
  technologies?: string[];
  client?: string;
  completionDate?: string;
  testimonial?: any;
  gallery?: string[];
}

interface DataContextType {
  personalData: PersonalData | null;
  plans: Plan[];
  projects: Project[];
  loading: boolean;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [personalData, setPersonalData] = useState<PersonalData | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const results = await Promise.allSettled([
        fetch(`${API_URL}/api/settings/personal-data`).then(res => res.json()),
        fetch(`${API_URL}/api/content/example-projects`).then(res => res.json()),
        fetch(`${API_URL}/api/content/plans`).then(res => res.json()),
      ]);

      if (results[0].status === 'fulfilled') {
        setPersonalData(results[0].value);
      } else {
        Logger.error("Failed to fetch personal data", results[0].reason);
      }

  

      if (results[1].status === 'fulfilled' && Array.isArray(results[1].value)) {
        setProjects(results[1].value);
      } else {
         Logger.warn("Failed to fetch projects or invalid format", results[1].status === 'rejected' ? results[1].reason : results[1].value);
      }

      if (results[2].status === 'fulfilled' && Array.isArray(results[2].value)) {
        // Merge backend plans with local plans (prefer backend if ID matches, or just append?)
        // For now, let's just log or set if we want backend source of truth.
        // Assuming we want to prioritize backend plans if available:
        setPlans((prev) => {
            const backendPlans = results[2].status === 'fulfilled' ? results[2].value : [];
            // Strategy: Use backend plans if available, falling back to local for static. 
            // Since this is client side, we can overwrite with backend plans.
            return backendPlans.length > 0 ? backendPlans : prev;
        });
      }

    } catch (error) {
      Logger.error("Error confirming global data fetch", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ personalData, plans, projects, loading, refreshData: fetchData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}

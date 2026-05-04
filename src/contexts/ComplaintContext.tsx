import React, { createContext, useContext, ReactNode } from 'react';
import { useComplaints } from '../hooks/useComplaints';
import { Complaint, ComplaintFormData, ComplaintType, ComplaintStatus } from '../types/complaint';

interface ComplaintContextType {
  complaints: Complaint[];
  loading: boolean;
  statistics: any;
  createComplaint: (data: ComplaintFormData) => Promise<boolean>;
  updateComplaint: (id: string, data: Partial<ComplaintFormData>) => Promise<boolean>;
  updateComplaintStatus: (id: string, status: ComplaintStatus) => Promise<boolean>;
  assignComplaint: (id: string, adminId: string) => Promise<boolean>;
  resolveComplaint: (id: string, resolution: string, resolutionNotes?: string) => Promise<boolean>;
  rejectComplaint: (id: string, reason: string) => Promise<boolean>;
  addComment: (complaintId: string, content: string, isInternal?: boolean) => Promise<boolean>;
  deleteComplaint: (id: string) => Promise<boolean>;
  refreshComplaints: () => Promise<void>;
  filterByType: (type: ComplaintType) => Promise<void>;
  filterByStatus: (status: ComplaintStatus) => Promise<void>;
  refreshStatistics: () => Promise<void>;
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

interface ComplaintProviderProps {
  children: ReactNode;
}

// Provider pour la gestion globale des réclamations
export const ComplaintProvider: React.FC<ComplaintProviderProps> = ({ children }) => {
  const complaintHook = useComplaints();

  const value: ComplaintContextType = {
    ...complaintHook,
    refreshComplaints: complaintHook.fetchComplaints,
    filterByType: complaintHook.fetchComplaintsByType,
    filterByStatus: complaintHook.fetchComplaintsByStatus,
  };

  return (
    <ComplaintContext.Provider value={value}>
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaintContext = (): ComplaintContextType => {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error('useComplaintContext must be used within a ComplaintProvider');
  }
  return context;
};
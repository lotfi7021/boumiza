import { useState, useEffect } from 'react';
import { Admin, AdminFormData } from '../types/admin';
import { adminService } from '../services/adminService';
import { useError } from './useError';

// Hook personnalisé pour la gestion des administrateurs
export const useAdmins = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(false);
  const { handleError } = useError();

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAll();
      setAdmins(data);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const createAdmin = async (data: AdminFormData): Promise<boolean> => {
    try {
      const newAdmin = await adminService.create(data);
      setAdmins(prev => [...prev, newAdmin]);
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const updateAdmin = async (id: string, data: Partial<AdminFormData>): Promise<boolean> => {
    try {
      const updatedAdmin = await adminService.update(id, data);
      setAdmins(prev => prev.map(admin => 
        admin.id === id ? updatedAdmin : admin
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const deleteAdmin = async (id: string): Promise<boolean> => {
    try {
      await adminService.delete(id);
      setAdmins(prev => prev.filter(admin => admin.id !== id));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const toggleAdminStatus = async (id: string): Promise<boolean> => {
    try {
      const admin = admins.find(a => a.id === id);
      if (!admin) return false;
      
      const newStatus = admin.status === 'active' ? 'inactive' : 'active';
      const updatedAdmin = await adminService.updateStatus(id, newStatus);
      
      setAdmins(prev => prev.map(a => 
        a.id === id ? updatedAdmin : a
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return {
    admins,
    loading,
    fetchAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    toggleAdminStatus,
  };
};
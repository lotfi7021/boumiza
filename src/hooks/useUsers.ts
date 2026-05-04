import { useState, useEffect } from 'react';
import { User, UserFormData } from '../types/user';
import { userService } from '../services/userService';
import { useError } from './useError';

// Hook personnalisé pour la gestion des utilisateurs
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { handleError } = useError();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (data: UserFormData): Promise<boolean> => {
    try {
      const newUser = await userService.create(data);
      setUsers(prev => [...prev, newUser]);
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const updateUser = async (id: string, data: Partial<UserFormData>): Promise<boolean> => {
    try {
      const updatedUser = await userService.update(id, data);
      setUsers(prev => prev.map(user => 
        user.id === id ? updatedUser : user
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const deleteUser = async (id: string): Promise<boolean> => {
    try {
      await userService.delete(id);
      setUsers(prev => prev.filter(user => user.id !== id));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const updateUserStatus = async (id: string, status: 'active' | 'inactive' | 'suspended'): Promise<boolean> => {
    try {
      const updatedUser = await userService.updateStatus(id, status);
      setUsers(prev => prev.map(u => 
        u.id === id ? updatedUser : u
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    updateUserStatus,
  };
};
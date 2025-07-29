import { useState, useEffect } from 'react';
import axios from '../api/axiosInstance';

interface AuthUser {
  username: string;
  logo?: string;
  status: 'connected' | 'disconnected';
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/status');
      if (response.data.status === 'connected') {
        setUser({
          username: response.data.username,
          logo: response.data.logo,
          status: 'connected'
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du statut:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const logout = async () => {
    try {
      await axios.get('/logout');
      setUser(null);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    refreshAuth: checkAuthStatus,
    logout
  };
};

import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  name: string;
  email: string;
  subscriptionType: 'free' | 'premium';
  subscriptionEndDate?: string;
  createdAt: string;
} | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
  error: string | null;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Verificar si hay un usuario almacenado en AsyncStorage al iniciar la app
    const loadUser = async () => {
      try {
        setIsLoading(true);
        const userData = await AsyncStorage.getItem('user');
        const token = await AsyncStorage.getItem('token');
        
        if (userData && token) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUser();
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulación de login - en la versión real, se conectaría a un servicio API
      // const response = await authService.login({ email, password });
      
      // Simulación de respuesta de API
      const mockResponse = {
        token: 'mock-auth-token',
        user: {
          id: '123',
          name: 'Usuario Prueba',
          email: email,
          subscriptionType: 'free',
          createdAt: new Date().toISOString()
        }
      };
      
      // Guardar el token en AsyncStorage
      await AsyncStorage.setItem('token', mockResponse.token);
      
      // Guardar los datos del usuario
      await AsyncStorage.setItem('user', JSON.stringify(mockResponse.user));
      
      setUser(mockResponse.user);
    } catch (error: any) {
      setError(error.message || 'Error al iniciar sesión');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulación de registro - en la versión real, se conectaría a un servicio API
      // const response = await authService.register({ name, email, password });
      
      // Iniciar sesión automáticamente después del registro
      await login(email, password);
    } catch (error: any) {
      setError(error.message || 'Error al registrar usuario');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      setIsLoading(true);
      
      // Llamar al servicio de logout (en implementación real)
      // await authService.logout();
      
      // Limpiar datos de autenticación
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
      // Forzar el logout aunque falle la API
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  const refreshUserData = async () => {
    try {
      setIsLoading(true);
      
      // En una aplicación real, obtendríamos datos actualizados del usuario
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Para propósitos de desarrollo, puedes descomentar esto para simular un inicio de sesión automático
  // useEffect(() => {
  //   login('user@example.com', 'password123');
  // }, []);
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isLoggedIn: !!user, 
        login, 
        register, 
        logout,
        refreshUserData,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define los tipos de datos para el contexto
type User = {
  id: string;
  email: string;
  name?: string;
  isPremium: boolean;
  subscriptionType?: 'monthly' | 'yearly' | null;
  subscriptionExpiryDate?: Date | null;
} | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  restoreSession: () => Promise<void>;
};

// Crear el contexto con un valor por defecto
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  restoreSession: async () => {},
});

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

// Proveedor del contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Función para iniciar sesión
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Aquí irá la lógica real de autenticación con tu backend
      // Por ahora, simulamos un inicio de sesión exitoso
      const userData = {
        id: '1',
        email,
        name: 'Usuario de Escalada',
        isPremium: false,
      };
      
      // Guardar los datos del usuario en el almacenamiento local
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para registrarse
  const signUp = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      // Aquí irá la lógica real de registro con tu backend
      // Por ahora, simulamos un registro exitoso
      const userData = {
        id: '1',
        email,
        name,
        isPremium: false,
      };
      
      // Guardar los datos del usuario en el almacenamiento local
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error al registrarse:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para cerrar sesión
  const signOut = async () => {
    try {
      setIsLoading(true);
      // Eliminar los datos del usuario del almacenamiento local
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para restaurar la sesión
  const restoreSession = async () => {
    try {
      setIsLoading(true);
      // Obtener los datos del usuario del almacenamiento local
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error al restaurar la sesión:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Restaurar la sesión al cargar la aplicación
  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        restoreSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
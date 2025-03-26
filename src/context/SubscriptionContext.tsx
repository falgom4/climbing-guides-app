import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

// Define los tipos para las guías y las suscripciones
type Guide = {
  id: string;
  title: string;
  description: string;
  imagePath: any;
  isDownloaded: boolean;
  fileSize: number; // tamaño en MB
};

type Subscription = {
  type: 'free' | 'monthly' | 'yearly';
  price: number;
  features: string[];
};

type SubscriptionContextType = {
  userSubscription: 'free' | 'monthly' | 'yearly';
  subscriptionPlans: Subscription[];
  downloadedGuides: Guide[];
  availableGuides: Guide[];
  downloadGuide: (guideId: string) => Promise<void>;
  removeGuide: (guideId: string) => Promise<void>;
  upgradeSubscription: (plan: 'monthly' | 'yearly') => Promise<void>;
  cancelSubscription: () => Promise<void>;
  isDownloading: boolean;
  offlineMode: boolean;
  toggleOfflineMode: () => void;
};

// Crear el contexto con un valor por defecto
export const SubscriptionContext = createContext<SubscriptionContextType>({
  userSubscription: 'free',
  subscriptionPlans: [],
  downloadedGuides: [],
  availableGuides: [],
  downloadGuide: async () => {},
  removeGuide: async () => {},
  upgradeSubscription: async () => {},
  cancelSubscription: async () => {},
  isDownloading: false,
  offlineMode: false,
  toggleOfflineMode: () => {},
});

// Hook personalizado para usar el contexto
export const useSubscription = () => useContext(SubscriptionContext);

// Proveedor del contexto
export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [userSubscription, setUserSubscription] = useState<'free' | 'monthly' | 'yearly'>('free');
  const [downloadedGuides, setDownloadedGuides] = useState<Guide[]>([]);
  const [availableGuides, setAvailableGuides] = useState<Guide[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);

  // Planes de suscripción
  const subscriptionPlans: Subscription[] = [
    {
      type: 'free',
      price: 0,
      features: ['Acceso a guías básicas', 'Funcionalidad limitada'],
    },
    {
      type: 'monthly',
      price: 9.99,
      features: ['Acceso a todas las guías', 'Descarga para uso offline', 'Sin anuncios'],
    },
    {
      type: 'yearly',
      price: 99.99,
      features: ['Todas las funciones mensuales', '16% de descuento', 'Acceso a contenido exclusivo'],
    },
  ];

  // Función para descargar una guía
  const downloadGuide = async (guideId: string) => {
    try {
      setIsDownloading(true);
      // Simulamos un tiempo de descarga
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Buscar la guía en las disponibles
      const guide = availableGuides.find((g) => g.id === guideId);
      
      if (guide) {
        // Marcar como descargada
        const updatedGuide = { ...guide, isDownloaded: true };
        
        // Actualizar la lista de guías descargadas
        const newDownloadedGuides = [...downloadedGuides, updatedGuide];
        setDownloadedGuides(newDownloadedGuides);
        
        // Guardar en AsyncStorage
        await AsyncStorage.setItem('downloadedGuides', JSON.stringify(newDownloadedGuides));
      }
    } catch (error) {
      console.error('Error al descargar la guía:', error);
      throw error;
    } finally {
      setIsDownloading(false);
    }
  };

  // Función para eliminar una guía descargada
  const removeGuide = async (guideId: string) => {
    try {
      // Filtrar la guía que queremos eliminar
      const updatedGuides = downloadedGuides.filter((guide) => guide.id !== guideId);
      setDownloadedGuides(updatedGuides);
      
      // Actualizar AsyncStorage
      await AsyncStorage.setItem('downloadedGuides', JSON.stringify(updatedGuides));
    } catch (error) {
      console.error('Error al eliminar la guía:', error);
      throw error;
    }
  };

  // Función para actualizar la suscripción
  const upgradeSubscription = async (plan: 'monthly' | 'yearly') => {
    try {
      // Aquí iría la integración con Stripe para procesar el pago
      // Por ahora solo actualizamos el estado
      setUserSubscription(plan);
      
      // Guardar en AsyncStorage
      await AsyncStorage.setItem('userSubscription', plan);
    } catch (error) {
      console.error('Error al actualizar la suscripción:', error);
      throw error;
    }
  };

  // Función para cancelar la suscripción
  const cancelSubscription = async () => {
    try {
      setUserSubscription('free');
      await AsyncStorage.setItem('userSubscription', 'free');
    } catch (error) {
      console.error('Error al cancelar la suscripción:', error);
      throw error;
    }
  };

  // Función para alternar el modo offline
  const toggleOfflineMode = () => {
    setOfflineMode(!offlineMode);
  };

  // Cargar datos guardados al iniciar
  useEffect(() => {
    const loadData = async () => {
      try {
        // Cargar suscripción guardada
        const savedSubscription = await AsyncStorage.getItem('userSubscription');
        if (savedSubscription) {
          setUserSubscription(savedSubscription as 'free' | 'monthly' | 'yearly');
        }
        
        // Cargar guías descargadas
        const savedGuides = await AsyncStorage.getItem('downloadedGuides');
        if (savedGuides) {
          setDownloadedGuides(JSON.parse(savedGuides));
        }
      } catch (error) {
        console.error('Error al cargar datos guardados:', error);
      }
    };

    loadData();

    // Cargar guías disponibles (simulado, en producción sería una API)
    setAvailableGuides([
      {
        id: '1',
        title: 'El Potrero Chico',
        description: 'Guía completa de escalada en El Potrero Chico, México',
        imagePath: require('../../assets/guides/potrero.jpg'),
        isDownloaded: false,
        fileSize: 45,
      },
      {
        id: '2',
        title: 'Peñoles',
        description: 'Rutas de escalada en Peñoles, México',
        imagePath: require('../../assets/guides/penoles.jpg'),
        isDownloaded: false,
        fileSize: 32,
      },
      {
        id: '3',
        title: 'El Diente',
        description: 'Guía de boulder en El Diente, Monterrey',
        imagePath: require('../../assets/guides/diente.jpg'),
        isDownloaded: false,
        fileSize: 28,
      },
      // Puedes agregar más guías aquí
    ]);
  }, []);

  // Actualizar según el usuario
  useEffect(() => {
    if (user?.subscriptionType) {
      setUserSubscription(user.subscriptionType);
    }
  }, [user]);

  return (
    <SubscriptionContext.Provider
      value={{
        userSubscription,
        subscriptionPlans,
        downloadedGuides,
        availableGuides,
        downloadGuide,
        removeGuide,
        upgradeSubscription,
        cancelSubscription,
        isDownloading,
        offlineMode,
        toggleOfflineMode,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
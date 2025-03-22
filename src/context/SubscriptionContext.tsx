import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

type Plan = {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  discount?: number;
};

type Subscription = {
  id: string;
  status: 'active' | 'canceled' | 'expired';
  planId: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
} | null;

type SubscriptionContextType = {
  subscription: Subscription;
  plans: Plan[];
  isLoading: boolean;
  error: string | null;
  getSubscriptionPlans: () => Promise<void>;
  createSubscription: (planId: string, paymentMethodId: string) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  refreshSubscriptionStatus: () => Promise<void>;
};

export const SubscriptionContext = createContext<SubscriptionContextType>({} as SubscriptionContextType);

export const useSubscription = () => useContext(SubscriptionContext);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscription, setSubscription] = useState<Subscription>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user, isLoggedIn, refreshUserData } = useAuth();
  
  useEffect(() => {
    if (isLoggedIn) {
      getSubscriptionPlans();
      fetchCurrentSubscription();
    }
  }, [isLoggedIn]);
  
  const fetchCurrentSubscription = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // En una aplicación real, obtendríamos esto de un API
      // const response = await subscriptionService.getCurrentSubscription();
      
      // Por ahora, lo simulamos con datos de ejemplo
      const subscriptionData = await AsyncStorage.getItem('subscription');
      if (subscriptionData) {
        setSubscription(JSON.parse(subscriptionData));
      }
    } catch (error: any) {
      setError(error.message || 'Error al obtener información de suscripción');
      console.error('Error obteniendo suscripción:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const getSubscriptionPlans = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // En una aplicación real, obtendríamos esto de un API
      // const response = await subscriptionService.getPlans();
      
      // Por ahora, usamos datos de ejemplo
      const mockPlans: Plan[] = [
        {
          id: 'monthly',
          name: 'Plan Mensual',
          price: 8.99,
          interval: 'month',
          features: [
            'Acceso a todas las guías',
            'Descarga para uso offline',
            'Actualizaciones mensuales',
            'Sin publicidad'
          ]
        },
        {
          id: 'annual',
          name: 'Plan Anual',
          price: 79.99,
          interval: 'year',
          discount: 25,
          features: [
            'Acceso a todas las guías',
            'Descarga para uso offline',
            'Actualizaciones mensuales',
            'Sin publicidad',
            'Acceso prioritario a nuevas guías'
          ]
        }
      ];
      
      setPlans(mockPlans);
    } catch (error: any) {
      setError(error.message || 'Error al obtener planes de suscripción');
      console.error('Error obteniendo planes:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const createSubscription = async (planId: string, paymentMethodId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // En una aplicación real, llamaríamos a un API
      // const response = await subscriptionService.createSubscription(planId, paymentMethodId);
      
      // Simulamos una respuesta exitosa
      const mockSubscription: Subscription = {
        id: `sub_${Date.now()}`,
        status: 'active',
        planId: planId,
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 días en el futuro
        cancelAtPeriodEnd: false
      };
      
      // Guardar en AsyncStorage para simulación
      await AsyncStorage.setItem('subscription', JSON.stringify(mockSubscription));
      
      // Actualizar estado
      setSubscription(mockSubscription);
      
      // Actualizar datos de usuario (ya que el tipo de suscripción cambia)
      await refreshUserData();
    } catch (error: any) {
      setError(error.message || 'Error al crear suscripción');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const cancelSubscription = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // En una aplicación real, llamaríamos a un API
      // await subscriptionService.cancelSubscription();
      
      // Actualizar estado de suscripción
      if (subscription) {
        const updatedSubscription = {
          ...subscription,
          cancelAtPeriodEnd: true
        };
        
        // Guardar en AsyncStorage para simulación
        await AsyncStorage.setItem('subscription', JSON.stringify(updatedSubscription));
        
        setSubscription(updatedSubscription);
      }
      
      // Actualizar datos de usuario
      await refreshUserData();
    } catch (error: any) {
      setError(error.message || 'Error al cancelar suscripción');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const refreshSubscriptionStatus = async () => {
    await fetchCurrentSubscription();
  };
  
  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        plans,
        isLoading,
        error,
        getSubscriptionPlans,
        createSubscription,
        cancelSubscription,
        refreshSubscriptionStatus
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

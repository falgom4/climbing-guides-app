import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Navegación
import RootNavigator from './src/navigation/RootNavigator';

// Contextos
import { AuthProvider } from './src/context/AuthContext';
import { SubscriptionProvider } from './src/context/SubscriptionContext';

// Servicios
import { initializeStripe } from './src/services/stripeService';
import { initDatabase } from './src/services/offlineStorage';

// Tema y constantes
import { COLORS } from './src/constants/theme';

export default function App() {
  useEffect(() => {
    // Inicializar servicios
    const initServices = async () => {
      try {
        // Inicializar la base de datos SQLite para almacenamiento offline
        await initDatabase();
        
        // Inicializar Stripe con tu clave pública
        // Nota: En un entorno real, esta clave debería obtenerse de variables de entorno
        await initializeStripe('pk_test_yourPublishableKey');
        
        console.log('Servicios inicializados correctamente');
      } catch (error) {
        console.error('Error al inicializar servicios:', error);
      }
    };
    
    initServices();
  }, []);
  
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={COLORS.primary} />
      <AuthProvider>
        <SubscriptionProvider>
          <RootNavigator />
        </SubscriptionProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
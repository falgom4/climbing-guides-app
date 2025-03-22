import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Tema y constantes
import { COLORS } from './src/constants/theme';

// Iniciamos con una versión simplificada mientas solucionamos los problemas
export default function App() {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // Simular inicialización
    const init = async () => {
      try {
        // Esperar un tiempo para mostrar nuestra "carga"
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsReady(true);
      } catch (error) {
        console.error('Error inicializando:', error);
      }
    };
    
    init();
  }, []);
  
  if (!isReady) {
    // Pantalla de carga inicial
    return (
      <View style={{ 
        flex: 1, 
        backgroundColor: COLORS.background, 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <Text style={{ 
          color: COLORS.primary, 
          fontSize: 28, 
          fontWeight: 'bold' 
        }}>
          Khamai
        </Text>
        <Text style={{ 
          color: COLORS.neutral, 
          marginTop: 10 
        }}>
          Cargando...
        </Text>
      </View>
    );
  }
  
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={COLORS.primary} />
      <View style={{ 
        flex: 1, 
        backgroundColor: COLORS.background, 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <View style={{ 
          width: 100, 
          height: 100, 
          borderRadius: 50, 
          backgroundColor: COLORS.primary, 
          justifyContent: 'center', 
          alignItems: 'center', 
          marginBottom: 20 
        }}>
          <Text style={{ fontSize: 50 }}>🦎</Text>
        </View>
        <Text style={{ 
          color: COLORS.primary, 
          fontSize: 28, 
          fontWeight: 'bold', 
          marginBottom: 10 
        }}>
          Khamai
        </Text>
        <Text style={{ 
          color: COLORS.secondary, 
          fontSize: 18, 
          textAlign: 'center', 
          marginHorizontal: 40 
        }}>
          Tu guía de escalada con
          acceso offline
        </Text>
      </View>
    </SafeAreaProvider>
  );
}
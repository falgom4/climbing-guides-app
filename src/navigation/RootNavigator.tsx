import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Navigators
import AppNavigator from './AppNavigator';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';

// Context
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  
  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          // Primera vez que se ejecuta la app
          setIsFirstLaunch(true);
          await AsyncStorage.setItem('hasLaunched', 'true');
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
        setIsFirstLaunch(false); // Por defecto, asumir que no es la primera vez
      }
    };
    
    checkFirstLaunch();
  }, []);
  
  // Mostrar pantalla de carga mientras se verifica la autenticación y el primer lanzamiento
  if (isLoading || isFirstLaunch === null) {
    return null; // O una pantalla de carga
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstLaunch ? (
          // Flujo de onboarding (primera vez)
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : isLoggedIn ? (
          // Usuario autenticado
          <Stack.Screen name="Main" component={AppNavigator} />
        ) : (
          // Usuario no autenticado
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
// Servicio simplificado para simular almacenamiento offline
// En una implementación real, usaríamos SQLite o similar

import AsyncStorage from '@react-native-async-storage/async-storage';

// Prefijos para almacenamiento
const GUIDES_PREFIX = '@khamai_offline_guide_';
const ROUTES_PREFIX = '@khamai_offline_route_';
const GUIDE_IDS_KEY = '@khamai_offline_guide_ids';

// Inicializar el almacenamiento
export const initDatabase = async () => {
  try {
    // Verificar si ya existe una lista de guías descargadas
    const existingIds = await AsyncStorage.getItem(GUIDE_IDS_KEY);
    if (!existingIds) {
      // Inicializar con una lista vacía
      await AsyncStorage.setItem(GUIDE_IDS_KEY, JSON.stringify([]));
    }
    return true;
  } catch (error) {
    console.error('Error inicializando almacenamiento offline:', error);
    return false;
  }
};

// Guardar una guía completa (con sus rutas) para uso offline
export const saveGuideOffline = async (guide) => {
  try {
    // Guardar la guía principal
    await AsyncStorage.setItem(
      `${GUIDES_PREFIX}${guide.id}`,
      JSON.stringify(guide)
    );
    
    // Guardar cada ruta individualmente si existen
    if (guide.routes && guide.routes.length > 0) {
      for (const route of guide.routes) {
        await AsyncStorage.setItem(
          `${ROUTES_PREFIX}${route.id}`,
          JSON.stringify({
            ...route,
            guideId: guide.id
          })
        );
      }
    }
    
    // Actualizar lista de guías descargadas
    const guideIdsStr = await AsyncStorage.getItem(GUIDE_IDS_KEY);
    const guideIds = JSON.parse(guideIdsStr || '[]');
    
    if (!guideIds.includes(guide.id)) {
      guideIds.push(guide.id);
      await AsyncStorage.setItem(GUIDE_IDS_KEY, JSON.stringify(guideIds));
    }
    
    return true;
  } catch (error) {
    console.error('Error guardando guía offline:', error);
    return false;
  }
};

// Obtener una guía por su ID desde el almacenamiento offline
export const getOfflineGuide = async (guideId) => {
  try {
    const guideStr = await AsyncStorage.getItem(`${GUIDES_PREFIX}${guideId}`);
    if (!guideStr) return null;
    
    const guide = JSON.parse(guideStr);
    
    // Obtener la lista de IDs de guías descargadas
    const guideIdsStr = await AsyncStorage.getItem(GUIDE_IDS_KEY);
    const guideIds = JSON.parse(guideIdsStr || '[]');
    
    // Verificar si la guía está en la lista de descargadas
    if (!guideIds.includes(guideId)) {
      return null;
    }
    
    return guide;
  } catch (error) {
    console.error('Error obteniendo guía offline:', error);
    return null;
  }
};

// Obtener todas las guías descargadas
export const getAllOfflineGuides = async () => {
  try {
    const guideIdsStr = await AsyncStorage.getItem(GUIDE_IDS_KEY);
    const guideIds = JSON.parse(guideIdsStr || '[]');
    
    const guides = [];
    for (const id of guideIds) {
      const guideStr = await AsyncStorage.getItem(`${GUIDES_PREFIX}${id}`);
      if (guideStr) {
        guides.push(JSON.parse(guideStr));
      }
    }
    
    return guides;
  } catch (error) {
    console.error('Error obteniendo guías offline:', error);
    return [];
  }
};

// Eliminar una guía descargada
export const removeOfflineGuide = async (guideId) => {
  try {
    // Eliminar la guía
    await AsyncStorage.removeItem(`${GUIDES_PREFIX}${guideId}`);
    
    // Actualizar lista de guías descargadas
    const guideIdsStr = await AsyncStorage.getItem(GUIDE_IDS_KEY);
    let guideIds = JSON.parse(guideIdsStr || '[]');
    guideIds = guideIds.filter(id => id !== guideId);
    await AsyncStorage.setItem(GUIDE_IDS_KEY, JSON.stringify(guideIds));
    
    // También podríamos eliminar las rutas asociadas aquí
    // Pero necesitaríamos una forma de saber qué rutas pertenecen a la guía
    
    return true;
  } catch (error) {
    console.error('Error eliminando guía offline:', error);
    return false;
  }
};

// Verificar si una guía está descargada
export const isGuideDownloaded = async (guideId) => {
  try {
    const guideIdsStr = await AsyncStorage.getItem(GUIDE_IDS_KEY);
    const guideIds = JSON.parse(guideIdsStr || '[]');
    return guideIds.includes(guideId);
  } catch (error) {
    console.error('Error verificando si la guía está descargada:', error);
    return false;
  }
};

// Limpiar todo el almacenamiento offline (útil para depuración o al cerrar sesión)
export const clearAllOfflineData = async () => {
  try {
    const guideIdsStr = await AsyncStorage.getItem(GUIDE_IDS_KEY);
    const guideIds = JSON.parse(guideIdsStr || '[]');
    
    // Eliminar todas las guías almacenadas
    for (const id of guideIds) {
      await AsyncStorage.removeItem(`${GUIDES_PREFIX}${id}`);
    }
    
    // Reiniciar la lista de IDs
    await AsyncStorage.setItem(GUIDE_IDS_KEY, JSON.stringify([]));
    
    return true;
  } catch (error) {
    console.error('Error limpiando datos offline:', error);
    return false;
  }
};

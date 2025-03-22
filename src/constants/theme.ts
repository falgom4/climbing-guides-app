/**
 * Tema principal de la aplicación Khamai
 * Paleta de colores inspirada en iguanas
 */

export const COLORS = {
  // Verdes (colores principales de iguana)
  primary: '#2C5F2D',      // Verde oscuro (tono principal)
  secondary: '#4F7942',    // Verde musgo
  tertiary: '#97BC62',     // Verde claro
  lightGreen: '#C9E4CA',   // Verde muy claro para fondos
  
  // Marrones/tierras (detalles de iguana)
  accent: '#8B6B52',       // Marrón tierra
  accentLight: '#BE9B7B',  // Marrón claro
  
  // Grises (para piel de iguana)
  neutral: '#6B7D7D',      // Gris verdoso
  neutralLight: '#9DB5B2', // Gris claro
  
  // Utilidades
  background: '#F5F7F0',   // Fondo con toque verde claro
  white: '#FFFFFF',
  black: '#2A2A2A',
  error: '#D32F2F',
  warning: '#EBA83A',
  success: '#388E3C',
  
  // Transparencias
  transparentPrimary: 'rgba(44, 95, 45, 0.7)',
  transparentBlack: 'rgba(0, 0, 0, 0.5)',
  transparentWhite: 'rgba(255, 255, 255, 0.8)',
};

export const FONTS = {
  heading: {
    fontWeight: 'bold',
  },
  subheading: {
    fontWeight: '600',
  },
  body: {
    fontWeight: 'normal',
  },
  button: {
    fontWeight: '600',
  },
};

export const SIZES = {
  // Espaciados
  xxs: 4,
  xs: 8,
  s: 12,
  m: 16,
  l: 20,
  xl: 24,
  xxl: 32,
  
  // Tipografía
  h1: 30,
  h2: 24,
  h3: 20,
  h4: 18,
  body1: 16,
  body2: 14,
  body3: 12,
  small: 10,
  
  // Radios
  radiusXs: 4,
  radiusS: 8,
  radiusM: 12,
  radiusL: 16,
  radiusXl: 24,
  radiusRound: 999,
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
};

export default { COLORS, FONTS, SIZES, SHADOWS };

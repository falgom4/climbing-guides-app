import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

type LogoProps = {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
};

/**
 * Componente del Logo de Khamai (iguana)
 * Hasta que se cree un logo SVG real, usamos un emoji de iguana
 */
const Logo = ({ size = 'medium', showText = true }: LogoProps) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return {
          container: 40,
          font: 24,
          text: 16,
        };
      case 'medium':
        return {
          container: 80,
          font: 45,
          text: 24,
        };
      case 'large':
        return {
          container: 120,
          font: 70,
          text: 32,
        };
      default:
        return {
          container: 80,
          font: 45,
          text: 24,
        };
    }
  };

  const sizeConfig = getSize();

  return (
    <View style={styles.logoWrapper}>
      <View
        style={[
          styles.logoContainer,
          {
            width: sizeConfig.container,
            height: sizeConfig.container,
            borderRadius: sizeConfig.container / 2,
          },
        ]}
      >
        <Text style={[styles.logoSymbol, { fontSize: sizeConfig.font }]}>🦎</Text>
      </View>
      
      {showText && (
        <Text style={[styles.logoText, { fontSize: sizeConfig.text }]}>
          Khamai
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logoWrapper: {
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    // Aplicar sombra
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  logoSymbol: {
    marginTop: -5, // Ajuste para centrar el emoji
  },
  logoText: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default Logo;
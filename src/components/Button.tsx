import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) => {
  // Configurar estilos según la variante
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: styles.primaryContainer,
          text: styles.primaryText,
          loadingColor: COLORS.white,
        };
      case 'secondary':
        return {
          container: styles.secondaryContainer,
          text: styles.secondaryText,
          loadingColor: COLORS.white,
        };
      case 'accent':
        return {
          container: styles.accentContainer,
          text: styles.accentText,
          loadingColor: COLORS.white,
        };
      case 'outline':
        return {
          container: styles.outlineContainer,
          text: styles.outlineText,
          loadingColor: COLORS.primary,
        };
      default:
        return {
          container: styles.primaryContainer,
          text: styles.primaryText,
          loadingColor: COLORS.white,
        };
    }
  };

  // Configurar estilos según el tamaño
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return styles.smallContainer;
      case 'medium':
        return styles.mediumContainer;
      case 'large':
        return styles.largeContainer;
      default:
        return styles.mediumContainer;
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      style={[
        styles.baseContainer,
        variantStyles.container,
        sizeStyles,
        disabled && styles.disabledContainer,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={variantStyles.loadingColor}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.baseText,
            variantStyles.text,
            disabled && styles.disabledText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radiusM,
  },
  primaryContainer: {
    backgroundColor: COLORS.primary,
  },
  secondaryContainer: {
    backgroundColor: COLORS.secondary,
  },
  accentContainer: {
    backgroundColor: COLORS.accent,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  disabledContainer: {
    backgroundColor: COLORS.neutralLight,
    borderColor: COLORS.neutralLight,
  },
  smallContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  mediumContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  largeContainer: {
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  baseText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.white,
  },
  accentText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary,
  },
  disabledText: {
    color: COLORS.neutral,
  },
});

export default Button;
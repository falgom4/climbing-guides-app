import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import Logo from '../components/Logo';

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <Logo size="small" showText={false} />
            <Text style={styles.title}>Khamai</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>¡Hola, Escalador!</Text>
          <Text style={styles.subtitle}>Descubre las mejores rutas de escalada</Text>
        </View>
        
        <View style={styles.searchSection}>
          <TouchableOpacity 
            style={styles.searchBar}
            onPress={() => navigation.navigate('Search')}
          >
            <Ionicons name="search" size={20} color={COLORS.neutral} />
            <Text style={styles.searchPlaceholder}>Buscar rutas, ubicaciones...</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Rutas Destacadas</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredContent}
          >
            {/* Placeholders para rutas destacadas */}
            <View style={styles.routeCard}>
              <View style={styles.routeImagePlaceholder}>
                <Text style={styles.placeholderText}>Imagen</Text>
              </View>
              <View style={styles.routeInfo}>
                <Text style={styles.routeName}>El Potrero Chico</Text>
                <Text style={styles.routeLocation}>Hidalgo, Nuevo León</Text>
                <View style={styles.routeStats}>
                  <Text style={styles.routeDifficulty}>5.7 - 5.14a</Text>
                  <Text style={styles.routeCount}>27 rutas</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.routeCard}>
              <View style={styles.routeImagePlaceholder}>
                <Text style={styles.placeholderText}>Imagen</Text>
              </View>
              <View style={styles.routeInfo}>
                <Text style={styles.routeName}>El Chorro</Text>
                <Text style={styles.routeLocation}>Málaga, España</Text>
                <View style={styles.routeStats}>
                  <Text style={styles.routeDifficulty}>6a - 8c</Text>
                  <Text style={styles.routeCount}>32 rutas</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categorías</Text>
          <View style={styles.categoriesGrid}>
            <TouchableOpacity style={styles.categoryButton}>
              <View style={[styles.categoryIcon, { backgroundColor: COLORS.primary }]}>
                <Ionicons name="trail-sign-outline" size={24} color={COLORS.white} />
              </View>
              <Text style={styles.categoryText}>Tradicional</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryButton}>
              <View style={[styles.categoryIcon, { backgroundColor: COLORS.secondary }]}>
                <Ionicons name="trending-up-outline" size={24} color={COLORS.white} />
              </View>
              <Text style={styles.categoryText}>Deportiva</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryButton}>
              <View style={[styles.categoryIcon, { backgroundColor: COLORS.tertiary }]}>
                <Ionicons name="cube-outline" size={24} color={COLORS.white} />
              </View>
              <Text style={styles.categoryText}>Boulder</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryButton}>
              <View style={[styles.categoryIcon, { backgroundColor: COLORS.accent }]}>
                <Ionicons name="layers-outline" size={24} color={COLORS.white} />
              </View>
              <Text style={styles.categoryText}>Multipitch</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.subscriptionBanner}>
          <Text style={styles.bannerTitle}>Accede a todo el contenido</Text>
          <Text style={styles.bannerText}>Suscríbete para descargar guías y acceder offline</Text>
          <TouchableOpacity 
            style={styles.subscribeButton}
            onPress={() => navigation.navigate('Subscription')}
          >
            <Text style={styles.subscribeButtonText}>Ver Planes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: 8,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.neutral,
    marginTop: 5,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusM,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.neutralLight,
  },
  searchPlaceholder: {
    marginLeft: 10,
    color: COLORS.neutral,
    fontSize: 14,
  },
  featuredSection: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  seeAllText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  featuredContent: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  routeCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusM,
    width: 250,
    marginRight: 15,
    overflow: 'hidden',
    ...COLORS.SHADOWS.small,
  },
  routeImagePlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: COLORS.neutralLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: COLORS.neutral,
    fontSize: 14,
  },
  routeInfo: {
    padding: 12,
  },
  routeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 4,
  },
  routeLocation: {
    fontSize: 14,
    color: COLORS.neutral,
    marginBottom: 8,
  },
  routeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  routeDifficulty: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '500',
  },
  routeCount: {
    fontSize: 12,
    color: COLORS.neutral,
  },
  categoriesSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  categoryButton: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusM,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    ...COLORS.SHADOWS.small,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
  },
  subscriptionBanner: {
    margin: 20,
    padding: 20,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusM,
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  bannerText: {
    fontSize: 14,
    color: COLORS.lightGreen,
    marginBottom: 15,
    textAlign: 'center',
  },
  subscribeButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: SIZES.radiusS,
  },
  subscribeButtonText: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default HomeScreen;
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useSubscription } from '../context/SubscriptionContext';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  GuideDetail: { guideId: string };
  Subscription: undefined;
};

const { width } = Dimensions.get('window');
const cardWidth = width * 0.65;

const HomeScreen = () => {
  const { user } = useAuth();
  const { availableGuides, userSubscription, subscriptionPlans } = useSubscription();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Seleccionar las guías destacadas
  const featuredGuides = availableGuides.slice(0, 3);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabecera con bienvenida */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Bienvenido,</Text>
          <Text style={styles.userName}>{user?.name || 'Escalador'}</Text>
        </View>
        {userSubscription !== 'free' ? (
          <View style={styles.premiumBadge}>
            <Ionicons name="star" size={14} color="#fff" />
            <Text style={styles.premiumText}>Premium</Text>
          </View>
        ) : null}
      </View>

      {/* Banner de suscripción para usuarios gratuitos */}
      {userSubscription === 'free' && (
        <TouchableOpacity 
          style={styles.subscriptionBanner}
          onPress={() => navigation.navigate('Subscription')}
        >
          <View style={styles.bannerContent}>
            <Ionicons name="flash" size={24} color="#fff" />
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerTitle}>Actualiza a Premium</Text>
              <Text style={styles.bannerText}>
                Accede a todas las guías de escalada y descárgalas para uso offline
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Sección de guías destacadas */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Guías destacadas</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Guides')}>
            <Text style={styles.seeAllText}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.featuredGuidesContainer}
        >
          {featuredGuides.map((guide) => (
            <TouchableOpacity
              key={guide.id}
              style={styles.featuredGuideCard}
              onPress={() => navigation.navigate('GuideDetail', { guideId: guide.id })}
            >
              <Image source={guide.imagePath} style={styles.featuredGuideImage} />
              <View style={styles.featuredGuideOverlay}>
                <Text style={styles.featuredGuideTitle}>{guide.title}</Text>
                {guide.isDownloaded && (
                  <View style={styles.downloadedIndicator}>
                    <Ionicons name="download" size={14} color="#fff" />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Consejos de seguridad */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Consejos de seguridad</Text>
        
        <View style={styles.safetyTipsContainer}>
          <View style={styles.safetyTipCard}>
            <View style={styles.safetyTipIconContainer}>
              <Ionicons name="fitness" size={24} color="#E73142" />
            </View>
            <Text style={styles.safetyTipTitle}>Revisa tu equipo</Text>
            <Text style={styles.safetyTipText}>
              Siempre verifica tu equipo antes de escalar
            </Text>
          </View>
          
          <View style={styles.safetyTipCard}>
            <View style={styles.safetyTipIconContainer}>
              <Ionicons name="people" size={24} color="#E73142" />
            </View>
            <Text style={styles.safetyTipTitle}>Escala acompañado</Text>
            <Text style={styles.safetyTipText}>
              Nunca escales solo, siempre con un compañero
            </Text>
          </View>
          
          <View style={styles.safetyTipCard}>
            <View style={styles.safetyTipIconContainer}>
              <Ionicons name="sunny" size={24} color="#E73142" />
            </View>
            <Text style={styles.safetyTipTitle}>Clima adecuado</Text>
            <Text style={styles.safetyTipText}>
              Verifica las condiciones climáticas antes de salir
            </Text>
          </View>
        </View>
      </View>

      {/* Espacio al final */}
      <View style={styles.footer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  premiumBadge: {
    flexDirection: 'row',
    backgroundColor: '#E73142',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  premiumText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  subscriptionBanner: {
    backgroundColor: '#E73142',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerContent: {
    flexDirection: 'row',
    flex: 1,
  },
  bannerTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  bannerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  bannerText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#E73142',
  },
  featuredGuidesContainer: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  featuredGuideCard: {
    width: cardWidth,
    height: 160,
    marginRight: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  featuredGuideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredGuideOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredGuideTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  downloadedIndicator: {
    backgroundColor: 'rgba(76, 175, 80, 0.8)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safetyTipsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  safetyTipCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  safetyTipIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(231, 49, 66, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  safetyTipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  safetyTipText: {
    fontSize: 12,
    color: '#666',
  },
  footer: {
    height: 20,
  },
});

export default HomeScreen;
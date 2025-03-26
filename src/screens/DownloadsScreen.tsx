import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSubscription } from '../context/SubscriptionContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  GuideDetail: { guideId: string };
};

const DownloadsScreen = () => {
  const { downloadedGuides, removeGuide, userSubscription } = useSubscription();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleDelete = (guideId: string, title: string) => {
    Alert.alert(
      'Eliminar guía',
      `¿Estás seguro de que quieres eliminar "${title}" de tus descargas?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => removeGuide(guideId),
          style: 'destructive',
        },
      ]
    );
  };

  const renderGuideItem = ({ item }: { item: any }) => (
    <View style={styles.guideItem}>
      <TouchableOpacity
        style={styles.guideContent}
        onPress={() => navigation.navigate('GuideDetail', { guideId: item.id })}
      >
        <Image source={item.imagePath} style={styles.guideImage} />
        <View style={styles.guideInfo}>
          <Text style={styles.guideTitle}>{item.title}</Text>
          <Text style={styles.guideDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={styles.guideSize}>{item.fileSize} MB</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id, item.title)}
      >
        <Ionicons name="trash-outline" size={20} color="#E73142" />
      </TouchableOpacity>
    </View>
  );

  if (userSubscription === 'free') {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="lock-closed" size={60} color="#ccc" />
        <Text style={styles.emptyTitle}>Función Premium</Text>
        <Text style={styles.emptyText}>
          Actualiza a una suscripción premium para descargar guías y acceder a ellas sin conexión.
        </Text>
        <TouchableOpacity style={styles.upgradeButton}>
          <Text style={styles.upgradeButtonText}>Ver planes</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (downloadedGuides.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="download-outline" size={60} color="#ccc" />
        <Text style={styles.emptyTitle}>No tienes guías descargadas</Text>
        <Text style={styles.emptyText}>
          Las guías que descargues aparecerán aquí para acceder sin conexión.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Guías descargadas</Text>
        <View style={styles.storageContainer}>
          <Ionicons name="save-outline" size={16} color="#666" />
          <Text style={styles.storageText}>
            {downloadedGuides.reduce((total, guide) => total + guide.fileSize, 0)} MB usados
          </Text>
        </View>
      </View>

      <FlatList
        data={downloadedGuides}
        renderItem={renderGuideItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  storageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storageText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  listContent: {
    padding: 16,
  },
  guideItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  guideContent: {
    flex: 1,
    flexDirection: 'row',
  },
  guideImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  guideInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  guideDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  guideSize: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  upgradeButton: {
    backgroundColor: '#E73142',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  upgradeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DownloadsScreen;
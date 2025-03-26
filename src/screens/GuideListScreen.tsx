import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSubscription } from '../context/SubscriptionContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  GuideDetail: { guideId: string };
};

type Guide = {
  id: string;
  title: string;
  description: string;
  imagePath: any;
  isDownloaded: boolean;
  fileSize: number;
};

const GuideListScreen = () => {
  const { availableGuides, downloadGuide, isDownloading, userSubscription } = useSubscription();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Filtrar guías según la búsqueda y el tipo de filtro
  const filteredGuides = availableGuides.filter((guide) => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'downloaded') return matchesSearch && guide.isDownloaded;
    
    return matchesSearch;
  });

  const handleDownload = async (guide: Guide) => {
    if (userSubscription === 'free') {
      // Mostrar opciones de suscripción si es usuario gratuito
      alert('Necesitas una suscripción premium para descargar guías offline.');
      return;
    }
    
    try {
      await downloadGuide(guide.id);
    } catch (error) {
      console.error('Error al descargar:', error);
    }
  };

  const renderGuideItem = ({ item }: { item: Guide }) => (
    <TouchableOpacity 
      style={styles.guideItem}
      onPress={() => navigation.navigate('GuideDetail', { guideId: item.id })}
    >
      <Image source={item.imagePath} style={styles.guideImage} />
      <View style={styles.guideInfo}>
        <Text style={styles.guideTitle}>{item.title}</Text>
        <Text style={styles.guideDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.guideFooter}>
          <Text style={styles.guideSize}>{item.fileSize} MB</Text>
          
          {item.isDownloaded ? (
            <View style={styles.downloadedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="white" />
              <Text style={styles.downloadedText}>Descargada</Text>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.downloadButton}
              onPress={() => handleDownload(item)}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <>
                  <Ionicons name="cloud-download-outline" size={16} color="white" />
                  <Text style={styles.downloadText}>Descargar</Text>
                </>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar guías..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'all' && styles.activeFilter]}
          onPress={() => setFilterType('all')}
        >
          <Text style={[styles.filterText, filterType === 'all' && styles.activeFilterText]}>
            Todas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'downloaded' && styles.activeFilter]}
          onPress={() => setFilterType('downloaded')}
        >
          <Text style={[styles.filterText, filterType === 'downloaded' && styles.activeFilterText]}>
            Descargadas
          </Text>
        </TouchableOpacity>
      </View>

      {filteredGuides.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="map-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>No se encontraron guías</Text>
          <Text style={styles.emptySubtext}>
            Intenta con otra búsqueda o cambia los filtros
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredGuides}
          renderItem={renderGuideItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 46,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeFilter: {
    backgroundColor: '#E73142',
    borderColor: '#E73142',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  guideItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  guideImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  guideInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  guideDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  guideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  guideSize: {
    fontSize: 12,
    color: '#999',
  },
  downloadButton: {
    flexDirection: 'row',
    backgroundColor: '#E73142',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  downloadText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  downloadedBadge: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  downloadedText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default GuideListScreen;
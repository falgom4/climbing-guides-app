import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import Button from '../../components/Button';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  
  const onboardingData = [
    {
      id: '1',
      title: 'Descubre rutas de escalada',
      description: 'Explora guías de escalada detalladas en todo el mundo.',
      image: null, // Aquí iría la imagen real
    },
    {
      id: '2',
      title: 'Guías offline',
      description: 'Descarga tus guías favoritas para acceder sin conexión a internet.',
      image: null, // Aquí iría la imagen real
    },
    {
      id: '3',
      title: 'Comunidad de escaladores',
      description: 'Conecta con otros escaladores y comparte tus experiencias.',
      image: null, // Aquí iría la imagen real
    },
  ];
  
  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      // Última pantalla, ir a la pantalla de inicio de sesión
      navigation.navigate('Login');
    }
  };
  
  const handleSkip = () => {
    navigation.navigate('Login');
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <View style={styles.imageContainer}>
        {item.image ? (
          <Image source={item.image} style={styles.image} resizeMode="contain" />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>Imagen</Text>
          </View>
        )}
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
  
  const renderDots = () => {
    return onboardingData.map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          { backgroundColor: index === currentIndex ? '#3498db' : '#bdc3c7' },
        ]}
      />
    ));
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.skipButton}
        onPress={handleSkip}
      >
        <Text style={styles.skipText}>Omitir</Text>
      </TouchableOpacity>
      
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
      
      <View style={styles.footer}>
        <View style={styles.dotsContainer}>{renderDots()}</View>
        
        <Button
          title={currentIndex === onboardingData.length - 1 ? 'Comenzar' : 'Siguiente'}
          onPress={handleNext}
          style={styles.nextButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    color: '#7f8c8d',
    fontSize: 16,
    fontWeight: '500',
  },
  slide: {
    width,
    alignItems: 'center',
    padding: 20,
    paddingTop: 100,
  },
  imageContainer: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#bdc3c7',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  nextButton: {
    width: 200,
  },
});

export default OnboardingScreen;
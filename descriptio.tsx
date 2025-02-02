import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRoute, RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Description: { animeName: string };
};

type DescriptionRouteProp = RouteProp<RootStackParamList, 'Description'>;

const Description = () => {
  const route = useRoute<DescriptionRouteProp>();
  const { animeName } = route.params;
  const [animeDetails, setAnimeDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://anime-db.p.rapidapi.com/anime/details?name=`, {
          headers: {
            'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY',
            'x-rapidapi-host': 'anime-db.p.rapidapi.com',
          },
        });
        setAnimeDetails(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [animeName]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (!animeDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Anime details not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: animeDetails.poster }} style={styles.animePoster} />
      <Text style={styles.title}>{animeDetails.name}</Text>
      <Text style={styles.description}>{animeDetails.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  animePoster: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  description: {
    marginTop: 15,
    fontSize: 16,
    lineHeight: 22,
  },
});

export default Description;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Description from './description';

type RootStackParamList = {
  Home: undefined;
  AnimeDetails: undefined;
  AnimeSearch: { animeName: string };
};

type AnimeDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'AnimeDetails'>;

const AnimeDetails = () => {
  const [animeData, setAnimeData] = useState<any>({ latest: [], spotlight: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation<AnimeDetailsNavigationProp>();

  useEffect(() => {
    const fetchAnimeData = async () => {
      setLoading(true);
      setError(null);

      const options = {
        method: 'GET',
        url: 'https://hianime.p.rapidapi.com/anime/home',
        headers: {
          'x-rapidapi-key': '2895ff6f91msh7298b0c84c19016p1c8140jsndcc1a1c62ea9',
          'x-rapidapi-host': 'hianime.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        if (response.data && (response.data.latestEpisodeAnimes.length > 0 || response.data.spotlightAnimes.length > 0)) {
          setAnimeData({
            latest: response.data.latestEpisodeAnimes || [],
            spotlight: response.data.spotlightAnimes || [],
          });
        } else {
          setError('No anime data available.');
        }
      } catch (err) {
        setError('Failed to fetch anime data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const handlePressAnime = (animeName: string) => {
    navigation.navigate('AnimeSearch', { animeName });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Home Page</Text>

      <Text style={styles.sectionTitle}>Latest Episodes</Text>
      <ScrollView horizontal={true} style={styles.horizontalScroll}>
        {animeData.latest.map((anime: any, index: number) => (
          <TouchableOpacity key={index} onPress={() => handlePressAnime(anime.name)} style={styles.animeCard}>
            <Image source={{ uri: anime.poster }} style={styles.animePoster} />
            <Text style={styles.animeName}>{anime.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Spotlight Animes</Text>
      {animeData.spotlight.map((anime: any, index: number) => (
        <TouchableOpacity key={index} onPress={() => handlePressAnime(anime.name)} style={styles.animeCard}>
          <Image source={{ uri: anime.poster }} style={styles.animePoster} />
          <Text style={styles.animeName}>{anime.name}</Text>
          <Text style={styles.animeText}>{anime.description}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color:'white',
    padding: 16,
    backgroundColor: '#090c08', 
  },
  loadingContainer: {
    color:'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  errorText: {
    color:'white',
    fontSize: 18,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    color:'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    color:'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  horizontalScroll: {
    color:'white',
    marginVertical: 10,
    
  },
  animeCard: {
    marginRight: 15,
    padding: 10,
    borderWidth: 1,
    backgroundColor:'#181d21',
    borderRadius: 10,
    borderColor: '#ddd',
    alignItems: 'center',
    width: 370,
    color:'white',
    marginBottom: 20,
    marginVertical:10,
  },
  animeName: {
    color:'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  animePoster: {
    color:'white',
    width: 250,
    height: 350, 
    marginBottom: 10, 
  },
  animeText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 10, 
  },

});

export default AnimeDetails;

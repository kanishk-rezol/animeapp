import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

interface Anime {
  node: {
    id: number;
    title: string;
  };
}

const App: React.FC = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAnime = async () => {
    try {
      const response = await fetch('https://api.myanimelist.net/v2/anime?q=one&limit=4', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer YOUR_TOKEN',
        },
      });
      const data = await response.json();
      setAnimeList(data.data || []); // Set the retrieved anime data
      setLoading(false);
    } catch (error) {
      console.error('Error fetching anime:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime();
  }, []);

  const renderItem = ({ item }: { item: Anime }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.node.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={animeList}
          renderItem={renderItem}
          keyExtractor={(item) => item.node.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;

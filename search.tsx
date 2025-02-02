import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, Keyboard } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
  const navigation = useNavigation(); // Hook for navigation
  const [query, setQuery] = useState('');
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false); // State to control search bar visibility

  const searchAnime = async () => {
    if (!query) {
      setError('Please enter a search term.');
      return;
    }

    setLoading(true);
    setError(null);

    const options = {
      method: 'GET',
      url: 'https://myanimelist.p.rapidapi.com/v2/anime/search',
      params: {
        q: query,
        n: '50', // Number of results
        score: '8', // Minimum score
        genre: '1,2', // Example genre IDs
      },
      headers: {
        'x-rapidapi-key': '2895ff6f91msh7298b0c84c19016p1c8140jsndcc1a1c62ea9',
        'x-rapidapi-host': 'myanimelist.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      console.log('API Response:', response.data); // Log the full response
      setAnimeList(response.data); // Directly set the animeList with the response data
    } catch (err) {
      setError('Failed to fetch anime. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleItemPress = (item: any) => {
    navigation.navigate('Description', { anime: item });
  };

  const handleSearchIconPress = () => {
    // Reset the search state
    setQuery('');
    setAnimeList([]); // Clear the anime list results
    setError(null); // Clear any error message
    setShowSearch(!showSearch); // Toggle the search bar visibility
    Keyboard.dismiss(); // Dismiss the keyboard when the search icon is pressed
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item)}>
      <Image source={{ uri: item?.picture_url }} style={styles.itemImage} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item?.title || 'No Title'}</Text>
        <Text style={styles.itemDetails}>Score: {item?.score || 'N/A'}</Text>
        <Text style={styles.itemDetails}>Genres: {item?.genres?.join(', ') || 'N/A'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Icon */}
      <TouchableOpacity onPress={handleSearchIconPress} style={styles.searchIconContainer}>
        <Icon name="search" size={30} color="#000" />
      </TouchableOpacity>

      {/* Conditionally Render Search Bar */}
      {showSearch && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search Anime (e.g., One Piece)"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={searchAnime} // Trigger search when "Enter" is pressed
          />
          <Button title="Search" onPress={searchAnime} />
        </View>
      )}

      {loading && <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={animeList}
        keyExtractor={(item, index) => item?.myanimelist_id?.toString() || index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchIconContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 10,
  },
  searchContainer: {
    marginTop: 10, // Add space above the search bar
    marginBottom: 20, // Add space below the search bar
    flexDirection: 'row', // Align elements in a row
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 10, // Space between search bar and button
  },
  loader: {
    marginVertical: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  itemImage: {
    width: 60,
    height: 90,
    borderRadius: 8,
  },
  itemTextContainer: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDetails: {
    fontSize: 14,
    color: '#555',
  },
  errorText: {
    color: 'red',
    marginVertical: 8,
    textAlign: 'center',
  },
});

export default Search;

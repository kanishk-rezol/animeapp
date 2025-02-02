import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from 'react-native-vector-icons';
import AnimeDetails from './AnimeDetails';
import AnimeEpisode from './AnimeEpisode';
import Search from './search';
import AnimeSearch from './description';

// Update RootStackParamList to include all stack screens
type RootStackParamList = {
  Home: undefined; // Add Home to the stack
  AnimeDetails: undefined;
  Description: { animeName: string }; // The name of the screen is 'Description'
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <SafeAreaView style={styles.homeContainer}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Search />
      <AnimeDetails />
    </ScrollView>
  </SafeAreaView>
);

const ProfileScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.text}>Profile Screen</Text>
  </SafeAreaView>
);

const SettingsScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.text}>Settings Screen</Text>
  </SafeAreaView>
);

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarActiveTintColor: '#6200ee',
      tabBarInactiveTintColor: 'gray',
      tabBarPosition: 'bottom',
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="settings" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Home screen is now rendered as a screen using TabNavigator */}
        <Stack.Screen name="Home" options={{ headerShown: false }} component={TabNavigator} />
        <Stack.Screen name="AnimeDetails" component={AnimeDetails} />
        <Stack.Screen name="Description" component={AnimeSearch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

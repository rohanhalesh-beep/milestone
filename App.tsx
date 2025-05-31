import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import HomeScreen from './screens/HomeScreen';

export type RootStackParamList = {
  Home: undefined;
  Profile: { user?: any };
  // Add other screens here
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#4285f4',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ 
              title: 'Google Sign-In Demo',
            }}
          />
          {/* <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ 
              title: 'Profile',
            }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

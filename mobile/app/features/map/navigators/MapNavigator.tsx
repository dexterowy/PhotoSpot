import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '../screens/MapScreen';
import SpotDetailsScreen from '../../spots/screens/SpotDetailsScreen';

const Stack = createNativeStackNavigator();

const MapNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Map/Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Map/SpotDetails" component={SpotDetailsScreen} />
    </Stack.Navigator>
  );
};

export default MapNavigator;

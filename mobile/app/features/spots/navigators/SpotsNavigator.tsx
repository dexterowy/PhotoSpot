import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SpotsScreen from '../screens/SpotsScreen';
import SpotDetailsScreen from '../screens/SpotDetailsScreen';

const Stack = createNativeStackNavigator();

const SpotsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Spots/SpotsList"
        component={SpotsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Spots/SpotDetails"
        component={SpotDetailsScreen}
        options={{ title: 'Spot details' }}
      />
    </Stack.Navigator>
  );
};

export default SpotsNavigator;

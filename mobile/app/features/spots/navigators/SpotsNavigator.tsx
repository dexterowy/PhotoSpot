import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SpotsScreen from '../screens/SpotsScreen';
// import SpotDetailsScreen from '../screens/SpotDetailsScreen';
// import CreateReviewScreen from '../../reviews/screens/CreateReviewScreen';
import SpotNavigator from './SpotNavigator';

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
        name="Spots/Spot"
        component={SpotNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SpotsNavigator;

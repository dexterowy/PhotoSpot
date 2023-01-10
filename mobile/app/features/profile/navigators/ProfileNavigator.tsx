import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CollectionsNavigator from '../../collections/navigators/CollectionsNavigator';
import SpotNavigator from '../../spots/navigators/SpotNavigator';
import MySpotsScreen from '../screens/MySpotsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const ProfileNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Profile/Profile'}
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name={'Profile/MySpotsList'}
        component={MySpotsScreen}
        options={{
          title: 'My spots',
        }}
      />
      <Stack.Screen
        name={'Profile/MySpotDetails'}
        component={SpotNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'Profile/Collections'}
        component={CollectionsNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;

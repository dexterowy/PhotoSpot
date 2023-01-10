import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, useTheme } from '@rneui/themed';
import React from 'react';
import MapNavigator from '../features/map/navigators/MapNavigator';
import ProfileNavigator from '../features/profile/navigators/ProfileNavigator';
import SettingsScreen from '../features/settings/screens/SettingsScreen';
import CreateSpotNavigator from '../features/spots/navigators/CreateSpotNavigator';
import SpotsNavigator from '../features/spots/navigators/SpotsNavigator';
import SpotsScreen from '../features/spots/screens/SpotsScreen';

const Tab = createBottomTabNavigator();

const ProtectedNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Spots"
        component={SpotsNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              name="location-on"
              color={focused ? theme.colors.primary : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon name="map" color={focused ? theme.colors.primary : 'gray'} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateSpotNavigator}
        options={{
          tabBarIcon: () => (
            <Icon name="add-circle" color={theme.colors.secondary} />
          ),
          tabBarLabelStyle: {
            color: theme.colors.secondary,
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              name="person"
              color={focused ? theme.colors.primary : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="settings"
              color={focused ? theme.colors.primary : 'gray'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ProtectedNavigator;

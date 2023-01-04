import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, useTheme } from '@rneui/themed';
import React from 'react';
import SettingsScreen from '../features/settings/screens/SettingsScreen';
import SpotsScreen from '../features/spots/screens/SpotsScreen';

const Tab = createBottomTabNavigator();

const ProtectedNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Spots"
        component={SpotsScreen}
        options={{
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
        component={SpotsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="map" color={focused ? theme.colors.primary : 'gray'} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={SpotsScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="add-circle" color={theme.colors.secondary} />
          ),
          tabBarLabelStyle: {
            color: theme.colors.secondary,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SpotsScreen}
        options={{
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

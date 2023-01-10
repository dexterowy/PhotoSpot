import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SpotDetailsScreen from '../screens/SpotDetailsScreen';
import CreateReviewScreen from '../../reviews/screens/CreateReviewScreen';
import { useNavigation } from '@react-navigation/native';
import { Button, Icon, useTheme } from '@rneui/themed';
import { HeaderBackButton } from '@react-navigation/elements';

const Stack = createNativeStackNavigator();
const SpotNavigator = () => {
  const { goBack } = useNavigation();
  const { theme } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Spot/SpotDetails"
        component={SpotDetailsScreen}
        options={{
          title: 'Spot details',
          headerLeft: () => (
            <HeaderBackButton onPress={goBack} label={'Back'} labelVisible />
          ),
        }}
      />
      <Stack.Screen
        name="Spot/CreateReview"
        component={CreateReviewScreen}
        options={{
          title: 'Create review',
        }}
      />
    </Stack.Navigator>
  );
};

export default SpotNavigator;

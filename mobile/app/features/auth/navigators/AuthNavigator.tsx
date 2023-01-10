import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Login'}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={'Registration'} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

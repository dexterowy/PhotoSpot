import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from '../features/auth/navigators/AuthNavigator';
import { useAuth } from '../features/auth/hooks/useAuth';
import ProtectedNavigator from './ProtectedNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const auth = useAuth();

  return (
    <Stack.Navigator>
      {!auth.isAuth ? (
        <>
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Home"
          component={ProtectedNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;

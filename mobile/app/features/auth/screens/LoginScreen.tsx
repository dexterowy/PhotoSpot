import { View } from 'react-native';
import React from 'react';
import { Image, Text } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginForm from '../components/forms/LoginForm';

const LoginScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 32,
            flexDirection: 'column',
          }}>
          <Image
            source={{
              uri: 'https://via.placeholder.com/150',
              width: 150,
              height: 150,
            }}
            style={{ width: 150, height: 150 }}
          />
          <Text h4 style={{ padding: 8 }}>
            PhotoSpot
          </Text>
          <Text>Take it here.</Text>
          <LoginForm />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

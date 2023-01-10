import { ScrollView, View } from 'react-native';
import React from 'react';
import { Image, Text } from '@rneui/themed';
import RegisterForm from '../components/forms/RegisterForm';

const SignUpScreen = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
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
          Join our community!
        </Text>
        <RegisterForm />
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

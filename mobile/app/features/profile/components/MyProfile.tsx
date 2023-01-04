import { View, Text } from 'react-native';
import React from 'react';
import { useGetMyProfileQuery } from '../api/profileApi';

const MyProfile = () => {
  const { data: profile } = useGetMyProfileQuery({});
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{profile || 'Maybe it will work'}</Text>
    </View>
  );
};

export default MyProfile;

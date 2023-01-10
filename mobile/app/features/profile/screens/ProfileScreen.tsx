import { View } from 'react-native';
import React from 'react';
import { ListItem, Text } from '@rneui/themed';
import { Icon } from '@rneui/base';
import { useGetMyProfileQuery } from '../api/profileApi';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const { data: profile } = useGetMyProfileQuery();
  const { navigate } = useNavigation();
  return (
    <View>
      <View style={{ justifyContent: 'center', margin: 16 }}>
        <Icon name="person" size={64} />
        <Text h3 style={{ textAlign: 'center' }}>
          {profile?.nickname}
        </Text>
        {/* <Text>{JSON.stringify(profile, null, 2)}</Text> */}
      </View>
      <ListItem onPress={() => navigate('Profile/Collections')}>
        <ListItem.Content>
          <ListItem.Title>Collections</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => navigate('Profile/MySpotsList')} topDivider>
        <ListItem.Content>
          <ListItem.Title>My spots</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );
};

export default ProfileScreen;

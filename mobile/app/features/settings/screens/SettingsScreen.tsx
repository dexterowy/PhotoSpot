import { View, Text } from 'react-native';
import React from 'react';
import { Button } from '@rneui/themed';
import { useAppDispatch } from '../../../hooks/storeHooks';
import { logout } from '../../auth/store/authReducer';

const SettingsScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <View>
      <Text>SettingsScreen</Text>
      <Button
        title={'Logout'}
        color={'error'}
        onPress={() => dispatch(logout())}
      />
    </View>
  );
};

export default SettingsScreen;

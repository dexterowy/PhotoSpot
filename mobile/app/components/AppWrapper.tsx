import { StatusBar, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from '../features/auth/store/authReducer';
import * as BootSplash from 'react-native-bootsplash';

type Props = {
  children: React.ReactNode;
};

const AppWrapper = ({ children }: Props) => {
  const dispatch = useDispatch();

  const [isInitilizingApp, setIsInitializingApp] = useState(true);

  const init = useCallback(async () => {
    const access_token = await AsyncStorage.getItem('@access_token');
    if (access_token) {
      await dispatch(loginSuccess(access_token));
    }
    setIsInitializingApp(false);
    await BootSplash.hide({
      fade: true,
      duration: 500,
    });
  }, [dispatch]);

  useEffect(() => {
    init();
  }, [init]);

  if (isInitilizingApp) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle={'dark-content'} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default AppWrapper;

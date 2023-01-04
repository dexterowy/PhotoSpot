import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from '../../../store';
import { loginSuccess } from './authReducer';

export const loginAction = (token: string) => async (dispatch: AppDispatch) => {
  dispatch(loginSuccess(token));
  await AsyncStorage.setItem('@access_token', token);
};

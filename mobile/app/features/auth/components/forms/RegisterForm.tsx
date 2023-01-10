import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button } from '@rneui/themed';
import { useForm } from 'react-hook-form';
import FormTextInput from '../../../../components/form/FormTextInput';
import FormPasswordInput from '../../../../components/form/FormPasswordInput';
import { authApi } from '../../api/authApi';
import { useAppDispatch, useAppSelector } from '../../../../hooks/storeHooks';
import { loginAction } from '../../store/authActions';
import { useNavigation } from '@react-navigation/native';

type Form = {
  email: string;
  password: string;
  repeatPassword: string;
  nickname: string;
  firstName: string;
  lastName: string;
};

const defaultValues: Form = {
  email: '',
  password: '',
  repeatPassword: '',
  nickname: '',
  firstName: '',
  lastName: '',
};

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Form>({
    defaultValues,
  });

  const { navigate } = useNavigation();
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.accessToken);

  useEffect(() => {
    console.log('token', token);
  }, [token]);

  const onSubmit = async (data: Form) => {
    try {
      await authApi.register({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        nickname: data.nickname,
      });
      // dispatch(loginAction(response.data.access_token));
      navigate('Login');
    } catch (err: any) {
      console.log(JSON.stringify(err.response.data, null, 2));
      // console.log(err.response.message);
    }
  };

  return (
    <View style={{ width: '100%' }}>
      <FormTextInput
        control={control}
        name={'firstName'}
        label={'First name'}
        placeholder={'Enter your first name'}
        textContentType={'givenName'}
        autoCorrect={false}
      />
      <FormTextInput
        control={control}
        name={'lastName'}
        label={'Last name'}
        placeholder={'Enter your last name'}
        textContentType={'familyName'}
        autoCorrect={false}
      />
      <FormTextInput
        control={control}
        name={'nickname'}
        label={'Nickname'}
        placeholder={'Enter your nickname'}
        textContentType={'nickname'}
        autoCorrect={false}
      />
      <FormTextInput
        control={control}
        name={'email'}
        label={'E-mail'}
        placeholder={'Enter your email'}
        textContentType={'emailAddress'}
        autoCapitalize={'none'}
        autoCorrect={false}
      />
      <FormPasswordInput
        control={control}
        name={'password'}
        label={'Password'}
        placeholder={'Enter password'}
      />
      <FormPasswordInput
        control={control}
        name={'repeatPassword'}
        label={'Repeat password'}
        placeholder={'Enter password again'}
      />
      <Button
        loading={isSubmitting}
        style={{ marginHorizontal: 10 }}
        onPress={handleSubmit(onSubmit)}>
        Register
      </Button>
    </View>
  );
};

export default RegisterForm;

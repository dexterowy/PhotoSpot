import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button } from '@rneui/themed';
import { useForm } from 'react-hook-form';
import FormTextInput from '../../../../components/form/FormTextInput';
import FormPasswordInput from '../../../../components/form/FormPasswordInput';
import { authApi } from '../../api/authApi';
import { useAppDispatch, useAppSelector } from '../../../../hooks/storeHooks';
import { loginAction } from '../../store/authActions';

type Form = {
  email: string;
  password: string;
};

const defaultValues: Form = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Form>({
    defaultValues,
  });

  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.accessToken);

  useEffect(() => {
    console.log('token', token);
  }, [token]);

  const onSubmit = async (data: Form) => {
    try {
      const response = await authApi.login({
        email: data.email,
        password: data.password,
      });
      dispatch(loginAction(response.data.access_token));
    } catch (err: any) {
      console.log(JSON.stringify(err.response.data, null, 2));
      // console.log(err.response.message);
    }
  };

  return (
    <View style={{ width: '100%' }}>
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
      <Button
        loading={isSubmitting}
        style={{ marginHorizontal: 10 }}
        onPress={handleSubmit(onSubmit)}>
        Login
      </Button>
      <Button type={'outline'} style={{ margin: 10 }}>
        Register
      </Button>
      <Button type={'clear'} style={{ margin: 10 }}>
        Forgot password
      </Button>
    </View>
  );
};

export default LoginForm;

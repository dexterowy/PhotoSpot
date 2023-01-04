import React, { useState } from 'react';
import TextInput from './TextInput';
import { Icon, Input } from '@rneui/themed';

const PasswordInput = (props: React.ComponentPropsWithoutRef<typeof Input>) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <TextInput
      secureTextEntry={hidePassword}
      textContentType={'password'}
      autoCapitalize={'none'}
      rightIcon={
        <Icon
          name={hidePassword ? 'visibility' : 'visibility-off'}
          onPress={() => setHidePassword(state => !state)}
        />
      }
      {...props}
    />
  );
};

export default PasswordInput;

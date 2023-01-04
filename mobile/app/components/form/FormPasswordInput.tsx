import React, { useState } from 'react';
import { Icon, Input } from '@rneui/themed';
import { Control, useController } from 'react-hook-form';

type Props = React.ComponentPropsWithoutRef<typeof Input> & {
  control: Control<any>;
  name: string;
};

const FormPasswordInput = ({ control, name, ...props }: Props) => {
  const [hidePassword, setHidePassword] = useState(true);
  const { field } = useController({ control, name, defaultValue: '' });

  return (
    <Input
      {...props}
      // ref={field.ref}
      onBlur={field.onBlur}
      onChangeText={field.onChange}
      autoCorrect={false}
      value={field.value}
      // errorMessage={error?.message}
      secureTextEntry={hidePassword}
      textContentType={'password'}
      autoCapitalize={'none'}
      rightIcon={
        <Icon
          name={hidePassword ? 'visibility' : 'visibility-off'}
          onPress={() => setHidePassword(state => !state)}
        />
      }
    />
  );
};

export default FormPasswordInput;

import React from 'react';
import { Input } from '@rneui/themed';
import { Control, useController } from 'react-hook-form';

type Props = React.ComponentPropsWithoutRef<typeof Input> & {
  control: Control<any>;
  name: string;
};

const FormTextInput = ({ control, name, ...props }: Props) => {
  const { field } = useController({ control, name, defaultValue: '' });

  return (
    <Input
      {...props}
      onBlur={field.onBlur}
      onChangeText={field.onChange}
      value={field.value}
    />
  );
};

export default FormTextInput;

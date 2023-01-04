import React from 'react';
import { Input } from '@rneui/themed';

const TextInput = (props: React.ComponentPropsWithoutRef<typeof Input>) => {
  return <Input {...props} />;
};

export default TextInput;

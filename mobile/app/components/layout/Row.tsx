import { View } from 'react-native';
import React, { ComponentProps } from 'react';

const Row = ({ style, ...props }: ComponentProps<typeof View>) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        ...style,
      }}
      {...props}
    />
  );
};

export default Row;

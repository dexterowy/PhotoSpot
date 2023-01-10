import { View } from 'react-native';
import React from 'react';
import Row from '../../../components/layout/Row';
import { Icon } from '@rneui/base';
import { Text, useTheme } from '@rneui/themed';

type Props = {
  onChange: (mark: number) => void;
  value: number;
};

const MarkInput = ({ onChange, value }: Props) => {
  const { theme } = useTheme();
  return (
    <View>
      <Text
        style={{ fontWeight: 'bold', color: theme.colors.grey3, fontSize: 16 }}>
        Rating
      </Text>
      <Row>
        <Icon
          name="star"
          onPress={() => onChange(1)}
          color={value >= 1 ? 'gold' : 'gray'}
          size={38}
        />
        <Icon
          name="star"
          onPress={() => onChange(2)}
          color={value >= 2 ? 'gold' : 'gray'}
          size={38}
        />
        <Icon
          name="star"
          onPress={() => onChange(3)}
          color={value >= 3 ? 'gold' : 'gray'}
          size={38}
        />
        <Icon
          name="star"
          onPress={() => onChange(4)}
          color={value >= 4 ? 'gold' : 'gray'}
          size={38}
        />
        <Icon
          name="star"
          onPress={() => onChange(5)}
          color={value >= 5 ? 'gold' : 'gray'}
          size={38}
        />
      </Row>
    </View>
  );
};

export default MarkInput;

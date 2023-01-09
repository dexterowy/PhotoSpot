import { View } from 'react-native';
import React from 'react';
import { Icon } from '@rneui/themed';

type Props = {
  rating: number;
};

const RatingStars = ({ rating }: Props) => {
  return (
    <View style={{ flexDirection: 'row', flexGrow: 0 }}>
      <Icon name="star" color={rating >= 1 ? 'gold' : 'gray'} />
      <Icon name="star" color={rating >= 2 ? 'gold' : 'gray'} />
      <Icon name="star" color={rating >= 3 ? 'gold' : 'gray'} />
      <Icon name="star" color={rating >= 4 ? 'gold' : 'gray'} />
      <Icon name="star" color={rating >= 5 ? 'gold' : 'gray'} />
    </View>
  );
};

export default RatingStars;

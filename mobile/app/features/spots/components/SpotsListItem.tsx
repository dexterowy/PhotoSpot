import { useNavigation } from '@react-navigation/native';
import { Card, Image, Text } from '@rneui/themed';
import React from 'react';
import { Pressable, View } from 'react-native';
import Row from '../../../components/layout/Row';
import { SpotsListEntity } from '../types/SpotsListEntity';
import RatingStars from './RatingStars';

type Props = {
  spot: SpotsListEntity;
  onPress?: () => void;
};

const SpotsListItem = (props: Props) => {
  const { spot, onPress } = props;
  const { navigate } = useNavigation();

  const handleNavigateToDetailsDefault = () =>
    navigate('Spots/Spot', {
      screen: 'Spot/SpotDetails',
      params: {
        spotId: spot.id,
      },
    });

  return (
    <Pressable onPress={onPress || handleNavigateToDetailsDefault}>
      <Card>
        <Row>
          <Image
            style={{ height: 100, width: 100, marginRight: 8 }}
            source={{ uri: spot.Photos[0]?.thumbnailUrl }}
            resizeMethod={'resize'}
            resizeMode={'contain'}
          />
          <View style={{ flex: 1, marginLeft: 4 }}>
            <Row
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                h4
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{ flex: 1 }}>
                {spot.name}
              </Text>
              <Text>(4.2 km)</Text>
            </Row>
            <Row style={{ alignItems: 'center', marginVertical: 4 }}>
              <RatingStars rating={spot.averageRate} />
              <Text style={{ marginLeft: 8 }}>{`${spot.averageRate.toPrecision(
                3,
              )}`}</Text>
            </Row>
            <Row>
              <Text>{`${spot.Reviews.length}`} Reviews</Text>
            </Row>
          </View>
        </Row>
      </Card>
    </Pressable>
  );
};

export default SpotsListItem;

import {
  ScrollView,
  RefreshControl,
  View,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useGetSpotDetailsQuery } from '../api/spotsApi';
import { Button, Icon, Text } from '@rneui/themed';
import Carousel from 'react-native-reanimated-carousel';
import RatingStars from '../components/RatingStars';
import Row from '../../../components/layout/Row';
import dayjs from 'dayjs';

const width = Dimensions.get('window').width;

const SpotDetailsScreen = () => {
  const route = useRoute();
  const {
    data: spotDetails,
    isLoading: isLoadingSpotDetails,
    refetch,
    isFetching: isFetchingSpotDetails,
  } = useGetSpotDetailsQuery({ spotId: route.params.spotId });

  if (isLoadingSpotDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isFetchingSpotDetails}
          onRefresh={refetch}
        />
      }>
      <View style={{ margin: 16 }}>
        <Text h4>{spotDetails?.name}</Text>
        <Text style={{ color: 'gray', marginTop: 8 }}>4.2 km away</Text>
        <Carousel
          loop
          width={width - 32}
          height={width / 2}
          data={spotDetails?.Photos || []}
          scrollAnimationDuration={1000}
          onSnapToItem={index => console.log('current index:', index)}
          renderItem={({ item: { thumbnailUrl } }) => (
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
              }}>
              <Image
                source={{
                  uri: thumbnailUrl,
                }}
                resizeMode="contain"
                style={{ height: '100%' }}
              />
            </View>
          )}
        />
        <Row
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 16,
          }}>
          <Row style={{ alignItems: 'center' }}>
            <RatingStars rating={spotDetails?.averageRate || 0} />
            <Text style={{ marginLeft: 8, height: '100%' }}>
              {spotDetails?.averageRate?.toPrecision(3) || 0}
            </Text>
          </Row>
          <Text
            style={{
              color: 'gray',
            }}>{`${spotDetails?.Reviews.length} Reviews`}</Text>
        </Row>
        <Row>
          <Text>
            Created by:{' '}
            <Text style={{ fontWeight: 'bold' }}>
              {spotDetails?.CreatedBy.nickname}
            </Text>
          </Text>
        </Row>

        <Row style={{ marginVertical: 16 }}>
          <Button
            title={'Navigate'}
            icon={<Icon name="near-me" color={'white'} />}
            iconRight
            type="solid"
          />
          <Button
            style={{ marginLeft: 8 }}
            title={'Add to collection'}
            icon={<Icon name="add" color={'white'} />}
            iconRight
            type="solid"
            color={'secondary'}
          />
        </Row>
        <View style={{ marginVertical: 8 }}>
          <Text h4>Description</Text>
          <Text>{spotDetails?.description}</Text>
        </View>
        <View style={{ marginVertical: 8 }}>
          <Text h4>Reviews</Text>
          {spotDetails?.Reviews.map(review => (
            <View style={{ marginVertical: 4 }}>
              <Text>
                {review.CreatedBy.nickname} at{' '}
                {dayjs(review.created_at).format('YYYY/MM/DD')}
              </Text>
              <RatingStars rating={review.mark} />
              <Text>{review.comment}</Text>
            </View>
          ))}
        </View>
        {/* <Text>{JSON.stringify(spotDetails, null, 2)}</Text> */}
      </View>
    </ScrollView>
  );
};

export default SpotDetailsScreen;

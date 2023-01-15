import {
  ScrollView,
  RefreshControl,
  View,
  Dimensions,
  Image,
  Linking,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetSpotDetailsQuery } from '../api/spotsApi';
import { Button, Icon, Text, useTheme } from '@rneui/themed';
import Carousel from 'react-native-reanimated-carousel';
import RatingStars from '../components/RatingStars';
import Row from '../../../components/layout/Row';
import dayjs from 'dayjs';
import CollectionsPickerDialog from '../../collections/components/CollectionsPickerDialog';
import { useAssignSpotToCollectionsMutation } from '../../collections/api/collectionsApi';

const width = Dimensions.get('window').width;

const SpotDetailsScreen = () => {
  const { params } = useRoute();
  const { navigate } = useNavigation();
  const { theme } = useTheme();
  const {
    data: spotDetails,
    isLoading: isLoadingSpotDetails,
    refetch,
    isFetching: isFetchingSpotDetails,
  } = useGetSpotDetailsQuery({ spotId: params.spotId });

  const [assignSpotToCollection, { isLoading }] =
    useAssignSpotToCollectionsMutation();

  const [showCollectionsDialog, setShowCollectionsDialog] = useState(false);

  const handleAddToCollectionButtonPressed = () => {
    setShowCollectionsDialog(true);
  };

  const handleRedirectToNavigationApp = async () => {
    try {
      const url = `maps:${spotDetails?.latitude},${spotDetails?.longitude}?ll=${spotDetails?.latitude},${spotDetails?.longitude}&q=${spotDetails?.name}`;
      const can = await Linking.canOpenURL(url);
      console.log(can);
      Linking.openURL(url);
      if (can) {
        console.log('can!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectCollectionToAssign = async (collectionId: string) => {
    try {
      await assignSpotToCollection({
        collectionId,
        spotId: params.spotId,
      }).unwrap();
      setShowCollectionsDialog(false);
      console.log('Assigned!');
    } catch (err: any) {
      console.log(err);
    }
  };

  if (isLoadingSpotDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isFetchingSpotDetails}
            onRefresh={refetch}
          />
        }>
        <View style={{ margin: 16 }}>
          <Text h4>{spotDetails?.name}</Text>
          <Text style={{ color: 'gray', marginVertical: 8 }}>515 km away</Text>
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
                  resizeMode="cover"
                  resizeMethod="scale"
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
              icon={
                <Icon
                  name="near-me"
                  color={'white'}
                  style={{ marginLeft: 8 }}
                />
              }
              iconRight
              type="solid"
              onPress={handleRedirectToNavigationApp}
            />
            <Button
              style={{ marginLeft: 8 }}
              title={'Add to collection'}
              icon={
                <Icon
                  name="add-circle"
                  color={'white'}
                  style={{ marginLeft: 8 }}
                />
              }
              iconRight
              type="solid"
              color={'secondary'}
              loading={isLoading}
              onPress={handleAddToCollectionButtonPressed}
            />
          </Row>
          <View style={{ marginVertical: 8 }}>
            <Text h4>Description</Text>
            <Text>{spotDetails?.description}</Text>
          </View>
          <View style={{ marginVertical: 8 }}>
            <Row
              style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Text h4>Reviews</Text>
              <Icon
                name="add-circle"
                color={theme.colors.primary}
                size={36}
                onPress={() =>
                  navigate('Spot/CreateReview', { spotId: params.spotId })
                }
              />
            </Row>
            {spotDetails?.Reviews.length ? (
              spotDetails?.Reviews.map(review => (
                <View key={review.id} style={{ marginVertical: 4 }}>
                  <Text>
                    {review.CreatedBy.nickname} at{' '}
                    {dayjs(review.created_at).format('YYYY/MM/DD')}
                  </Text>
                  <RatingStars rating={review.mark} />
                  <Text>{review.comment}</Text>
                </View>
              ))
            ) : (
              <Text style={{ textAlign: 'center', margin: 16, fontSize: 16 }}>
                No reviews. Share your toughts :)
              </Text>
            )}
          </View>
          {/* <Text>{JSON.stringify(spotDetails, null, 2)}</Text> */}
        </View>
      </ScrollView>
      <CollectionsPickerDialog
        isOpen={showCollectionsDialog}
        handleClose={() => setShowCollectionsDialog(false)}
        handleSelect={handleSelectCollectionToAssign}
      />
    </>
  );
};

export default SpotDetailsScreen;

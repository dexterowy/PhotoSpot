import { SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetCollectionDetailsQuery } from '../api/collectionsApi';
import { Icon, Text, useTheme } from '@rneui/themed';
import Row from '../../../components/layout/Row';
import TextInput from '../../../components/inputs/TextInput';
import SpotsListItem from '../../spots/components/SpotsListItem';

const CollectionSpotsListScreen = () => {
  const { params } = useRoute();
  const {
    data: collectionDetails,
    isLoading: isLoadingCollectionDetails,
    isFetching: isFetchingCollectionDetails,
    refetch,
  } = useGetCollectionDetailsQuery({
    collectionId: params.collectionId,
  });
  const { theme } = useTheme();
  const { navigate } = useNavigation();

  if (isLoadingCollectionDetails) {
    return null;
  }

  if (!collectionDetails || collectionDetails.Spots.length === 0) {
    return <Text>No spots found :(</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text h2 style={{ marginLeft: 16 }}>
        {collectionDetails.name}
      </Text>
      <Row
        style={{
          marginHorizontal: 8,
          marginTop: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <SearchBar platform="ios" /> */}
        <TextInput
          leftIcon={<Icon name="search" />}
          containerStyle={{ flex: 1 }}
          errorStyle={{ display: 'none' }}
        />
        <Icon
          name={'filter-alt'}
          color={theme.colors.primary}
          size={32}
          containerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => console.log('TODO: handle filtering')}
        />
      </Row>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isFetchingCollectionDetails}
            onRefresh={refetch}
            colors={['black']}
          />
        }>
        {collectionDetails.Spots.map(spot => (
          <SpotsListItem
            key={spot.id}
            spot={spot}
            onPress={() =>
              navigate('Profile/MySpotDetails', {
                screen: 'Spot/SpotDetails',
                params: { spotId: spot.id },
              })
            }
          />
        ))}
        {/* <Text>{JSON.stringify(spots)}</Text> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CollectionSpotsListScreen;

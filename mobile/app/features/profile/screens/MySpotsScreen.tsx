import { SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import React from 'react';
import { useGetMySpotsQuery } from '../../spots/api/spotsApi';
import { Icon, Text, useTheme } from '@rneui/themed';
import Row from '../../../components/layout/Row';
import TextInput from '../../../components/inputs/TextInput';
import SpotsListItem from '../../spots/components/SpotsListItem';
import { useNavigation } from '@react-navigation/native';

const MySpotsScreen = () => {
  const {
    data: spots,
    isLoading: isLoadingSpots,
    isFetching: isFetchingSpots,
    refetch,
  } = useGetMySpotsQuery();
  const { theme } = useTheme();
  const { navigate } = useNavigation();

  if (isLoadingSpots) {
    return null;
  }

  if (!spots || spots.length === 0) {
    return <Text>No spots found :(</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          <RefreshControl refreshing={isFetchingSpots} onRefresh={refetch} />
        }>
        {spots.map(spot => (
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

export default MySpotsScreen;

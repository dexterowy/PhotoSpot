import { RefreshControl, ScrollView } from 'react-native';
import React from 'react';
import { useGetSpotsQuery } from '../api/spotsApi';
import { Icon, SearchBar, Text, useTheme } from '@rneui/themed';
import SpotsListItem from '../components/SpotsListItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import Row from '../../../components/layout/Row';
import TextInput from '../../../components/inputs/TextInput';

const SpotsScreen = () => {
  const {
    data: spots,
    isLoading: isLoadingSpots,
    isFetching: isFetchingSpots,
    refetch,
  } = useGetSpotsQuery();
  const { theme } = useTheme();

  if (isLoadingSpots) {
    return null;
  }

  if (!spots || spots.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text h2 style={{ marginLeft: 16 }}>
          Spots ({spots?.length})
        </Text>
        <Text h4 style={{ textAlign: 'center', marginTop: 64 }}>
          There is no spots yet.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text h2 style={{ marginLeft: 16 }}>
        Spots ({spots?.length})
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
          <RefreshControl refreshing={isFetchingSpots} onRefresh={refetch} />
        }>
        {spots.map(spot => (
          <SpotsListItem key={spot.id} spot={spot} />
        ))}
        {/* <Text>{JSON.stringify(spots)}</Text> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SpotsScreen;

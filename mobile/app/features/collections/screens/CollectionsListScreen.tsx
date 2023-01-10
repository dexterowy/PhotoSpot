import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React from 'react';
import { useGetCollectionsQuery } from '../api/collectionsApi';
import CollectionsListItem from '../components/CollectionsListItem';
import TextInput from '../../../components/inputs/TextInput';
import { Icon, useTheme } from '@rneui/themed';
import Row from '../../../components/layout/Row';

const CollectionsListScreen = () => {
  const { theme } = useTheme();
  const {
    data: collections,
    isLoading: isLoadingCollections,
    isFetching: isFetchingCollections,
    refetch,
  } = useGetCollectionsQuery();

  if (isLoadingCollections) {
    return <Text>Loading...</Text>;
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
          <RefreshControl
            refreshing={isFetchingCollections}
            onRefresh={refetch}
            colors={['black']}
          />
        }>
        {collections?.map(collection => (
          <CollectionsListItem key={collection.id} collection={collection} />
        ))}
        {/* <Text>{JSON.stringify(spots)}</Text> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CollectionsListScreen;

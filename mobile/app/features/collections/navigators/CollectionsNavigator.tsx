import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@rneui/base';
import React from 'react';
import SpotNavigator from '../../spots/navigators/SpotNavigator';
import CollectionsListScreen from '../screens/CollectionsListScreen';
import CollectionSpotsListScreen from '../screens/CollectionSpotsListScreen';
import CreateCollectionScreen from '../screens/CreateCollectionScreen';

const Stack = createNativeStackNavigator();

const CollectionsNavigator = () => {
  const { goBack, navigate } = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Collections/List'}
        component={CollectionsListScreen}
        options={{
          title: 'Collections',
          headerLeft: () => (
            <HeaderBackButton onPress={goBack} label={'Back'} labelVisible />
          ),
          headerRight: () => (
            <Button
              type="clear"
              onPress={() => navigate('Collections/Create')}
              title={'Create'}
            />
          ),
        }}
      />
      <Stack.Screen
        name={'Collections/Spots'}
        component={CollectionSpotsListScreen}
        options={{
          title: 'Collection spots',
        }}
      />
      <Stack.Screen
        name={'Collections/SpotDetails'}
        component={SpotNavigator}
      />
      <Stack.Screen
        name={'Collections/Create'}
        component={CreateCollectionScreen}
        options={{
          title: 'Create collection',
        }}
      />
    </Stack.Navigator>
  );
};

export default CollectionsNavigator;

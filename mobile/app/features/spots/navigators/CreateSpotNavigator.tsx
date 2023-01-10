import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateSpotDetails from '../screens/CreateSpotDetails';
import CreateSpotLocation from '../screens/CreateSpotLocation';
import { Button } from '@rneui/themed';

const Stack = createNativeStackNavigator();

const CreateSpotNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreateSpot/Details"
        component={CreateSpotDetails}
        options={{
          title: 'Create spot',
          headerRight: () => <Button type="clear" title={'Cancel'} />,
        }}
      />
      <Stack.Screen
        name="CreateSpot/Location"
        component={CreateSpotLocation}
        options={{
          title: 'Choose spot location',
          headerRight: () => <Button type="clear" title={'Cancel'} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default CreateSpotNavigator;

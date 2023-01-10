import { ScrollView, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/base';
import { Text } from '@rneui/themed';
import CreateSpotForm from '../components/forms/CreateSpotForm';

const CreateSpotDetails = () => {
  const { setOptions, goBack } = useNavigation();

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <Button type="clear" title={'Cancel'} onPress={() => goBack()} />
      ),
    });
  }, [goBack, setOptions]);
  return (
    <ScrollView style={{ padding: 8 }}>
      <Text
        style={{
          marginHorizontal: 10,
          marginBottom: 8,
          marginTop: 8,
          fontSize: 18,
        }}>
        Tell people about your spot
      </Text>
      <CreateSpotForm />
    </ScrollView>
  );
};

export default CreateSpotDetails;

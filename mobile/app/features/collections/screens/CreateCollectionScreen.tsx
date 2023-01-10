import { View, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { useCreateCollectionMutation } from '../api/collectionsApi';
import { Button, Text } from '@rneui/themed';
import FormTextInput from '../../../components/form/FormTextInput';

type Form = {
  name: string;
  description: string;
};

const defaultValues: Form = {
  name: '',
  description: '',
};

const CreateCollectionScreen = () => {
  const { goBack } = useNavigation();
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  });
  const [createCollection, { isLoading }] = useCreateCollectionMutation();

  const onSubmit = async (values: Form) => {
    try {
      const data = {
        ...values,
      };
      await createCollection(data).unwrap();
      reset(defaultValues);
      goBack();
      console.log(data);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={{ padding: 8 }}>
      <Text
        style={{
          marginHorizontal: 10,
          marginBottom: 8,
          marginTop: 8,
          fontSize: 18,
        }}>
        Your thoughts about this spot
      </Text>
      <FormTextInput
        control={control}
        name={'name'}
        label={'Name'}
        placeholder={'Enter collection name'}
      />
      <FormTextInput
        control={control}
        name={'description'}
        label={'Description'}
        placeholder={'Enter description of this collection'}
        multiline
        numberOfLines={4}
        style={{ height: 120 }}
      />

      {/* <Text>{JSON.stringify(params, null, 2)}</Text> */}
      <Button
        title={'Create collection'}
        type="solid"
        onPress={handleSubmit(onSubmit)}
        style={{ margin: 8, width: '100%' }}
        loading={isLoading}
      />
    </ScrollView>
  );
};

export default CreateCollectionScreen;

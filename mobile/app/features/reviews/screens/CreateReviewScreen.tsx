import { View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Text } from '@rneui/themed';
import { useForm } from 'react-hook-form';
import { Asset } from 'react-native-image-picker';
import FormTextInput from '../../../components/form/FormTextInput';
import MarkInput from '../components/MarkInput';
import PhotosUploader from '../../photos/components/PhotosUploader';
import { useCreateReviewMutation } from '../api/reviewsApi';

type Form = {
  comment: string;
};

const defaultValues: Form = {
  comment: '',
};

const CreateReviewScreen = () => {
  const { params } = useRoute();
  const { goBack } = useNavigation();
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  });
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const [photos, setPhotos] = useState<Asset[]>([]);
  const [mark, setMark] = useState(1);

  const onSubmit = async (values: Form) => {
    try {
      const data = {
        ...values,
        mark,
        photos,
      };
      const spotId = params.spotId as string; //TODO: Fix routing typing...
      await createReview({ spotId, data }).unwrap();
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
      {/* <Text>CreateReviewScreen</Text> */}
      <View style={{ margin: 16 }}>
        <MarkInput value={mark} onChange={setMark} />
      </View>
      <FormTextInput
        control={control}
        name={'comment'}
        label={'Comment'}
        placeholder={'Enter comment for this review of the spot'}
        multiline
        numberOfLines={4}
        style={{ height: 120 }}
      />
      <View style={{ margin: 8 }}>
        <PhotosUploader photos={photos} onChange={setPhotos} />
      </View>
      {/* <Text>{JSON.stringify(params, null, 2)}</Text> */}
      <Button
        title={'Add review'}
        type="solid"
        onPress={handleSubmit(onSubmit)}
        style={{ margin: 8, width: '100%' }}
        loading={isLoading}
      />
    </ScrollView>
  );
};

export default CreateReviewScreen;

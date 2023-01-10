import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import FormTextInput from '../../../../components/form/FormTextInput';
import PhotosUploader from '../../../photos/components/PhotosUploader';
import { Button } from '@rneui/themed';
import { Asset } from 'react-native-image-picker';
import { useCreateSpotMutation } from '../../api/spotsApi';

type Form = {
  name: string;
  description: string;
};

const defaultValues: Form = {
  name: '',
  description: '',
};

const CreateSpotForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<Form>({
    defaultValues,
  });

  const { navigate } = useNavigation();
  const [, { isSuccess }] = useCreateSpotMutation({
    fixedCacheKey: 'create-spot-form',
  });

  const [photos, setPhotos] = useState<Asset[]>([]);

  const onSubmit = async (data: Form) => {
    try {
      navigate('CreateSpot/Location', {
        name: data.name,
        description: data.description,
        photos,
      });
    } catch (err: any) {
      console.log(JSON.stringify(err.response.data, null, 2));
      // console.log(err.response.message);
    }
  };

  useEffect(() => {
    reset(defaultValues);
    setPhotos([]);
    console.log('Succeed!');
  }, [isSuccess, reset]);

  return (
    <View style={{ marginTop: 8 }}>
      <FormTextInput
        control={control}
        name={'name'}
        label={'Spot name'}
        placeholder={'Enter name of your spot'}
      />
      <FormTextInput
        control={control}
        name={'description'}
        label={'Description'}
        placeholder={'Enter description of your spot'}
        multiline
        numberOfLines={4}
        style={{ height: 120 }}
      />
      <View style={{ margin: 8 }}>
        <PhotosUploader photos={photos} onChange={setPhotos} />
      </View>
      <Button
        title={'Next'}
        type="solid"
        style={{ margin: 8 }}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default CreateSpotForm;

import { View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Icon, Image, Text, useTheme } from '@rneui/themed';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import Row from '../../../components/layout/Row';

type Props = {
  onChange: (photos: Asset[]) => void;
  photos: Asset[];
};

const PhotosUploader = ({ onChange, photos }: Props) => {
  const { theme } = useTheme();

  // const [photos, setPhotos] = useState<Asset[]>([]);

  const handleSelectFiles = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      presentationStyle: 'fullScreen',
      selectionLimit: 10,
    });
    console.log(result.assets);
    if (result.assets) {
      onChange(result.assets);
    }
  };

  return (
    <View>
      <Text
        style={{ fontWeight: 'bold', color: theme.colors.grey3, fontSize: 16 }}>
        Add photos
      </Text>
      <Row style={{ flexWrap: 'wrap' }}>
        {photos.map(photo => (
          <Image
            key={photo.uri}
            source={{
              uri: photo.uri,
            }}
            style={{
              width: 100,
              height: 100,
              margin: 2,
            }}
            resizeMethod={'scale'}
            resizeMode={'cover'}
          />
        ))}
        <Icon
          name={'add'}
          color={'white'}
          style={{
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 2,
          }}
          backgroundColor={theme.colors.primary}
          onPress={handleSelectFiles}
        />
      </Row>
    </View>
  );
};

export default PhotosUploader;

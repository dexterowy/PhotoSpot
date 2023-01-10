import { Pressable, View } from 'react-native';
import React from 'react';
import { Card, Text, useTheme } from '@rneui/themed';
import { ColectionsListEntity } from '../types/CollectionsListEntity';
import Row from '../../../components/layout/Row';
import { useNavigation } from '@react-navigation/native';

type Props = {
  collection: ColectionsListEntity;
};

const CollectionsListItem = ({ collection }: Props) => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigate('Collections/Spots', { collectionId: collection.id })
      }>
      <Card>
        <Row>
          <Text h4>{collection.name}</Text>
        </Row>
        <Row
          style={{
            marginVertical: 8,
          }}>
          <Text
            style={{
              color: theme.colors.grey3,
            }}>{`${collection.Spots.length} spots`}</Text>
        </Row>
        <Row>
          <Text numberOfLines={3} ellipsizeMode="tail">
            {collection.description}
          </Text>
        </Row>
      </Card>
    </Pressable>
  );
};

export default CollectionsListItem;

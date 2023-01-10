import { Dialog, ListItem, Text } from '@rneui/themed';
import React, { useState } from 'react';
import { useGetCollectionsQuery } from '../api/collectionsApi';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  handleSelect: (collectionId: string) => void;
};

const CollectionsPickerDialog = ({
  handleClose,
  isOpen,
  handleSelect,
}: Props) => {
  const { data: collections, isLoading: isLoadingCollections } =
    useGetCollectionsQuery();
  return (
    <Dialog isVisible={isOpen} onBackdropPress={handleClose}>
      <Dialog.Title title="Select collection" />
      {isLoadingCollections ? (
        <Text>Loading...</Text>
      ) : (
        collections?.map(collection => (
          <ListItem
            topDivider
            key={collection.id}
            onPress={() => handleSelect(collection.id)}>
            <ListItem.Title>{collection.name}</ListItem.Title>
          </ListItem>
        ))
      )}
    </Dialog>
  );
};

export default CollectionsPickerDialog;

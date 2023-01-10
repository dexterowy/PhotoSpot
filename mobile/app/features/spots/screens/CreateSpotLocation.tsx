import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import { Button, Text, useTheme } from '@rneui/themed';
import MapView, { MapPressEvent, Marker, Region } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Icon } from '@rneui/base';
import { useCreateSpotMutation } from '../api/spotsApi';

const CreateSpotLocation = () => {
  const { theme } = useTheme();
  const { setOptions, navigate, goBack, reset } = useNavigation();
  const { params } = useRoute();
  const [createSpot, { isLoading }] = useCreateSpotMutation({
    fixedCacheKey: 'create-spot-form',
  });

  const [currentPos, setCurrentPos] = useState<{
    longitude: number;
    latitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);

  const [selectedPos, setSelctedPos] = useState<{
    longitude: number;
    latitude: number;
  } | null>(null);

  useEffect(() => {
    const watchID = Geolocation.watchPosition(position => {
      setCurrentPos({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    });

    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <Button type="clear" title={'Cancel'} onPress={() => goBack()} />
      ),
    });
  }, [goBack, navigate, params, setOptions]);

  const handleSelectLocation = (event: MapPressEvent) => {
    setSelctedPos(event.nativeEvent.coordinate);
  };

  const handleCreateSpot = async () => {
    const data: any = {
      ...params,
      longitude: `${selectedPos?.longitude}`,
      latitude: `${selectedPos?.latitude}`,
    };
    try {
      // console.log(data);
      await createSpot(data).unwrap();
      setSelctedPos(null);
      goBack();
      navigate('Spots/SpotsList');
    } catch (err: any) {
      console.log(err);
    }
  };

  if (!currentPos) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        userInterfaceStyle={'light'}
        initialRegion={currentPos || undefined}
        onPress={handleSelectLocation}
        showsUserLocation
        showsMyLocationButton>
        {selectedPos ? (
          <Marker coordinate={selectedPos} centerOffset={{ y: -24, x: 0 }}>
            <Icon
              name={'location-on'}
              size={48}
              color={theme.colors.secondary}
            />
          </Marker>
        ) : null}
      </MapView>
      {selectedPos ? (
        <View style={{ margin: 16 }}>
          <Button
            title={'Create spot'}
            onPress={handleCreateSpot}
            loading={isLoading}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default CreateSpotLocation;

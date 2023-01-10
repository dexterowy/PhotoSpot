import { Linking, Pressable, StyleSheet, View } from 'react-native';
import MapView, { Callout, Marker, Region } from 'react-native-maps';
import React, { useCallback, useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Text } from '@rneui/base';
import { useGetSpotsQuery } from '../../spots/api/spotsApi';
import { Icon, LinearProgress, useTheme } from '@rneui/themed';
import { ControlledTooltip } from '../../../components/Tooltip';
import { useNavigation } from '@react-navigation/native';
import { Spot } from '../../spots/types/Spot';
import { SpotsListEntity } from '../../spots/types/SpotsListEntity';

const MapScreen = () => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();

  const [currentPos, setCurrentPos] = useState<{
    longitude: number;
    latitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);

  const { data: spots, isLoading: isLoadingSpots } = useGetSpotsQuery();

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

  const handleRegionChange = (region: Region) => {
    console.log(region);
  };
  const handleNavigateToDetails = useCallback(
    (spot: SpotsListEntity) => {
      try {
        console.log('uwu');
        //@ts-ignore TODO: Add typechecking for navigation
        navigate('Map/SpotNavigator', {
          screen: 'Spot/SpotDetails',
          params: { spotId: spot.id },
        });
      } catch (err: any) {
        console.log(err);
      }
      // handleClose();
    },
    [navigate],
  );

  if (!currentPos) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        userInterfaceStyle={'light'}
        initialRegion={currentPos || undefined}
        onRegionChangeComplete={handleRegionChange}
        // initialCamera={{
        //   zoom: 100,
        //   altitude: 1,
        //   center: {
        //     latitude: currentPos.latitude,
        //     longitude: currentPos.longitude,
        //   },
        //   heading: 0,
        //   pitch: 1,
        // }}
        showsUserLocation
        showsMyLocationButton>
        {spots?.map(spot => (
          <Marker
            key={spot.id}
            onPress={() => console.log('uwu')}
            centerOffset={{ y: -24, x: 0 }}
            coordinate={{
              longitude: parseFloat(spot.longitude),
              latitude: parseFloat(spot.latitude),
            }}>
            <Icon
              name={'location-on'}
              size={48}
              color={theme.colors.secondary}
            />
            <Callout style={{ width: 200 }}>
              <View>
                <Text h4>{spot.name}</Text>
                <Text
                  onPress={() => {
                    console.log('wtf');
                    navigate('Map/SpotNavigator', {
                      screen: 'Spot/SpotDetails',
                      params: { spotId: spot.id },
                    });
                  }}
                  h4
                  style={{
                    marginTop: 8,
                    color: theme.colors.primary,
                    textDecorationLine: 'underline',
                  }}>
                  Show details
                </Text>
              </View>
            </Callout>
            {/* <ControlledTooltip
              containerStyle={{
                width: 'auto',
                height: 'auto',
                backgroundColor: 'white',
              }}
              pointerColor={'white'}
              customOverlay={handleClose => (

              )}>

            </ControlledTooltip> */}
          </Marker>
        ))}
      </MapView>
      {isLoadingSpots && <LinearProgress />}
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

export default MapScreen;

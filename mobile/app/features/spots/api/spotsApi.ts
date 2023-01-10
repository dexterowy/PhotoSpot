import { Platform } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { api } from '../../../lib/api';
import { Spot } from '../types/Spot';
import { SpotsListEntity } from '../types/SpotsListEntity';

type GetSpotsRequestDTO = void;
type GetSpotsResponseDTO = Array<SpotsListEntity>;

type GetSpotDetailsRequestDTO = {
  spotId: string;
};
type GetSpotDetailsResponseDTO = Spot;

type CreateSpotRequestDTO = {
  name: string;
  description: string;
  photos: Asset[];
  longitude: string;
  latitude: string;
};

const enchancedApi = api.enhanceEndpoints({
  addTagTypes: ['Spots', 'Spot', 'MySpots'],
});

export const spotsApi = enchancedApi.injectEndpoints({
  endpoints: build => ({
    getSpots: build.query<GetSpotsResponseDTO, GetSpotsRequestDTO>({
      query: () => 'spots',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Spots' as const, id })),
              { type: 'Spots', id: 'LIST' },
            ]
          : [{ type: 'Spots', id: 'LIST' }],
    }),
    getMySpots: build.query<GetSpotsResponseDTO, GetSpotsRequestDTO>({
      query: () => 'spots/my',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'MySpots' as const, id })),
              { type: 'MySpots', id: 'LIST' },
            ]
          : [{ type: 'MySpots', id: 'LIST' }],
    }),
    getSpotDetails: build.query<
      GetSpotDetailsResponseDTO,
      GetSpotDetailsRequestDTO
    >({
      query: ({ spotId }) => `spots/${spotId}`,
      providesTags: ['Spot'],
    }),
    createSpot: build.mutation<void, CreateSpotRequestDTO>({
      query: data => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('latitude', data.latitude);
        formData.append('longitude', data.longitude);
        data.photos.map(photo => {
          formData.append('photos', {
            uri:
              Platform.OS === 'ios'
                ? photo.uri?.replace('file://', '')
                : photo.uri,
            type: photo.type,
            name: photo.fileName,
          });
        });
        console.log('formdata', formData);
        return {
          url: 'spots',
          method: 'post',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data; ',
          },
        };
      },
      invalidatesTags: ['Spots', 'MySpots'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetSpotsQuery,
  useGetSpotDetailsQuery,
  useCreateSpotMutation,
  useGetMySpotsQuery,
} = spotsApi;

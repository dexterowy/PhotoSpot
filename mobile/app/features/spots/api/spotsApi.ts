import { api } from '../../../lib/api';
import { Spot } from '../types/Spot';
import { SpotsListEntity } from '../types/SpotsListEntity';

type GetSpotsRequestDTO = void;
type GetSpotsResponseDTO = Array<SpotsListEntity>;

type GetSpotDetailsRequestDTO = {
  spotId: string;
};
type GetSpotDetailsResponseDTO = Spot;

export const spotsApi = api.injectEndpoints({
  endpoints: build => ({
    getSpots: build.query<GetSpotsResponseDTO, GetSpotsRequestDTO>({
      query: () => 'spots',
    }),
    getSpotDetails: build.query<
      GetSpotDetailsResponseDTO,
      GetSpotDetailsRequestDTO
    >({
      query: ({ spotId }) => `spots/${spotId}`,
    }),
  }),
  overrideExisting: true,
});

export const { useGetSpotsQuery, useGetSpotDetailsQuery } = spotsApi;

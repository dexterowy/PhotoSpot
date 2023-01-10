import { api } from '../../../lib/api';
import { ColectionsListEntity } from '../types/CollectionsListEntity';

type CreateCollectionRequestDTO = {
  name: string;
  description: string;
};

type GetCollectionsResponseDTO = Array<ColectionsListEntity>;

type GetCollectionDetailsRequestDTO = { collectionId: string };
type GetCollectionDetailsResponseDTO = ColectionsListEntity;

type AssignSpotToCollectionRequestDTO = {
  collectionId: string;
  spotId: string;
};

const enchancedApi = api.enhanceEndpoints({
  addTagTypes: ['Collections', 'Collection'],
});

const collectionApi = enchancedApi.injectEndpoints({
  endpoints: build => ({
    getCollections: build.query<GetCollectionsResponseDTO, void>({
      query: () => 'collections/my',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Collections' as const, id })),
              { type: 'Collections', id: 'LIST' },
            ]
          : [{ type: 'Collections', id: 'LIST' }],
      // highlight-end
    }),
    getCollectionDetails: build.query<
      GetCollectionDetailsResponseDTO,
      GetCollectionDetailsRequestDTO
    >({
      query: ({ collectionId }) => `collections/${collectionId}`,
      providesTags: ['Collection'],
    }),
    createCollection: build.mutation<void, CreateCollectionRequestDTO>({
      query: data => {
        return {
          url: 'collections',
          method: 'post',
          body: data,
        };
      },
      invalidatesTags: ['Collections'],
    }),
    assignSpotToCollections: build.mutation<
      void,
      AssignSpotToCollectionRequestDTO
    >({
      query: ({ spotId, collectionId }) => {
        return {
          url: `collections/${collectionId}/assign/${spotId}`,
          method: 'post',
        };
      },
      invalidatesTags: ['Collections', 'Collection'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateCollectionMutation,
  useGetCollectionsQuery,
  useGetCollectionDetailsQuery,
  useAssignSpotToCollectionsMutation,
} = collectionApi;

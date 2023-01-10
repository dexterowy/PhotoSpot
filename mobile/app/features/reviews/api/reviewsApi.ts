import { Platform } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { api } from '../../../lib/api';

type CreateReviewRequestDTO = {
  spotId: string;
  data: {
    mark: number;
    comment: string;
    photos: Asset[];
  };
};

const enhancedApi = api.enhanceEndpoints({
  addTagTypes: ['Spots', 'Spot'],
});

const reviewsApi = enhancedApi.injectEndpoints({
  endpoints: build => ({
    createReview: build.mutation<void, CreateReviewRequestDTO>({
      query: ({ spotId, data }) => {
        const formData = new FormData();
        formData.append('mark', data.mark);
        formData.append('comment', data.comment);
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
        return {
          url: `reviews/${spotId}`,
          body: formData,
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data; ',
          },
        };
      },
      invalidatesTags: [{ type: 'Spots', id: 'LIST' }, 'Spot'],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateReviewMutation } = reviewsApi;

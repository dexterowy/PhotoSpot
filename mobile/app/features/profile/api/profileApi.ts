import { api } from '../../../lib/api';

const authApi = api.injectEndpoints({
  endpoints: build => ({
    getMyProfile: build.query({
      query: () => 'user/me',
    }),
  }),
  overrideExisting: true,
});

export const { useGetMyProfileQuery } = authApi;

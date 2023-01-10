import { api } from '../../../lib/api';

//TODO: type better response
type GetMyProfileResponseDTO = {
  id: string;
  email: string;
  nickname: string;
  Profile: {
    id: string;
    first_name: string;
    last_name: string;
  };
};

const authApi = api.injectEndpoints({
  endpoints: build => ({
    getMyProfile: build.query<GetMyProfileResponseDTO, void>({
      query: () => 'user/me',
    }),
  }),
  overrideExisting: true,
});

export const { useGetMyProfileQuery } = authApi;

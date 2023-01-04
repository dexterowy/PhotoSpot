import { instance } from '../../../lib/axios';

type LoginRequestDTO = {
  email: string;
  password: string;
};

type LoginResponseDTO = {
  access_token: string;
};

export const authApi = {
  login: (data: LoginRequestDTO) => {
    return instance.post<LoginResponseDTO>('/auth/login', data, {
      withCredentials: true,
    });
  },
};

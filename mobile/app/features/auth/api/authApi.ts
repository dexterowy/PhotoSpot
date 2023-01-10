import { instance } from '../../../lib/axios';

type LoginRequestDTO = {
  email: string;
  password: string;
};

type LoginResponseDTO = {
  access_token: string;
};

type RegisterRequestDTO = {
  email: string;
  password: string;
  nickname: string;
  firstName: string;
  lastName: string;
};

type RegisterResponseDTO = void;

export const authApi = {
  login: (data: LoginRequestDTO) => {
    return instance.post<LoginResponseDTO>('/auth/login', data, {
      withCredentials: true,
    });
  },
  register: (data: RegisterRequestDTO) => {
    return instance.post<RegisterResponseDTO>('auth/register', data);
  },
};

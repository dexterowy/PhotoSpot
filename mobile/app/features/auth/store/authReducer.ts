import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuhtState {
  isAuth: boolean;
  accessToken: string;
}

const initialState: AuhtState = {
  isAuth: false,
  accessToken: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, { payload }: PayloadAction<string>) => {
      state.isAuth = true;
      state.accessToken = payload;
    },
    logout: state => {
      state.isAuth = false;
      state.accessToken = '';
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;

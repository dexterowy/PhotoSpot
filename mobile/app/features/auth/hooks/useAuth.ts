import { useAppSelector } from '../../../hooks/storeHooks';

export const useAuth = () => {
  const auth = useAppSelector(state => state.auth);
  return auth;
};

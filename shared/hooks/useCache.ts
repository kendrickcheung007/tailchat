import { useQuery } from 'react-query';
import { fetchUserInfo, UserBaseInfo } from '../model/user';

function buildCacheFactory<T>(
  scope: string,
  fetcher: (id: string) => Promise<T>
) {
  return (id: string): T | Record<string, never> => {
    const { data } = useQuery([scope, id], () => fetcher(id));
    return data ?? {};
  };
}

export const useUserInfo = buildCacheFactory<UserBaseInfo>(
  'user',
  fetchUserInfo
);

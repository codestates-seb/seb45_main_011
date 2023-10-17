import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getUserInfo } from '@/api/history';

import useHistoryStore from '@/stores/historyStore';

const useUserInfo = (id: string) => {
  const { setHistoryUser, profileImageUrl, displayName, grade, point } =
    useHistoryStore();

  const { data } = useQuery(['userEmail', id], () => getUserInfo(id));

  useEffect(() => {
    if (data) return setHistoryUser(data.data);
  }, [data]);

  return { profileImageUrl, displayName, grade, point };
};

export default useUserInfo;

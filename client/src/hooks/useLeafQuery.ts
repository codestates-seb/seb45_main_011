import { useQuery } from '@tanstack/react-query';

import { getLeafByLeafId } from '@/api/leaf';

import { LeafDataInfo } from '@/types/data';

export default function useLeafQuery(isOwner: boolean, leafId: string) {
  const {
    data: leaf,
    isLoading,
    isError,
  } = useQuery<LeafDataInfo>({
    queryKey: ['leaf', leafId],
    queryFn: () => getLeafByLeafId(leafId),
    enabled: isOwner,
  });

  return {
    leaf,
    isLoading,
    isError,
  };
}

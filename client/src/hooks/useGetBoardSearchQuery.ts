import { useQuery } from '@tanstack/react-query';

import { getBoardsBySearch } from '@/api/board';

import { BoardDataInfo } from '@/types/data';

export default function useGetSearchBoardQuery(searchKey: string | null) {
  if (!searchKey) return null;

  const {
    data: searchBoards,
    isLoading,
    isError,
  } = useQuery<BoardDataInfo[] | null>(['search', searchKey], () =>
    getBoardsBySearch(searchKey),
  );

  return { searchBoards, isLoading, isError };
}

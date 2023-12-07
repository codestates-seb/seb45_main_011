interface PaginationProps {
  page: number;
  totalElements: number;

  setPage: (page: number) => void;
}

const usePagination = ({ page, setPage, totalElements }: PaginationProps) => {
  const LIMIT = 10;
  const ALL_DATA = totalElements;
  const TOTAL_PAGE = Math.ceil(ALL_DATA / LIMIT);

  const onFirstPage = () => {
    if (0 <= page) setPage(0);
  };

  const onLastPage = () => {
    if (page < TOTAL_PAGE) setPage(TOTAL_PAGE - 1);
  };

  const onNextPage = () => {
    if (page < TOTAL_PAGE - 1) setPage(page + 1);
  };

  const onPreviousPage = () => {
    if (0 < page) setPage(page - 1);
  };

  return { onFirstPage, onLastPage, onPreviousPage, onNextPage };
};

export default usePagination;

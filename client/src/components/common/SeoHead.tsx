import { useRouter } from 'next/router';

// import getMetaData from '@/hooks/useGetMetaData';

import { PageType, Post } from '@/types/common';

type MetaDataProps = {
  post: Post;
  page: PageType;
};

export default function SeoHead({ post, page }: MetaDataProps) {
  const router = useRouter();
  // const metaData = getMetaData(page, router.query, post);
  //TODO: 주석에 원하는대로 값이 나오는지 테스트가 필요하다
  //TODO: og 이미지는 어떻게 할 것인가?
  return;
}

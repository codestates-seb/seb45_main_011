import { DOMAIN } from '@/constants/contents';
// import { ContextType, PageType, Post } from '@/types/common';

type MetaDataType = {
  title: string;
  url: string;
  description: string;
  image?: string;
};

// const getMetaData = (
//   pageType: PageType,
//   contextType: ContextType,
//   post: Post,
// ): MetaDataType => {
//   const { garden, leaf, leafId, leafs, history, slug } = contextType;

//   const BASIC_THUMBNAIL = '/assets/img/bg_default_post.png';

//   const metaData = {
//     title: '',
//     url: '',
//     description: '',
//     image: BASIC_THUMBNAIL,
//   };

//   switch (pageType) {
//     case PageType.Main:
//       metaData.title = `${DOMAIN.domain_kor} | ${DOMAIN.domain}`;
//       // 그로우 스토리 | grow-story.vercel.app
//       metaData.url = `${DOMAIN.domain}`;
//       // grow-story.vercel.app
//       metaData.description = `${DOMAIN.domain_kor} 입니다.`;
//       // 그로우 스토리 입니다.
//       break;

//     case PageType.Signup:
//       metaData.title = `회원 가입 | ${DOMAIN.domain}`;
//       // 회원 가입 | grow-story.vercel.app
//       metaData.url = `${DOMAIN.domain}/signup`;
//       // grow-story.vercel.app/signup
//       metaData.description = `지금 그로우 스토리에 가입해 보세요!`;
//       // 지금 그로우 스토리에 가입해 보세요!
//       break;

//     case PageType.Signin:
//       metaData.title = `로그인 | ${DOMAIN.domain}`;
//       // 로그인 | grow-story.vercel.app
//       metaData.url = `${DOMAIN.domain}/signin`;
//       // grow-story.vercel.app/signin
//       metaData.description = `그로우 스토리 로그인 페이지 입니다.`;
//       // 그로우 스토리 로그인 페이지 입니다.
//       break;

//     case PageType.Garden:
//       metaData.title = `${garden} 님의 정원 | ${DOMAIN.domain}`;
//       // OOO 님의 정원 | grow-story.vercel.app
//       metaData.url = `${DOMAIN.domain}/garden/${slug}`;
//       // grow-story.vercel.app/garden/1
//       metaData.description = `${garden} 님의 정원 입니다.`;
//       // OOO 님의 정원 입니다.
//       break;

//     case PageType.Board:
//       metaData.title = `커뮤니티 | ${DOMAIN.domain}`;
//       // 커뮤니티 | grow-story.vercel.app
//       metaData.url = `${DOMAIN.domain}/board`;
//       // grow-story.vercel.app/board
//       metaData.description = `그로우 스토리에서 다른 사람들과 소통해 보세요!`;
//       // 그로우 스토리에서 다른 사람들과 소통해 보세요!
//       break;

//     case PageType.Leaf:
//       metaData.title = `${leaf} | ${DOMAIN.domain}`;
//       // 바지리 | grow-story.vercel.app
//       metaData.url = `${DOMAIN.domain}/leaf/${slug}/${leafId}`;
//       // grow-story.vercel.app/leaf/1/1
//       metaData.description = `${leaf}`;
//       // 바지리
//       break;

//     case PageType.Leafs:
//       metaData.title = `${leafs} 님의 식물 카드 목록 | ${DOMAIN.domain}`;
//       // OOO 님의 식물 카드 목록 | grow-story.vercel.app
//       metaData.url = `${DOMAIN.domain}/leafs/${slug}`;
//       // grow-story.vercel.app/leafs/1
//       metaData.description = `${leafs} 님의 식물 카드 목록입니다.`;
//       // OOO 님의 식물 카드 목록입니다.
//       break;

//     case PageType.History:
//       metaData.title = `${history} 님의 히스토리 | ${DOMAIN.domain}`;
//       // OOO 님의 히스토리 | grow-story.vercel.app
//       metaData.url = `${DOMAIN.domain}/history/${slug}`;
//       // grow-story.vercel.app/history/1
//       metaData.description = `${garden} 님의 히스토리 입니다.`;
//       // OOO 님의 히스토리 입니다.
//       break;
//   }

//   return metaData;
// };

// export default getMetaData;

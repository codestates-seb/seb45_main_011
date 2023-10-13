export const CONTROL_BUTTON_TITLES = {
  edit: '수정하기',
  delete: '삭제하기',
} as const;

export const HEADER_LINK_CONTENT = {
  garden: '정원',
  community: '커뮤니티',
  leafCard: '식물 카드',
  signin: '로그인',
  logout: '로그아웃',
} as const;

export const INTRO_DESC = {
  first: '키우는 식물로',
  second: '을 꾸며 보세요!',
  bold: '나만의 정원',
} as const;

export const CONTROLLER_TITLES = {
  up: '위쪽',
  right: '오른쪽',
  down: '아래쪽',
  left: '왼쪽',
};

export const SIGNIN_REQUIRE = {
  email: '이메일을 입력해주세요.',
  nickname: '닉네임을 입력해주세요.',
  password: '비밀번호를 입력해주세요.',
  passwordCheck: '동일한 비밀번호를 다시 입력해주세요.',
  code: '인증 번호를 입력해주세요.',
} as const;

export const SIGNIN_VAILDATION = {
  email: '올바른 이메일 형식이 아닙니다.',
  nickname: '2글자 이상의 영문 또는 한글을 사용해야 합니다.',
  password: '6~12글자의 영문과 숫자를 함께 사용해야 합니다.',
  passwordCheck: '비밀번호가 일치하지 않습니다.',
  code: '올바른 인증 번호 형식이 아닙니다.',
} as const;

export const SIGN_DEFAULT_VALUE = {
  email: '',
  nickname: '',
  password: '',
  passwordCheck: '',
} as const;

export const SIGN_LINK_TO = {
  signin: '로그인!',
  signup: '가입하기!',
  signinText: '이미 회원이라면?',
  signupText: '아직 회원이 아니라면?',
} as const;

export const PLANT_SIZES = {
  sm: '1 x 1',
  lg: '2 x 2',
} as const;

export const PLANT_CARD_BUTTON_CONTENTS = {
  shop: '구매',
  inventory: '설치',
} as const;

export const LOADING_CONTENTS = '불러오는 중...';

export const DROPDOWN_OPTIONS = [
  {
    title: 'all',
    selected: '게시글 보기',
  },
  {
    title: 'boardWritten',
    selected: '작성한 게시글',
  },
  {
    title: 'boardLiked',
    selected: '좋아요를 누른 게시글',
  },
  {
    title: 'commentWritten',
    selected: '댓글을 작성한 게시글',
  },
] as const;

export const INFOMATION_TEXT = {
  diary: '등록된 일지가 없어요 : (',
  addDiary: '일지를 작성해보세요!',

  board: '등록된 게시글이 없어요 : (',
  addBoard: '게시글을 작성해보세요!',

  likes: '좋아요한 게시글이 없어요 : (',

  comment: '댓글을 단 게시글이 없어요 : (',
} as const;

export const DOMAIN = {
  domain: 'grow-story.vercel.app',
  domain_kor: '그로우 스토리',
} as const;

export const FOOTER_LINK = {
  team: 'https://github.com/codestates-seb/seb45_main_011',
  dogyeong: 'https://github.com/Dokyung-Hwang',
  minseok: 'https://github.com/nalsae',
  dohyeong: 'https://github.com/dohyoungK',
  seungtae: 'https://github.com/NtoZero',
  hanbin: 'https://github.com/hanbinchoi',
  doyeon: 'https://github.com/shimdokite',
};

export const SHARE_BUTTON_TEXT = {
  button: '공유하기',
};

export const SHARE_MODAL_TEXT = {
  firstLine: ['현재 페이지 주소가', '복사되었습니다.'],
  secondLine: ['다른 사람에게 ', '공유해보세요!'],
  button: '확인',
};

export const LEAF_DELETE_MODAL_TEXT = {
  firstLine: ['정원에 설치된 식물 카드는', '연결이 해제', '됩니다.'],
  secondLine: '그래도 삭제하시겠습니까?',
  button: ['삭제', '취소'],
};

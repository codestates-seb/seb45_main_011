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

export const PLANT_CARD_CONTENTS = {
  building_brown_sm: '벽돌 유적',
  building_yellow_sm: '콜로세움',
  building_blue_sm: '잊혀진 연구소',
  building_white_sm: '대리석 신전',
  bush_blue_sm: '푸른 마법 덤불',
  bush_orange_sm: '노란 마법 덤불',
  bush_fern_sm: '고사리 덤불',
  bush_maple_sm: '단풍 덤불',
  bush_snow_sm: '겨울 덤불',
  stone_red_sm: '가넷 광맥',
  stone_yellow_sm: '토파즈 광맥',
  stone_purple_sm: '자수정 광맥',
  stone_pink_sm: '로즈쿼츠 광맥',
  stone_blue_sm: '사파이어 광맥',
  stone_black_sm: '흑요석 광맥',
  stone_brown_sm: '바위',
  stone_green_sm: '이끼 낀 바위',
  tree_cherry_sm: '벚나무',
  tree_pine_sm: '소나무',
  tree_apple_sm: '사과 나무',
  tree_palm_sm: '야자 나무',
  tree_oak_sm: '참나무',
  tree_maple_sm: '단풍 나무',
  tree_coconut_sm: '코코넛 나무',
  tree_christmas_sm: '눈 덮인 나무',
  tree_snow_sm: '겨울 나무',
  tree_stump_sm: '나무 밑동',
} as {
  [key: string]: string;
};

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

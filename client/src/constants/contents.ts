export const CONTROL_BUTTON_TITLES = {
  edit: '수정하기',
  delete: '삭제하기',
  notificationDelete: '알림 삭제',
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

export const SIGN_REQUIRE = {
  email: '이메일을 입력해주세요.',
  nickname: '닉네임을 입력해주세요.',
  password: '비밀번호를 입력해주세요.',
  passwordCheck: '동일한 비밀번호를 다시 입력해주세요.',
  code: '인증 번호를 입력해주세요.',
} as const;

export const SIGN_VAILDATION = {
  email: '올바른 이메일 형식이 아닙니다.',
  nickname: '2글자 이상의 영문 또는 한글을 사용해야 합니다.',
  maxLength: '6글자 이하의 영문 또는 한글을 입력해야 합니다.',
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
} as const;

export const ALERT_TEXT = {
  login: '로그인에 실패했습니다. 다시 시도해 주세요.',
  password: '기존 비밀번호와 동일합니다. 새로운 비밀번호를 입력해 주세요.',
  image: '2mb 이하의 이미지만 등록이 가능합니다.',
} as const;

export const PROFILE_MODAL_TEXT = {
  password: '비밀번호가',
  nickname: '닉네임이',
  image: '이미지가',
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

export const DIARY_DELETE_MODAL_TEXT = {
  firstLine: '선택한 일지를',
  secondLine: ['삭제', '하시겠습니까?'],
  button: ['삭제', '취소'],
};

export const DIARY_FORM_TEXT = {
  title: '일지 작성하기',
  firstLabel: '제목 : ',
  secondLabel: '내용 : ',
  button: ['완료', '취소'],
};

export const IMAGE_UPLOAD_TEXT = {
  fileSizeWarn: '4mb 이하 이미지를 선택해주세요.',
  noImageUploadError: '이미지를 필수로 등록해야 합니다.',
  imageUpload: '이미지 등록',
};

export const EMPTY_DIARY_TEXT = {
  button: '작성하기',
};

export const LEAF_DATE_INFO_TEXT = {
  firstLine: '키우기 시작한 지 : ',

  secondLine: '최근 관리 : ',
};

export const LEAF_INFO_TEXT = {
  button: ['정원에 설치하기', '일지 작성'],
};

export const LEAF_ADD_PAGE_TEXT = {
  title: '식물 카드 등록',
};

export const LEAF_EDIT_PAGE_TEXT = {
  title: '식물 카드 수정',
};

export const TEXT_INPUT_FORMAT = {
  plantName: {
    lengthErrorMsg: '2글자 이상 6글자 이하의 영문 또는 한글을 입력해야 합니다.',
    placeholder: '식물 이름을 입력해주세요.',
  },
  title: {
    lengthErrorMsg:
      '2글자 이상 20글자 이하의 영문 또는 한글을 입력해야 합니다.',
    placeholder: '제목을 입력해주세요.',
  },
  nickname: {
    lengthErrorMsg: '2글자 이상 6글자 이하의 영문 또는 한글을 입력해야 합니다.',
    placeholder: '닉네임을 입력해주세요.',
  },
};

export const NOT_FOUND_TEXT = {
  title: 'Not Found',
  description: ['페이지를 ', '못 찾았어요 : ('],
};

export const BOARD_BANNER_TEXT = {
  firstLine: {
    big: '좋아요를 많이 받은 1 ~ 3위에게',
    small: '좋아요 순위에 따라',
  },
  secondLine: {
    big: ['매주 포인트', '를 지급해 드려요!'],
    small: ['포인트', '를 드려요!'],
  },
  thirdLine: '포인트는 매주 월요일에 지급되며, 이전 랭킹은 초기화 됩니다.',
};

export const BOARD_SEARCH_INPUT_TEXT = {
  input: {
    placeholder: '검색어를 입력하세요',
  },
};

export const EMPTY_SEARCH_TEXT = '검색 결과가 없습니다 : (';

export const RANK_BOARD_TEXT = {
  title: '이주의 좋아요 순위',
};

export const NO_IMAGE_TEXT = {
  title: 'No Image',
  description: '이미지를 등록해주세요!',
};

export const POST_COUNT_INFO_TEXT = {
  alert: '로그인이 필요한 기능입니다.',
};

export const COMMENT = {
  maxLength: {
    value: 200,
    errorMessage: '최대 200자를 넘을 수 없습니다.',
  },
};

export const COMMENT_DELETE_MODAL_TEXT = {
  firstLine: '댓글을',
  secondLine: ['삭제', '하시겠습니까?'],
};

export const POST_DELETE_MODAL_TEXT = {
  firstLine: ['게시글을', '삭제', '하시겠습니까?'],
};

export const CUSTOMER_SERVICE = {
  notification: [
    '채팅 내용은 상담 품질 향상을 위해 저장됩니다.',
    '최대한 빠른 시간안에 답변해 드리겠습니다.',
  ],
};

export const REPORT_TITLE = [
  { content: '번호', key: 'chatRoomId' },
  { content: '문의일', key: 'latestTime' },
  { content: '문의 제목', key: 'roomName' },
  { content: '닉네임', key: 'otherAccountName' },
  { content: '답장 여부', key: 'isAnswered' },
  { content: '채팅 입장', key: 'entry' },
];

export const REPORT_TITLE_STYLE = ['10%', '15%', '20%', '15%', '20%', '20%'];

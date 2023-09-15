/**
 * 입력 필드 유형(`name`)에 따라 유효성 검사 스키마 및 placeholder를 반환합니다.
 *
 * @param {string} name - 입력 필드의 이름 (예: 'plantName', 'title', 'nickname', 'password', 'newPassword', 'newPasswordCheck').
 * @returns {object | null} - 입력 필드에 대한 유효성 검사 스키마와 플레이스홀더를 포함하는 객체 또는 `null` (유효하지 않은 `name`인 경우).
 */
export default function getTextInputTypeFormat(name: string) {
  if (name === 'plantName') {
    return {
      validationSchema: {
        minLength: {
          value: 2,
          message: '2글자 이상의 영문 또는 한글을 입력해야 합니다.',
        },
      },
      placeholder: '식물 이름을 입력해주세요.',
    };
  }
  if (name === 'title') {
    return {
      validationSchema: {
        minLength: {
          value: 2,
          message: '2글자 이상의 영문 또는 한글을 입력해야 합니다.',
        },
      },
      placeholder: '제목을 입력해주세요.',
    };
  }
  if (name === 'nickname') {
    return {
      validationSchema: {
        minLength: {
          value: 2,
          message: '2글자 이상의 영문 또는 한글을 입력해야 합니다.',
        },
        maxLength: {
          value: 6,
          message: '6글자 이하의 영문 또는 한글을 입력해야 합니다.',
        },
      },
      placeholder: '닉네임을 입력해주세요.',
    };
  }
  return null;
}

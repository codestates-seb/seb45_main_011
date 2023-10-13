import { TEXT_INPUT_FORMAT } from './../constants/contents';
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
          message: TEXT_INPUT_FORMAT.plantName.lengthErrorMsg,
        },
        maxLength: {
          value: 6,
          message: TEXT_INPUT_FORMAT.plantName.lengthErrorMsg,
        },
      },
      placeholder: TEXT_INPUT_FORMAT.plantName.placeholder,
    };
  }
  if (name === 'title') {
    return {
      validationSchema: {
        minLength: {
          value: 2,
          message: TEXT_INPUT_FORMAT.title.lengthErrorMsg,
        },
        maxLength: {
          value: 20,
          message: TEXT_INPUT_FORMAT.title.lengthErrorMsg,
        },
      },
      placeholder: TEXT_INPUT_FORMAT.title.placeholder,
    };
  }
  if (name === 'nickname') {
    return {
      validationSchema: {
        minLength: {
          value: 2,
          message: TEXT_INPUT_FORMAT.nickname.lengthErrorMsg,
        },
        maxLength: {
          value: 6,
          message: TEXT_INPUT_FORMAT.nickname.lengthErrorMsg,
        },
      },
      placeholder: TEXT_INPUT_FORMAT.nickname.placeholder,
    };
  }
  return null;
}

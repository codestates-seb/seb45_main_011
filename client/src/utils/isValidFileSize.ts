/** 파일 크기가 2mb 이하인지 확인하는 함수 */
export default function isValidFileSize(file: File) {
  if (file && file.type.startsWith('image/')) {
    if (file.size <= 2 * 1024 * 1024) {
      return true;
    }
  }
  return false;
}

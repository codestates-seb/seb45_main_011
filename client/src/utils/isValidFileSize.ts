export default function isValidFileSize(file: File) {
  if (file && file.type.startsWith('image/')) {
    if (file.size <= 4 * 1024 * 1024) {
      return true;
    }
  }
  return false;
}

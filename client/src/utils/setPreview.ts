// 이미지 미리보기 설정하는 함수
const setPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files?.length) {
    setIsImageUpdated && setIsImageUpdated(true);
    const file = e.target.files;
    if (isValidFileSize(file[0])) {
      setImagePreview(URL.createObjectURL(file[0]));
      clearErrors('image');
      setValue('image', file);
      return;
    }
    alert('2mb 이하 이미지를 선택해주세요.');
  }
  return;
};

export default function fileListToFormData(fileList: FileList) {
  const formData = new FormData();
  const file = fileList[0];
  formData.append('file', file);

  return formData;
}

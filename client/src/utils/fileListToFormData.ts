export default function fileListToFormData(fileList: FileList) {
  const formData = new FormData();

  for (let i = 0; i < fileList.length; i += 1) {
    formData.append(`images`, fileList[i]);
  }

  return formData;
}

import { InputValues } from '@/types/common';

interface convertToFormDataParameters {
  usage:
    | 'addLeaf'
    | 'editLeaf'
    | 'addDiary'
    | 'editDiary'
    | 'addPost'
    | 'editPost';
  inputs: InputValues;
  leafId?: string;
  isImageUpdated?: boolean;
  userId?: string;
  tags?: string[];
}

export default function convertToFormData({
  usage,
  inputs,
  leafId,
  isImageUpdated,
  userId,
  tags,
}: convertToFormDataParameters) {
  const formData = new FormData();

  if (usage === 'addLeaf') {
    const jsonData = JSON.stringify({
      leafName: inputs.plantName,
      content: inputs.leafContent,
    });

    const jsonBlob = new Blob([jsonData], { type: 'application/json' });

    formData.append('leafImage', inputs.image[0]);
    formData.append('leafPostDto', jsonBlob);

    return formData;
  }

  if (usage === 'editLeaf') {
    const jsonData = JSON.stringify({
      leafId: leafId,
      leafName: inputs.plantName,
      content: inputs.leafContent,
      isImageUpdated,
    });

    const blob = new Blob([jsonData], { type: 'application/json' });

    if (isImageUpdated) formData.append('leafImage', inputs?.image[0]);
    formData.append('leafPatchDto', blob);

    return formData;
  }

  if (usage === 'addDiary') {
    const postDtoData = JSON.stringify({
      title: inputs.title,
      content: inputs.diaryContent,
      isImageUpdated,
    });

    const leafAuthorData = JSON.stringify({
      accountId: userId,
    });

    const postDtoBlob = new Blob([postDtoData], { type: 'application/json' });
    const leafAuthorBlob = new Blob([leafAuthorData], {
      type: 'application/json',
    });

    if (isImageUpdated) formData.append('image', inputs.image[0]);
    formData.append('postDto', postDtoBlob);
    formData.append('leafAuthor', leafAuthorBlob);

    return formData;
  }

  if (usage === 'editDiary') {
    const patchDtoData = JSON.stringify({
      title: inputs.title,
      content: inputs.diaryContent,
      isImageUpdated,
    });
    const leafAuthorData = JSON.stringify({
      accountId: userId,
    });

    const patchDtoBlob = new Blob([patchDtoData], { type: 'application/json' });
    const leafAuthorBlob = new Blob([leafAuthorData], {
      type: 'application/json',
    });

    if (isImageUpdated) formData.append('image', inputs.image[0]);
    formData.append('patchDto', patchDtoBlob);
    formData.append('leafAuthor', leafAuthorBlob);

    return formData;
  }

  if (usage === 'addPost') {
    const requestBoardDto = JSON.stringify({
      title: inputs.title,
      content: inputs.diaryContent,
      hashTags: tags,
    });

    const requestBoardDtoBlob = new Blob([requestBoardDto], {
      type: 'application/json',
    });

    inputs.image && formData.append('image', inputs.image[0]);
    formData.append('requestBoardDto', requestBoardDtoBlob);

    return formData;
  }

  if (usage === 'editPost') {
    const requestBoardDto = JSON.stringify({
      title: inputs.title,
      content: inputs.diaryContent,
      hashTags: tags,
      isImageUpdated,
    });

    const requestBoardDtoBlob = new Blob([requestBoardDto], {
      type: 'application/json',
    });

    inputs.image && formData.append('image', inputs.image[0]);
    formData.append('requestBoardDto', requestBoardDtoBlob);

    return formData;
  }
}

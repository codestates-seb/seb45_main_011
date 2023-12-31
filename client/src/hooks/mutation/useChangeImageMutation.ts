import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { updateUserProfileImage } from '@/api/profile';

import useModalStore from '@/stores/modalStore';
import useUserStore from '@/stores/userStore';

import { ALERT_TEXT } from '@/constants/contents';

import isValidFileSize from '@/utils/isValidFileSize';

const useChangeImageMutation = () => {
  const { profileImageUrl, setProfileImageUrl } = useUserStore();
  const { changeType, open } = useModalStore();

  const imageUploadRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<FileList>();
  const [imageUrl, setImageUrl] = useState(profileImageUrl);
  const [isDisabled, setIsDisabled] = useState(true);

  const { mutate } = useMutation({
    mutationFn: (image: FileList) => updateUserProfileImage(image[0]),

    onSuccess: () => {
      setProfileImageUrl(imageUrl);
      setIsDisabled(true);

      changeType('ChangeImageModal');
      open();
    },
  });

  const checkFileSize = (file: File) => {
    if (isValidFileSize(file)) return true;

    alert(ALERT_TEXT.image);
    return false;
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;

    if (!file) return;

    if (file[0] && checkFileSize(file[0])) {
      setImage(file);

      const newFileURL = URL.createObjectURL(file[0]);
      setImageUrl(newFileURL);
      setIsDisabled(false);
    }
  };

  const onImageSubmit = async () => {
    if (image && !isDisabled) {
      mutate(image);
    }
  };

  return {
    imageUploadRef,
    imageUrl,
    isDisabled,
    onImageChange,
    onImageSubmit,
  };
};

export default useChangeImageMutation;

import ImageForm from './ImageForm';
import NicknameForm from './NicknameForm';
import PasswordForm from './PasswordForm';

import Screws from '../common/Screws';

export default function ProfileBox() {
  return (
    <div className="relative flex flex-col items-center justify-center bg-[url('/assets/img/bg_wood_yellow.png')] w-full min-w-[312px] max-w-[560px] h-full rounded-xl shadow-container border-gradient mb-[60px]">
      <Screws />
      <ImageForm className="mt-8" />

      <div className="w-full flex flex-col items-center mb-4">
        <NicknameForm />
        <PasswordForm />
      </div>
    </div>
  );
}

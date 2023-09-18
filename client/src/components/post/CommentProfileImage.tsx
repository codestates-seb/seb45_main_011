import useUserStore from '@/stores/userStore';
import Image from 'next/image';

export default function CommentProfileImage() {
  const { profileImageUrl } = useUserStore();
  return (
    <div className="min-w-[38px] w-[44px] h-[44px] rounded-[50%] flex justify-center items-center border-brown-10 border-[3px] overflow-hidden shadow-outer/down max-[560px]:w-[38px] max-[560px]:h-[38px] max-[500px]:hidden">
      <Image
        src={profileImageUrl || '/assets/img/bg_default_profile.png'}
        alt="profile_img"
        className={`w-11 h-11 bg-brown-20 object-cover object-center`}
        width={44}
        height={44}
      />
    </div>
  );
}

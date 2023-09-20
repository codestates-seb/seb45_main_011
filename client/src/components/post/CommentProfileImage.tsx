import useUserStore from '@/stores/userStore';
import Image from 'next/image';

export default function CommentProfileImage() {
  const { profileImageUrl } = useUserStore();
  return (
    <div className="w-[44px] h-[44px] rounded-[50%] flex justify-center items-center border-brown-10 border-[3px] overflow-hidden shadow-outer/down max-[500px]:hidden">
      <Image
        src={profileImageUrl || '/assets/img/bg_default_profile.png'}
        alt="profile_img"
        className="h-full bg-brown-20 object-cover object-center isolate"
        width={44}
        height={44}
        style={{ width: 44, height: 44 }}
      />
    </div>
  );
}

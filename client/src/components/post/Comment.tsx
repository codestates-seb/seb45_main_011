import DateAndControl from './PostDateAndControl';
import PostProfile from './PostProfile';

export default function Comment() {
  return (
    <div className="pl-[1.375rem] mb-8">
      <div className="flex justify-between mb-2">
        <PostProfile
          userId={1}
          displayName="관리자"
          grade="브론즈 가드너"
          profileImageUrl=""
          usage="comment"
        />
        <DateAndControl date="2023/09/04" usage="comment" targetId={1} />
      </div>
      <div className="pl-11">
        <p className="w-full px-[0.875rem] py-[0.75rem] bg-brown-10 border-2 border-brown-50 rounded-xl text-black-50 text-xs left-3 common-drop-shadow">
          첫 식물 축하축하 ^^
        </p>
      </div>
    </div>
  );
}

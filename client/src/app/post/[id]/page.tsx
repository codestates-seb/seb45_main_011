import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import BoardProfile from '@/components/post/BoardProfile';

export default function Post() {
  return (
    <main className="w-full flex justify-center items-center">
      <div className="relative w-full max-w-[720px] h-[645px] border-gradient rounded-xl">
        <Screws />
        <div className="h-full py-5">
          <div className="pr-5 pl-7 py-5 h-full flex flex-col items-center overflow-y-scroll scrollbar">
            <PageTitle text="첫 바질!!!" />
            <div className="w-full flex justify-between">
              <BoardProfile
                displayName="관리자"
                userId={1}
                profileImageUrl="/assets/img/profile_hitmontop.png"
                grade="브론즈 가드너"
              />
              <div>gg</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

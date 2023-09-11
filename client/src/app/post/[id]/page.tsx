import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import DateAndControl from '@/components/post/PostDateAndControl';
import BoardProfile from '@/components/post/PostProfile';

interface PostProps {
  params: { id: string };
}

export default function Post({ params }: PostProps) {
  const boardId = Number(params.id);
  return (
    <main className="flex justify-center items-center">
      <div className="relative w-full max-w-[720px] h-[645px] border-gradient rounded-xl">
        <Screws />
        <div className="h-full py-5">
          <div className="pr-5 pl-7 h-full flex flex-col items-center overflow-y-scroll scrollbar">
            <PageTitle text="첫 바질!!!" />
            <div className="w-full flex justify-between items-center">
              <BoardProfile
                displayName="관리자"
                userId={1}
                profileImageUrl="/assets/img/profile_hitmontop.png"
                grade="브론즈 가드너"
              />
              <DateAndControl
                date={'2023/09/04'}
                usage="post"
                boardId={boardId}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

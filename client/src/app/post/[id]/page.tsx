import PageTitle from '@/components/common/PageTitle';
import PostCountInfo from '@/components/common/PostCountInfo';
import Screws from '@/components/common/Screws';
import CommentForm from '@/components/post/CommentForm';
import PostContent from '@/components/post/PostContent';
import DateAndControl from '@/components/post/PostDateAndControl';
import PostImage from '@/components/post/PostImage';
import BoardProfile from '@/components/post/PostProfile';

interface PostProps {
  params: { id: string };
}

export default function Post({ params }: PostProps) {
  const boardId = Number(params.id);
  return (
    <main className="flex justify-center items-center">
      <div className="relative w-full max-w-[720px] h-[864px] border-gradient rounded-xl">
        <div className="h-full px-5 py-5">
          <Screws />
          <div className="relative h-full pr-5 pl-7 flex flex-col  overflow-y-scroll scrollbar ">
            <PageTitle text="첫 바질!!!" />
            <div className="w-full flex justify-between items-center mb-4">
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
            <div className="px-[1.875rem] py-[1.625rem] w-full bg-brown-10 border-2 border-brown-50 rounded-lg mb-8 common-drop-shadow ">
              <PostImage src={'/assets/img/profile_hitmontop.png'} />
              <PostContent content={`asda`} />
            </div>
            <PostCountInfo
              likesNum={200}
              commentNum={11}
              isLike={false}
              usage="post"
              className="mb-3"
            />
            <CommentForm />
          </div>
        </div>
      </div>
    </main>
  );
}

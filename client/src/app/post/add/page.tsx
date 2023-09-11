import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import PostForm from '@/components/post/PostForm';

export default function AddPost() {
  return (
    <div className="relative flex flex-col items-center min-w-[328px] max-w-[531px] mt-[52px] mx-auto border-gradient rounded-xl bg-repeat shadow-outer/down max-[563px]:mx-4">
      <PageTitle text="게시글 등록" className="mt-5 mb-7" />
      <PostForm mode="add" />
      <Screws />
    </div>
  );
}

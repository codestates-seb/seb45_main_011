'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import usePostModalStore from '@/stores/postModalStore';
import useTestUserStore from '@/stores/testUserStore';
import usePostStore from '@/stores/postStore';

interface ContolMenuProps {
  usage: 'post' | 'comment';
  targetId: number;
  ownerId: number;
}
export default function ControlMenu({
  usage,
  targetId,
  ownerId,
}: ContolMenuProps) {
  const router = useRouter();

  const userId = useTestUserStore((state) => state.userId);
  const { setEditMode, setTargetId } = usePostStore();

  if (userId !== ownerId) return null;

  const open = usePostModalStore((state) => state.open);

  const handleEdit = () => {
    if (usage === 'post') return router.push(`/post/edit/${targetId}`);
    setTargetId(targetId);
    setEditMode(true);
    return null;
  };

  const handleDelete = () => {
    // 삭제 모달
    if (usage === 'post') return open();
  };

  return (
    <div className="relative group w-[34px] h-[34px] bg-brown-50 border-2 border-brown-70 rounded-[50%] common-drop-shadow">
      <Image
        className="absolute top-1/2 -mt-[2.5px] left-1/2 -ml-[10px]"
        src="/assets/icon/more.svg"
        alt="수정, 삭제 버튼"
        width={20}
        height={5}></Image>
      <div className=" absolute -left-7 w-[92px] h-[114px] group-hover:block">
        <div className="hidden absolute left-0 bottom-0 w-[92px] h-[76px] group-hover:flex flex-col justify-center items-center border-2 border-brown-70 bg-brown-50 rounded-lg common-drop-shadow text-brown-10 text-[1rem] leading-4 font-bold">
          <button
            className="w-full pb-[10px] border-dashed border-b-[1px] border-brown-10"
            onClick={handleEdit}>
            수정하기
          </button>

          <button className="w-full pt-[10px]" onClick={handleDelete}>
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import LeafInfo from '@/components/LeafInfo';
import ModalPortal from '@/components/common/ModalPortal';
import Modal from '@/components/common/Modal';
import DiaryForm from '@/components/DiaryForm';
import LeafDiary from '@/components/LeafDiary';
import Screws from '@/components/common/Screws';
import { DiaryDeleteModal } from '@/components/DiaryDeleteModal';

import useLeafStore from '@/stores/leafStore';

import { getLeaf } from '@/api/LeafAPI';

import { DiaryDataInfo, LeafDataInfo } from '@/types/data';

interface LeafProps {
  params: { leafId: string; userId: string };
}
// TODO: leaf 리팩토링, 비동기처리 로직 작성
export default function Leaf({ params }: LeafProps) {
  const leafId = Number(params.leafId);
  const userId = Number(params.userId);

  const {
    data: leaf,
    isLoading,
    isError,
  } = useQuery<LeafDataInfo>({
    queryKey: ['leaf'],
    queryFn: () => getLeaf(leafId),
  });

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;

  const isModalOpen = useLeafStore((state) => state.isModalOpen);
  const modalCategory = useLeafStore((state) => state.modalCategory);

  const diaryTargetId = useLeafStore((state) => state.diaryTargetId);
  const [diary, setDiary] = useState<DiaryDataInfo>();

  useEffect(() => {
    const targetDiary = leaf?.diary?.find(
      (ele) => ele.diaryId === diaryTargetId,
    );
    setDiary(targetDiary);
  }, [diaryTargetId]);

  // 제거 예정
  // const setUserId = useUserStore((state) => state.setUserId);
  // const leafId = Number(params.leafId);
  // const [leaf, setLeaf] = useState<LeafDataInfo | null>(null);
  // useEffectOnce(() => {
  //   setLeaf(Data.find((ele) => ele.leafId === leafId) as any);
  //   setUserId(params.userId);
  //   const targetDiary = leaf?.diary?.find(
  //     (ele) => ele.diaryId === diaryTargetId,
  //   );
  //   setDiary(targetDiary);
  //   console.log(leaf);
  // });
  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative w-full max-w-[720px] h-[645px] border-gradient rounded-xl">
        <div className="h-full p-5">
          <div className="h-full overflow-y-scroll scrollbar">
            <Screws />
            <LeafInfo
              userId={userId}
              leafName={leaf?.leafName}
              imageUrl={leaf?.imageUrl}
              content={leaf?.content}
              createdAt={leaf?.createdAt}
              diaries={leaf?.diary}
            />
            <LeafDiary diaries={leaf?.diary} />
            {isModalOpen && (
              <ModalPortal>
                <Modal>
                  {modalCategory === 'add' && (
                    <DiaryForm
                      leafId={leafId}
                      userId={userId}
                      mode={modalCategory}
                    />
                  )}
                  {modalCategory === 'edit' && (
                    <DiaryForm
                      imageUrl={diary?.imageUrl}
                      content={diary?.content}
                      title={diary?.title}
                      leafId={leafId}
                      userId={userId}
                      diaryId={diaryTargetId}
                      mode={modalCategory}
                    />
                  )}
                  {modalCategory === 'delete' && (
                    <DiaryDeleteModal
                      leafId={leafId}
                      userId={userId}
                      deleteTargetId={diaryTargetId}
                    />
                  )}
                </Modal>
              </ModalPortal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

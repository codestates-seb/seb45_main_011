'use client';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getLeafsByUserId } from '@/api/leaf';

import useGardenStore from '@/stores/gardenStore';
import useModalStore from '@/stores/modalStore';
import useUserStore from '@/stores/userStore';

import useConnectLeaf from '@/hooks/useConnectLeaf';

import {
  LoadingNotice,
  Leaf,
  ModalPortal,
  Modal,
  CommonButton,
} from '@/components/common';

import { LeafDataInfo } from '@/types/data';

export default function SelectLeafModal() {
  const router = useRouter();

  const { infoTarget, selectedLeafId, setSelectedLeafId, unobserve } =
    useGardenStore();
  const { close } = useModalStore();
  const { userId } = useUserStore();

  const { data: leaves, isLoading } = useQuery<LeafDataInfo[]>(['leaves'], () =>
    getLeafsByUserId(userId),
  );

  const { mutate: connectionMutate } = useConnectLeaf();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLElement) {
      const targetLeaf = event.target.closest('div');

      if (targetLeaf) {
        const leafId = targetLeaf.dataset.leafId;

        setSelectedLeafId(leafId ? leafId : null);
      }
    }
  };

  const handleComplete = () => {
    if (userId && infoTarget) {
      const plantObjId = infoTarget.plantObjId;

      connectionMutate({ userId, plantObjId, selectedLeafId });
    }

    unobserve();
    close();
  };

  const handleCancel = () => close();

  const handleCreate = () => {
    router.push(`/leaf/add/${userId}`);

    close();
  };

  return (
    <ModalPortal>
      <Modal className="w-full min-w-[312px] max-w-[531px] max-[572px]:max-w-[312px]">
        <div className={`flex flex-col gap-7 pt-10 pb-8`}>
          {isLoading && (
            <LoadingNotice
              isTransparent={true}
              className="flex justify-center items-center"
            />
          )}
          {!isLoading && (
            <>
              {leaves && leaves.length > 0 ? (
                <>
                  <section className="grid grid-cols-2 gap-4 place-items-center items-start flex-wrap justify-start max-h-[280px] p-2 mx-7 overflow-y-auto scrollbar max-[530px]:grid-cols-1">
                    {leaves &&
                      leaves.map((leaf) => {
                        const { leafId, leafName, leafImageUrl } = leaf;

                        return (
                          <Leaf
                            key={leafId}
                            location="garden"
                            name={leafName}
                            imageUrl={leafImageUrl}
                            leafId={String(leafId)}
                            selectedLeafId={selectedLeafId}
                            onClick={handleClick}
                          />
                        );
                      })}
                  </section>
                  <div className="flex gap-3 mx-auto">
                    <CommonButton
                      onComplete={handleComplete}
                      type="button"
                      size="md">
                      완료
                    </CommonButton>
                    <CommonButton
                      onCancel={handleCancel}
                      type="button"
                      size="md">
                      취소
                    </CommonButton>
                  </div>
                </>
              ) : (
                <section className="flex flex-col gap-4 items-center mx-auto px-8 font-bold max-[822px]:gap-0">
                  <p className="text-[32px] text-brown-90 max-[822px]:text-2xl">
                    식물 카드가 없어요 : (
                  </p>
                  <p className="mb-4 text-2xl text-brown-70 leading-5 max-[822px]:text-xl">
                    식물 카드를 생성해보세요!
                  </p>
                  <CommonButton onCreate={handleCreate} type="button" size="lg">
                    식물 카드 생성
                  </CommonButton>
                </section>
              )}
            </>
          )}
        </div>
      </Modal>
    </ModalPortal>
  );
}

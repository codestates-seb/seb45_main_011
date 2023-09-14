'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { findLeaves } from '@/api/garden';

import useGardenStore from '@/stores/gardenStore';
import useGardenModalStore from '@/stores/gardenModalStore';
import useUserStore from '@/stores/userStore';

import useConnectLeaf from '@/hooks/useConnectLeaf';

import LoadingNotice from '@/components/common/LoadingNotice';
import ModalPortal from '@/components/common/ModalPortal';
import Modal from '@/components/common/Modal';
import Leaf from '@/components/common/Leaf';
import CommonButton from '@/components/common/CommonButton';

import { LeafDataInfo } from '@/types/data';

export default function SelectLeafModal() {
  const router = useRouter();

  const { infoTarget, selectedLeafId, setSelectedLeafId, unobserve } =
    useGardenStore();
  const { close } = useGardenModalStore();
  const { userId } = useUserStore();

  const { data: leaves, isLoading } = useQuery<LeafDataInfo[]>(['leaves'], () =>
    findLeaves(),
  );

  const { mutate: connectionMutate } = useConnectLeaf();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLElement) {
      const targetLeaf = event.target.closest('div');

      if (targetLeaf) {
        const leafId = targetLeaf.dataset.leafId;

        setSelectedLeafId(leafId ? Number(leafId) : null);
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

  const divStyle = leaves && leaves.length > 0 ? 'w-[512px]' : 'w-[420px]';

  return (
    <ModalPortal>
      <Modal>
        <div
          className={`flex flex-col gap-7 w-full min-w-[312px] max-w-[512px] pt-10 pb-8`}>
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
                  <section className="flex gap-5 flex-wrap justify-start max-h-[280px] mx-7 overflow-auto scrollbar">
                    {leaves &&
                      leaves.map((leaf) => {
                        const { leafId, leafName, leafImageUrl } = leaf;

                        return (
                          <Leaf
                            key={leafId}
                            location="garden"
                            name={leafName}
                            imageUrl={leafImageUrl}
                            leafId={leafId}
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

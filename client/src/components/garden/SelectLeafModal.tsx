'use client';

import { useRouter } from 'next/navigation';

import useGardenModalStore from '@/stores/gardenModalStore';

import ModalPortal from '@/components/common/ModalPortal';
import Modal from '@/components/common/Modal';
import Leaf from '@/components/common/Leaf';
import CommonButton from '@/components/common/CommonButton';

import { LeafDataInfo } from '@/types/common';

export default function SelectLeafModal() {
  const router = useRouter();
  const { close } = useGardenModalStore();

  // fetch 가능성
  const leafs = require('@/mock/leaf.json') as LeafDataInfo[];
  // const leafs = [] as LeafType[] | [];

  // 추가 구현 필요
  // Leaf 컴포넌트의 동작 방식 살짝 변경해야 할 듯
  const handleComplete = () => {};

  const handleCancel = () => close();

  const handleCreate = () => {
    // 추후 사용자 ID로 변경
    router.push('/leaf/add/1');

    close();
  };

  const divStyle = leafs.length > 0 ? 'w-[512px]' : 'w-[420px]';

  return (
    <ModalPortal>
      <Modal>
        <div className={`flex flex-col gap-7 w-[512px] pt-10 pb-8 ${divStyle}`}>
          {leafs.length > 0 ? (
            <>
              <section className="flex gap-5 flex-wrap justify-start max-h-[280px] mx-7 overflow-auto scrollbar">
                {leafs.map((leaf) => (
                  <Leaf key={leaf.leafId} location="garden" data={leaf} />
                ))}
              </section>
              <div className="flex gap-3 mx-auto">
                <CommonButton
                  onComplete={handleComplete}
                  type="button"
                  size="md">
                  완료
                </CommonButton>
                <CommonButton onCancel={handleCancel} type="button" size="md">
                  취소
                </CommonButton>
              </div>
            </>
          ) : (
            <section className="flex flex-col gap-3 items-center mx-auto font-bold">
              <p className="text-[32px] text-brown-90">
                식물 카드가 없어요 : (
              </p>
              <p className="mb-7 text-2xl text-brown-70 leading-6">
                식물 카드를 생성해보세요!
              </p>
              <CommonButton onCreate={handleCreate} type="button" size="lg">
                식물 카드 생성
              </CommonButton>
            </section>
          )}
        </div>
      </Modal>
    </ModalPortal>
  );
}

'use client';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getLeafsByUserId } from '@/api/leaf';

import useLeafsStore from '@/stores/leafsStore';
import useTestUserStore from '@/stores/testUserStore';

import useEffectOnce from '@/hooks/useEffectOnce';

import Modal from '@/components/common/Modal';
import Leaf from '@/components/common/Leaf';
import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import ModalPortal from '@/components/common/ModalPortal';
import AddLeafButton from '@/components/leafs/AddLeafButton';
import { LeafDeleteModal } from '@/components/leafs/LeafDeleteModal';

import { LeafsDataInfo } from '@/types/data';
import ShareButton from '@/components/common/ShareButton';

interface LeafsProps {
  params: { id: string };
}

export default function Leafs({ params }: LeafsProps) {
  // URL path userId
  const pathUserId = Number(params.id);

  const { userId } = useTestUserStore();
  const isModalOpen = useLeafsStore((state) => state.isModalOpen);

  const router = useRouter();

  // 로그인 상태가 아니라면 로그인 페이지로 이동
  useEffectOnce(() => {
    if (!userId) {
      router.push('/signin');
    }
  });

  // 라우팅 될때 비동기 처리가 되어 경고 메세지가 출력됨 -> userId를 이용하여 조건부로 처리한다.
  // 스킵 기능이 있다.
  const {
    data: leafs,
    isLoading,
    isError,
  } = userId
    ? useQuery<LeafsDataInfo[] | null>({
        queryKey: ['leafs'],
        queryFn: () => getLeafsByUserId(pathUserId),
      })
    : { data: null, isLoading: false, isError: false };

  if (isLoading || leafs === null) return <div>loading</div>;
  if (isError) return <div>error</div>;

  // TODO 클릭한 유저 정보 받아와야 한다. (클릭한 유저이름을 상태로 저장? 아니면 서버로 요청?)
  return (
    <div className="flex justify-center items-center pt-[120px]">
      <div className="relative w-full min-w-[312px] max-w-[732px] h-[528px] mx-4 border-gradient rounded-xl shadow-container">
        <ShareButton />
        <Screws />
        <div className="pt-5 pb-4 pl-6 pr-5 flex flex-col gap-5">
          <PageTitle
            text={
              // 변수로 뺴놓는게 가독성이 좋다.
              // 유저Id === path userId를 자주사용하므로 변수로 빼자.
              pathUserId === userId
                ? '내 식물 카드'
                : `${leafs[0].displayName}님의 식물 카드`
            }
          />
          <div className="pt-2 pb-2 pl-2 pr-4 w-full h-[404px] overflow-y-scroll scrollbar grid grid-cols-3 gap-4 place-items-center items-start max-[730px]:grid-cols-2 max-[530px]:grid-cols-1">
            {/** userId와 pathUserId가 일치하면 식물 카드 추가 버튼 렌더링 */}
            {userId === pathUserId && <AddLeafButton userId={userId} />}
            {/* leaf를 구조분해 할당해서 사용 */}
            {leafs?.map((leaf) => (
              <Leaf
                key={leaf.leafId}
                location="leaf"
                name={leaf.leafName}
                imageUrl={leaf.leafImageUrl}
                leafId={leaf.leafId}
                pathUserId={pathUserId}
              />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ModalPortal>
          <Modal>
            <LeafDeleteModal pathUserId={pathUserId} userId={userId} />
          </Modal>
        </ModalPortal>
      )}
    </div>
  );
}

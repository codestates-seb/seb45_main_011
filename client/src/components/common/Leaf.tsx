'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';

import useLeafsStore from '@/stores/leafsStore';
import useModalStore from '@/stores/modalStore';

import { ControlButton, LeafName } from '@/components/common';

interface LeafProps {
  location: 'garden' | 'leaf';
  pathUserId?: string;
  imageUrl: string;
  name: string;
  leafId: string;
  selectedLeafId?: string | null;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Leaf({
  location,
  name,
  imageUrl,
  pathUserId,
  leafId,
  selectedLeafId,
  onClick,
}: LeafProps) {
  const router = useRouter();

  const { setDeleteTargetId, isOwner } = useLeafsStore();
  const { open, changeType } = useModalStore();

  const handleLeafClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(event);
      return null;
    }
    if (location === 'leaf') {
      router.push(`/leaf/${pathUserId}/${leafId}`);
      return null;
    }
  };

  const navigateToLeafEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(`/leaf/edit/${pathUserId}/${leafId}`);
  };

  const openLeafDeleteModal = (
    e: React.MouseEvent<HTMLButtonElement>,
    leafId: string,
  ) => {
    e.stopPropagation();
    setDeleteTargetId(leafId);
    changeType('deleteLeaf');
    open();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex flex-col items-center w-[200px] h-[205px] gap-2 cursor-pointer bg-transparent"
      role="button"
      data-leaf-id={leafId}
      onClick={handleLeafClick}>
      {location === 'garden' && selectedLeafId === leafId ? (
        <div className="absolute flex justify-center items-center w-full h-full border-4 border-dashed border-brown-70 rounded-lg shadow-outer/down bg-brown-20 bg-opacity-[76%] z-30">
          <Image
            src={'/assets/icon/checked.svg'}
            alt="로고"
            width={36}
            height={28}
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      ) : null}

      {location === 'leaf' && isOwner && (
        <div className="flex h-full gap-1 absolute right-2.5 top-2.5 z-20">
          <ControlButton
            usage="edit"
            handleEdit={navigateToLeafEdit}
            className="hover:scale-105 hover:transition-transform"
          />
          <ControlButton
            usage="delete"
            handleDelete={(event) => openLeafDeleteModal(event, leafId)}
            className="hover:scale-105 hover:transition-transform"
          />
        </div>
      )}
      <div
        data-leaf-id={leafId}
        className="w-[200px] h-[160px] rounded-xl border-2 border-brown-50 shadow-outer/down overflow-hidden z-10">
        <Image
          src={imageUrl || ''}
          alt={name}
          width={210}
          height={170}
          className="object-cover w-full h-full z-10 bg-brown-20 isolate"
        />
      </div>

      <LeafName name={name} />
    </motion.div>
  );
}

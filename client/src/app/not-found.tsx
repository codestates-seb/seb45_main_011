'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import Logo from '@/components/common/Logo';
import Screws from '@/components/common/Screws';

import { MOUNT_ANIMATION_VALUES } from '@/constants/values';

export default function NotFound() {
  return (
    <main className="w-screen h-screen pb-10 flex justify-center items-center bg-cover bg-center bg-no-repeat bg-[url('/assets/img/bg_default.png')]">
      <motion.div
        variants={MOUNT_ANIMATION_VALUES}
        initial="initial"
        animate="animate"
        className="relative w-full max-w-[480px] min-w-[328px] border-gradient rounded-xl max-[360px]:w-[328px] shadow-container">
        <div className="pt-10 pb-11 flex flex-col items-center gap-6">
          <Screws />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Logo size="medium" className="mb-[24px]" />
          </motion.div>
          <div className="w-full max-w-[320px] pt-10 pb-14 flex flex-col items-center gap-3 bg-[url('/assets/img/bg_board_md.png')] bg-center bg-no-repeat bg-cover drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] max-[360px]:w-[280px] max-[360px]:pt-11 max-[360px]:pb-10 ">
            <Image
              className="w-[60px] h-[60px] max-[360px]:w-12 max-[360px]:h-12"
              src="/assets/img/warning.svg"
              alt="Warning"
              width={60}
              height={60}
            />
            <h1 className="text-[1.5rem] leading-6 font-bold text-yellow-50 max-[360px]:text-sm">
              Not Found
            </h1>
            <p className=" text-xl leading-5 font-bold text-brown-10 max-[360px]:text-sm">
              페이지를 <b className="text-red-30">못 찾았어요 : (</b>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

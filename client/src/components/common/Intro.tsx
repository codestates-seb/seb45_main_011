'use client';

import { motion } from 'framer-motion';

import Logo from './Logo';
import Screws from './Screws';

import { INTRO_DESC } from '@/constants/contents';
import useClient from '@/hooks/useClient';

export default function Intro() {
  const isClient = useClient();

  return (
    <div
      className="relative mx-4 mb-4 rounded-xl border-gradient shadow-container"
      style={{ marginTop: `${isClient ? window.innerHeight / 5 : 200}px` }}>
      <div className="flex flex-col gap-6 justify-center items-center w-full min-w-[294px] max-w-[440px] h-fit px-10 py-12 max-[480px]:px-8 max-[480px]:py-10">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Logo size="large" />
        </motion.div>
        <div className="flex flex-col gap-1 w-full text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="py-[10px] px-5 mx-5 border-[3px] mb-4 border-brown-70 rounded-xl bg-contain bg-repeat bg-[url('/assets/img/bg_wood_dark.png')] text-xl text-brown-10 font-bold shadow-outer/down break-keep max-[480px]:mx-0">
            <p className="max-[480px]:hidden">{INTRO_DESC.first}</p>
            <p>
              <b className="text-brown-20 text-2xl">{INTRO_DESC.bold}</b>
              {INTRO_DESC.second}
            </p>
          </motion.div>
        </div>
      </div>
      <Screws />
    </div>
  );
}

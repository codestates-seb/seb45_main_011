'use client';

import { motion } from 'framer-motion';

import useClient from '@/hooks/useClient';
import useMainPageButtonAnimation from '@/hooks/useMainPageButtonAnimation';

import Header from '@/components/common/Header';
import LoadingNotice from '@/components/common/LoadingNotice';
import Intro from '@/components/common/Intro';
import ServiceInfo from '@/components/main/ServiceInfo';

import { getScrollTop } from '@/utils/getScrollTop';

import { MOUNT_ANIMATION_VALUES } from '@/constants/values';

export default function Home() {
  const isClient = useClient();
  const { section, button } = useMainPageButtonAnimation(isClient);

  const handleClick = () => {
    const top = getScrollTop(window.innerWidth);

    scroll({ top, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <div className="relative h-full bg-cover bg-center bg-no-repeat bg-[url('/assets/img/bg_default.png')]">
        {!isClient ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
            <LoadingNotice isTransparent={false} />
          </div>
        ) : (
          <>
            <main
              className={`flex flex-col items-center w-fit mx-auto ${
                isClient ? 'block' : 'hidden'
              }`}>
              <motion.div
                variants={MOUNT_ANIMATION_VALUES}
                initial="initial"
                animate="animate">
                <Intro />
              </motion.div>
              <div
                onClick={handleClick}
                className="w-7 h-9 bg-red-30"
                style={{
                  marginTop: `${isClient && window.innerHeight / 7}px`,
                  marginBottom: `${isClient && window.innerHeight / 7}px`,
                }}
              />
            </main>
            <div className="bg-gradient pb-[120px]">
              <div className="flex flex-col items-center gap-[400px] pb-[200px] mt-[120px] mx-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <ServiceInfo key={index} order={index} />
                ))}
              </div>
              <section
                ref={section}
                className="hover:scale-110 transition-transform">
                <button
                  ref={button}
                  className="flex justify-center w-full max-w-[459px] h-fit py-8 mx-auto bg-blue-10">
                  지금 바로 가입하기
                </button>
              </section>
            </div>
          </>
        )}
      </div>
    </>
  );
}

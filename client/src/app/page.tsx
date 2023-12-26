'use client';

import { motion } from 'framer-motion';

import useUserStore from '@/stores/userStore';

import useClient from '@/hooks/useClient';

import {
  Header,
  LoadingNotice,
  Intro,
  Footer,
  NotificationButton,
} from '@/components/common';
import ServiceInfo from '@/components/main/ServiceInfo';
import MainSignupBanner from '@/components/main/MainSignupBanner';
import ScrollDownButton from '@/components/main/ScrollDownButton';
import { InquiryButton } from '@/components/inquiry';

import { getScrollTop } from '@/utils/getScrollTop';

export default function Home() {
  const isClient = useClient();

  const { isEmailLogin, isGoogleLogin } = useUserStore();

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
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: 'easeInOut', duration: 1 }}>
                <Intro />
              </motion.div>
              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 16, opacity: 1 }}
                whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                transition={{
                  ease: 'easeIn',
                  y: { repeat: Infinity, repeatType: 'reverse', duration: 0.5 },
                  opacity: { duration: 1 },
                }}
                style={{
                  marginTop: `${isClient && window.innerHeight / 8}px`,
                  marginBottom: `${isClient && window.innerHeight / 7}px`,
                }}>
                <ScrollDownButton onClick={handleClick} />
              </motion.div>
            </main>
            <div className="bg-gradient h-auto min-h-full pb-[343px]">
              <div className="flex flex-col items-center gap-[400px] pb-[200px] mt-[120px] mx-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <ServiceInfo key={index} order={index} />
                ))}
              </div>
              {!(isEmailLogin || isGoogleLogin) && (
                <motion.section
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{ ease: 'easeInOut', duration: 1 }}>
                  <div className="flex justify-center w-full max-w-[459px] h-fit mx-auto">
                    <MainSignupBanner />
                  </div>
                </motion.section>
              )}
              <NotificationButton />
              <InquiryButton />
            </div>
            <Footer />
          </>
        )}
      </div>
    </>
  );
}

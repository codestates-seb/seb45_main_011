import Header from '@/components/common/Header';
import Intro from '@/components/common/Intro';

import { INTRO_DESC } from '@/constants/contents';

export default function Home() {
  return (
    <>
      <Header />
      <div className="h-full bg-cover bg-center bg-no-repeat bg-[url('/assets/img/bg_default.png')]">
        <main className="flex flex-col items-center w-fit mx-auto">
          <Intro className="mt-[120px]">
            <div className="py-[10px] px-5 border-[3px] mb-4 border-brown-70 rounded-xl bg-contain bg-repeat bg-[url('/assets/img/bg_wood_dark.png')] text-xl text-brown-10 font-bold shadow-outer/down">
              <p>{INTRO_DESC.first}</p>
              <p className="leading-9">
                <b className="text-brown-20 text-2xl">{INTRO_DESC.bold}</b>
                {INTRO_DESC.second}
              </p>
            </div>
          </Intro>
        </main>
      </div>
    </>
  );
}

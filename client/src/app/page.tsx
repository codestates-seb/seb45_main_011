import Header from '@/components/common/Header';
import Intro from '@/components/common/Intro';

import { INTRO_DESC } from '@/constants/contents';

export default function Home() {
  return (
    <>
      <Header />
      <div className="h-full bg-cover bg-center bg-no-repeat bg-[url('/assets/img/bg_default.png')]">
        <main className="flex flex-col items-center w-fit mx-auto">
          <Intro className="mx-4 mt-[120px]">
            <p className="text-[#A54426] text-2xl font-bold">
              {INTRO_DESC.first}
            </p>
            <p className="text-[#A54426] text-2xl font-bold">
              <b className="text-[#4D2113] text-[2rem]">{INTRO_DESC.bold}</b>
              {INTRO_DESC.second}
            </p>
          </Intro>
        </main>
      </div>
    </>
  );
}

import Logo from '@/components/common/Logo';
import Screws from '@/components/common/Screws';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="w-screen h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat bg-[url('/assets/img/bg_default.png')]">
      <div className="relative w-full max-w-[480px] min-w-[328px] border-gradient rounded-xl">
        <div className="h-full pt-10 pb-11 flex flex-col items-center gap-6">
          <Screws />
          <Logo size="medium" className="mb-[24px]" />
          <div className="w-full max-w-[320px] pt-10 pb-14 flex flex-col items-center gap-3 bg-[url('/assets/img/bg_board_md.png')] bg-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Image
              className="w-[60px] h-[60px]"
              src="/assets/img/warning.svg"
              alt="Warning"
              width={60}
              height={60}
            />
            <h1 className="text-[1.5rem] leading-6 font-bold text-yellow-50">
              Not Found
            </h1>
            <p className=" text-xl leading-5 font-bold text-brown-10">
              페이지를 <b className="text-red-30">못 찾았어요 : (</b>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

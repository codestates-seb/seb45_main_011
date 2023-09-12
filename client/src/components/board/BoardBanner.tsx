import Image from 'next/image';

export default function BoardBanner() {
  return (
    <div className="py-[1.375rem] px-[2.75rem] w-full max-w-[720px] h-[132px] bg-[url('/assets/img/bg_grass.png')] bg-cover shadow-outer/down border-[6px] border-green-90 rounded-xl">
      <div className="flex gap-5 items-center">
        <Image src="/assets/img/trophy.svg" alt="" width={52} height={52} />
        <div className="w-full flex flex-col gap-3 items-center justify-between">
          <p className="text-2xl leading-6 text-white-10 font-bold banner-text-shadow common-drop-shadow">
            좋아요를 많이 받은 1 ~ 3위에게
          </p>
          <p className=" text-[2rem] leading-10 font-bold text-white-10 banner-text-shadow common-drop-shadow">
            <b className=" text-[2.5rem] text-yellow-50">매주 포인트</b>를
            지급해 드려요!
          </p>
        </div>
        <Image src="/assets/img/trophy.svg" alt="" width={52} height={52} />
      </div>
    </div>
  );
}

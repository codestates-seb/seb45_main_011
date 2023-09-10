import Image from 'next/image';

export default function RankBoard() {
  return (
    <div className="py-10 w-full max-w-[448px] h-[224px] flex flex-col items-center bg-[url('/assets/img/bg_board_lg.png')] shadow-outer/down">
      <h2 className=" text-2xl leading-6 text-brown-10 font-bold">
        이주의 좋아요 순위
      </h2>
      <div className="pt-5 flex flex-col items-center gap-2 text-base leading-4 text-brown-10 font-normal">
        <p className="flex gap-3 items-center">
          <Image src="/assets/img/gold.svg" alt="1등" width={20} height={28} />
          식집사 님의 첫 바질!!
        </p>
        <p className="flex gap-3 items-center">
          <Image
            src="/assets/img/silver.svg"
            alt="1등"
            width={20}
            height={28}
          />
          도마도 님의 토마토 키우기, 어렵지 않아요!
        </p>
        <p className="flex gap-3 items-center">
          <Image
            src="/assets/img/bronze.svg"
            alt="1등"
            width={20}
            height={28}
          />
          다유기 님의 다육이 성장 일기
        </p>
      </div>
    </div>
  );
}

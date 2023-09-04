interface EmptyDiaryProps {
  leafId: string;
}

export default function EmptyDiary({ leafId }: EmptyDiaryProps) {
  console.log(leafId);
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full pt-6 pb-5 flex flex-col gap-[1.1rem] justify-center items-center max-w-[414px] h-[137px] bg-brown-10 border-2 border-brown-50 rounded-lg">
        <div className="flex flex-col gap-2 text-center">
          <p className="font-bold text-[1.25rem] text-brown-70">
            등록된 일지가 없어요 : (
          </p>
          <p className=" font-bold text-[1rem] text-brown-50">
            일지를 작성해보세요!
          </p>
        </div>
        <button className="px-3 py-2 bg-[url('/assets/img/bg_wood_dark.png')] bg-contain border-2 border-brown-70 rounded-lg shadow-outer/down text-sm font-bold text-brown-10">
          일지 작성
        </button>
      </div>
      {/* 질문:
        1. 아래 코드가 동작 안하는 이유
        2. background-repeat 속성을 이용하고 싶은데 Image태그로 가능한지? 
      */}
      {/* <button className="px-3 py-2 relative bg-transparent">
        <img
          src="/assets/img/bg_wood_dark.png"
          alt=""
          className="absolute right-0 top-0 w-full h-full object-cover"></img>
        <span className="z-10">일지 작성</span>
      </button> */}
    </div>
  );
}

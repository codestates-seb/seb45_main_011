export default function NoImage() {
  return (
    // width 100% 추가
    <div className="w-full flex flex-col justify-center items-center max-w-[232px] h-[180px] bg-brown-10 border-brown-50 border-2 shadow-outer/down rounded-[12px]">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[24px] leading-6 font-bold text-brown-50 mb-2">
          No Image
        </h1>
        <p className="font-bold text-brown-70 mb-6">이미지를 등록해주세요!</p>
        <img src="/assets/img/snow_tree.svg" alt="No Image" />
      </div>
    </div>
  );
}

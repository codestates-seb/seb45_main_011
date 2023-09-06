interface ImageInputProps {
  content: 'profile' | 'post';
}

const renderImgaeInput = ({ content }: ImageInputProps) => {
  if (content === 'post') {
    return (
      <div className="flex flex-col justify-center items-center max-w-[232px] h-[180px] bg-brown-10 border-brown-50 border-2 shadow-outer/down rounded-[12px]">
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

  return (
    <div className="max-w-[100px] h-[100px] bg-[url('/assets/img/bg_default.png')] bg-cover border-brown-50 border-4 rounded-[50%] shadow-outer/down"></div>
  );
};

export default function ImageInput({ content }: ImageInputProps) {
  return renderImgaeInput({ content });
}

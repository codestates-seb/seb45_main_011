export default function Preview({ src }: { src: string }) {
  return (
    // width 100% 추가
    <img
      className="w-full max-w-[232px] border-brown-50 border-2 shadow-outer/down rounded-[12px]"
      src={src}></img>
  );
}

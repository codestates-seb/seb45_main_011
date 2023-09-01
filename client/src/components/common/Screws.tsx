export default function Screws() {
  return (
    <>
      {SCREW_STYLES.map((style) => (
        <div
          key={style}
          aria-hidden
          className={`absolute ${style} w-[14px] h-[14px] bg-[url('/assets/img/screw.svg')]`}
        />
      ))}
    </>
  );
}

const SCREW_STYLES = [
  'top-2 left-2',
  'top-2 right-2',
  'bottom-2 left-2',
  'bottom-2 right-2',
] as const;

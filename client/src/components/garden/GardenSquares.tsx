import { createSquares } from '@/utils/createSquares';

interface GardenSquaresProps {
  uninstallableLocations: { x: number; y: number }[];
}

export default function GardenSquares({
  uninstallableLocations,
}: GardenSquaresProps) {
  const squares = createSquares(uninstallableLocations);

  return (
    <>
      {squares.map(({ x, y, installable }, index) => {
        const squareBg = installable
          ? `hover:border-blue-30 hover:bg-blue-10 hover:bg-[url('/assets/icon/installable.svg')]`
          : `hover:border-red-50 hover:bg-red-10 hover:bg-[url('/assets/icon/uninstallable.svg')]`;

        return (
          <div
            key={index}
            data-position-x={x}
            data-position-y={y}
            data-installable={installable}
            className={`min-w-[60px] min-h-[60px] bg-no-repeat bg-center hover:border-2 hover:border-dashed rounded-lg ${squareBg} opacity-60 transition-[background-color] duration-100`}
          />
        );
      })}
    </>
  );
}

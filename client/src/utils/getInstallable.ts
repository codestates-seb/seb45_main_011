export const getInstallable = (
  x: number,
  y: number,
  position: { x: number; y: number },
  size: 'sm' | 'lg',
) => {
  if (size === 'sm') return x !== position.x || y !== position.y;

  if (x === position.x && y === position.y) return false;
  if (x + 1 === position.x && y === position.y) return false;
  if (x === position.x && y + 1 === position.y) return false;
  if (x + 1 === position.x && y + 1 === position.y) return false;
  if (x === 11 || y === 7) return false;

  return true;
};

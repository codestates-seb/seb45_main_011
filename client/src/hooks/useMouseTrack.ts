import { useState } from 'react';

const useMouseTrack = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  return {
    targetX: mousePosition.x,
    targetY: mousePosition.y,
    setMousePosition,
  };
};

export default useMouseTrack;

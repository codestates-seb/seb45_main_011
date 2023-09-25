import { useState } from 'react';

import throttle from 'lodash/throttle';

import useMouseTrack from './useMouseTrack';

const useMouseDrag = (ref: React.RefObject<HTMLElement>) => {
  const [isDrag, setIsDrag] = useState(false);

  const { targetX, targetY, setMousePosition } = useMouseTrack();

  const handleDragStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (event.target instanceof HTMLButtonElement) return;

    if (ref.current) {
      const x = event.pageX + ref.current.scrollLeft;
      const y = event.pageY + ref.current.scrollTop;

      setIsDrag(true);
      setMousePosition({ x, y });
    }
  };

  const handleDragEnd = () => setIsDrag(false);

  const handleDragMove = throttle((event: React.MouseEvent<HTMLElement>) => {
    if (!isDrag) return;

    if (ref.current) {
      ref.current.scrollLeft = targetX - event.pageX;
      ref.current.scrollTop = targetY - event.pageY;
    }
  }, 50);

  return { isDrag, handleDragStart, handleDragEnd, handleDragMove };
};

export default useMouseDrag;

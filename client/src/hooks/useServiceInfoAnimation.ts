import { useAnimate, useInView } from 'framer-motion';

import { useEffect, useRef } from 'react';

const useServiceInfoAnimation = (order: number) => {
  const section = useRef<HTMLElement>(null);
  const isInView = useInView(section);

  const [infoContainer, animateInfoContainer] = useAnimate();
  const [leftInfo, animateLeftInfo] = useAnimate();
  const [rightInfo, animateRightInfo] = useAnimate();
  const [bottomInfo, animateBottomInfo] = useAnimate();

  useEffect(() => {
    animateInfoContainer(
      infoContainer.current,
      { y: isInView ? 0 : 100, opacity: isInView ? 1 : 0 },
      { ease: 'easeInOut', duration: isInView ? 1 : 0.01 },
    );

    if (window.innerWidth < 1080) {
      leftInfo.current.style.display = 'none';
      rightInfo.current.style.display = 'none';
      bottomInfo.current.style.display = 'block';

      animateBottomInfo(
        bottomInfo.current,
        { y: isInView ? 0 : 50, opacity: isInView ? 1 : 0 },
        { ease: 'easeInOut', duration: isInView ? 1 : 0.01, delay: 0.5 },
      );
    }

    if (window.innerWidth >= 1080) {
      bottomInfo.current.style.display = 'none';

      animateRightInfo(
        rightInfo.current,
        { x: isInView ? 0 : 100, opacity: isInView ? 1 : 0 },
        {
          ease: 'easeInOut',
          duration: isInView ? 0.7 : 0.01,
          delay: order === 1 ? 0.5 : 1,
        },
      );

      animateLeftInfo(
        leftInfo.current,
        { x: isInView ? 0 : -100, opacity: isInView ? 1 : 0 },
        {
          ease: 'easeInOut',
          duration: isInView ? 0.7 : 0.01,
          delay: order === 1 ? 1 : 0.5,
        },
      );

      leftInfo.current.style.display = isInView ? 'block' : 'none';
      rightInfo.current.style.display = isInView ? 'block' : 'none';
    }
  }, [isInView]);

  return { section, infoContainer, leftInfo, rightInfo, bottomInfo };
};

export default useServiceInfoAnimation;

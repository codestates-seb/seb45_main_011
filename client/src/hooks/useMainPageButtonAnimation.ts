import { useEffect, useRef } from 'react';

import { useAnimate, useInView } from 'framer-motion';

const useMainPageButtonAnimation = (isClient: boolean) => {
  const section = useRef<HTMLElement>(null);
  const isInView = useInView(section);

  const [button, animateButton] = useAnimate();

  useEffect(() => {
    if (isClient) {
      animateButton(
        button.current,
        { y: isInView ? 0 : 100, opacity: isInView ? 1 : 0 },
        { ease: 'easeInOut', duration: isInView ? 1 : 0.7 },
      );
    }
  }, [isInView]);

  return { section, button };
};

export default useMainPageButtonAnimation;

import { useEffect, useRef, useState } from 'react';

const useDetectClose = (initialState: boolean) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleChangeSelected = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const changeSelected = (event: Event) => {
      if (ref.current && event.target) {
        const target = event.target as Node;

        if (!ref.current.contains(target)) {
          setIsOpen(!isOpen);
        }
      }
    };

    if (isOpen) {
      window.addEventListener('click', changeSelected);

      return () => {
        window.removeEventListener('click', changeSelected);
      };
    }
  }, [isOpen]);

  return { handleChangeSelected, setIsOpen, isOpen, ref };
};

export default useDetectClose;

import { useRef, useEffect } from 'react';

const useTyping = (contents) => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  let pointer = 0;

  useEffect(() => {
    async function typing() {
      const paragraph = paragraphRef.current;
      let currentLetter = contents[pointer++];

      if (paragraph) {
        paragraph.innerHTML += currentLetter;

        if (pointer > contents.length) {
          paragraph.textContent = '';
          pointer = 0;
        }
      }
    }

    setInterval(typing, 200);
  }, []);

  return { paragraphRef };
};

export default useTyping;

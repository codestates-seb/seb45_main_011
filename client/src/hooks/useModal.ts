import { useEffect, useState } from 'react';

const useModal = (isOpen: boolean) => {
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById('modal-root'));
  }, [isOpen]);

  return { portalElement };
};

export default useModal;

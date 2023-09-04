import { createPortal } from 'react-dom';

export default function ModalPortal({
  children,
}: {
  children: React.ReactNode;
}) {
  const modalRoot = document.getElementById('modal-root') as HTMLDivElement;

  return createPortal(children, modalRoot);
}

import { Header } from '@/components/common';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main
        className={`h-full pt-[100px] pb-2 bg-cover bg-center bg-no-repeat bg-[url('/assets/img/bg_default.png')]`}>
        {children}
      </main>
    </>
  );
}

import Header from '@/components/common/Header';

export default function LeafsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="h-full bg-cover bg-center bg-no-repeat bg-[url('/assets/img/bg_default.png')]">
        {children}
      </main>
    </>
  );
}

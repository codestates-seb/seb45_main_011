import Header from '@/components/common/Header/Header';

export default function GardenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center h-full bg-cover bg-center bg-no-repeat bg-[url('/assets/img/bg_default.png')]">
        {children}
      </div>
    </>
  );
}

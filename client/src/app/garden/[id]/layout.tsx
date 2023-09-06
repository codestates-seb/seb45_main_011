import Header from '@/components/common/Header/Header';

export default function GardenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

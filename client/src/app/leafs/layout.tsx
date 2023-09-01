import Header from "@/components/common/Header/Header";

export default function LeafsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}

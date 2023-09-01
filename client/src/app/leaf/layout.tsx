import Header from "@/components/common/Header/Header";

export default function LeafLayout({
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

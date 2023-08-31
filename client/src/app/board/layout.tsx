export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>헤더입니다!</div>
      <main>{children}</main>
    </>
  );
}

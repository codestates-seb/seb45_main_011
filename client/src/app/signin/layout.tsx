export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full bg-cover bg-no-repeat bg-[url('/assets/img/bg_default.png')]">
      {children}
    </main>
  );
}

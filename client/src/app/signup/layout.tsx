import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원 가입 - Grow Story',
  description: '나만의 정원을 꾸며 보세요!',
  applicationName: 'Grow Story',
  keywords: [
    '식물',
    '반려 식물',
    '식집사',
    '식물 커뮤니티',
    '커뮤니티',
    '정원',
    '정원 꾸미기',
    '꾸미기',
  ],
  openGraph: {
    title: '회원 가입 - Grow Story',
    images: '/assets/img/bg_default_post.png',
    description: '나만의 정원을 꾸며보세요!',
  },
};

export default function SignupLayout({
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

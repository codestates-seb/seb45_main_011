import type { Metadata } from 'next';

import Header from '@/components/common/Header';

export const metadata: Metadata = {
  title: '식물 카드 목록 - Grow Story',
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
    title: '식물 카드 목록 - Grow Story',
    images: '/assets/img/bg_default_post.png',
    description: '나만의 정원을 꾸며보세요!',
  },
};

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

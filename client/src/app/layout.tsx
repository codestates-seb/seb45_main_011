import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '@/styles/globals.css';
import ReactQueryProvider from '@/components/common/ReactQueryProvider';

const galmuri = localFont({
  src: [
    {
      path: 'fonts/Galmuri11.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/Galmuri11-Bold.woff2',
      weight: '700',
      style: 'bold',
    },
  ],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Grow Story',
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
    title: 'Grow Story',
    images: '/assets/img/bg_default_post.png',
    description: '나만의 정원을 꾸며보세요!',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <meta content="#F4C26F" name="theme-color" />
        <meta content="#F4C26F" name="msapplication-navbutton-color" />
        <meta content="#F4C26F" name="apple-mobile-web-app-status-bar-style" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <link rel="icon" href="/assets/img/favicon.png" />
      </head>
      <body className={`h-full relative bg-[#63A44A] ${galmuri.className}`}>
        <ReactQueryProvider>
          {children}

          <div id="modal-root"></div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

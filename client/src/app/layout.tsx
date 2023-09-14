import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <body className={`h-full relative bg-[#63A44A] ${galmuri.className}`}>
        <ReactQueryProvider>
          {children}

          <div id="modal-root"></div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

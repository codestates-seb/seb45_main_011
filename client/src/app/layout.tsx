import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';

import '@/styles/globals.css';

import AuthContext from '@/context/AuthContext';

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
    <html lang="ko">
      <body className={`relative ${galmuri.className}`}>
        <AuthContext>
          {children}
          <ul className="flex flex-col gap-5 p-5 mt-9 border-4 border-gray-30">
            <li>
              <Link href="/">홈</Link>
            </li>
            <li>
              <Link href="/signin">로그인</Link>
            </li>
            <li>
              <Link href="/signup">회원가입</Link>
            </li>
            <li>
              <Link href="/garden/1">정원</Link>
            </li>
            <li>
              <Link href="/leafs/1">식물 카드</Link>
            </li>
            <li>
              <Link href="/leaf/1/1">식물 카드 상세</Link>
            </li>
            <li>
              <Link href="/leaf/add/1">식물 카드 등록</Link>
            </li>
            <li>
              <Link href="/leaf/edit/1/1">식물 카드 편집</Link>
            </li>
            <li>
              <Link href="/board">게시판</Link>
            </li>
            <li>
              <Link href="/post/1">게시글 상세</Link>
            </li>
            <li>
              <Link href="/post/add">게시글 등록</Link>
            </li>
            <li>
              <Link href="/post/edit/1">게시글 편집</Link>
            </li>
          </ul>
          <div id="modal-root"></div>
        </AuthContext>
      </body>
    </html>
  );
}

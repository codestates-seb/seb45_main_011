// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || '',
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
//     }),
//   ],
//   // secret: process.env.NEXTAUTH_SECRET,
//   debug: true,
// });

// export { handler as GET, handler as POST };

import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  // secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: '/auth/signIn',
  // },
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

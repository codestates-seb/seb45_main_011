import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        '520543772448-jv2ak4omppk9md32iq4pbvh4l2mgh18p.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],
  // secret: 'RACTnOBO4wu6nVhCC6F9BzVEO1OSt+Tv4QBbYANyDyk',
  debug: true,
});

export { handler as GET, handler as POST };

import NextAuth from 'next-auth';
import Kinde from 'next-auth/providers/kinde';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Kinde],
  callbacks: {
    authorized: async ({ auth }) => (auth !== null),
  },
  trustHost: true
});

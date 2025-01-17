import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import serverConfig from "rc/config/server.config";

const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: serverConfig.AUTH_GOOGLE_ID,
      clientSecret: serverConfig.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.accessToken = token.accessToken as string;
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};
export default authOptions;

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
};
export default authOptions;

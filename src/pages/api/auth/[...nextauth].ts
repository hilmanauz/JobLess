import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  callbacks: {
    async jwt({token, account}) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken
        token.userRole = "admin"
      }
      return token;
    },
    redirect: async ({url, baseUrl})=>{
      if (url === '/login') {
        return Promise.resolve('/')
      }
      return  Promise.resolve('/')
    }
  }
});
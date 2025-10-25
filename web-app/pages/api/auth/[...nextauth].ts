import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { getServerSession } from "next-auth"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: any) {
      session.user.id = token.sub
      return session
    }
  }
}

export default NextAuth(authOptions)

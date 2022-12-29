
import { NextApiHandler } from "next";
import log from "logging-service"
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GitHubProvider from 'next-auth/providers/github'
import prisma from '../../../lib/prisma'
import { url } from "inspector";
import NextAuth, { User as NextAuthUser } from 'next-auth'
interface NextAuthUserWithStringId extends NextAuthUser {
id: string
}

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
  ],
  adapter: PrismaAdapter(prisma),
  debug: true,
  useSecureCookies: false,
  // callbacks: {
  //   async session({ session, token, user }) {

  //     return session
  //   }
  // },
  secret: process.env.NEXTAUTH_SECRET,
};


export default NextAuth(authOptions)

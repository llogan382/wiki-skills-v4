
import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GitHubProvider from 'next-auth/providers/github'
import prisma from '../../../lib/prisma'
import { url } from "inspector";


export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.id = user.id
      session.email = user.email

      return session
    }
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};


export default NextAuth(authOptions)


import { NextApiHandler } from "next";
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
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        } as NextAuthUserWithStringId
      },
    }),
  ],
  callback: {
    signIn(user, account, profile) {
        user.name = slug(user.email.slice(0, user.email.indexOf('@'))) // or whatever else

        return true
      }
  },
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


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
  adapter: PrismaAdapter(prisma),
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
  debug: true,
  logger: {
    error(code, metadata) {
      console.log(code, metadata)
    },
    warn(code) {
      log.warn(code)
    },
    debug(code, metadata) {
      log.debug(code, metadata)
    }
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken
      session.user.id = token.id

      return session
    }
  },
  secret: process.env.SECRET,
};


export default NextAuth(authOptions)

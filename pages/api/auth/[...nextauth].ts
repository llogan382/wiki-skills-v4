
import { NextApiHandler } from "next";
import log from "logging-service"
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from "next-auth/providers/google";

import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

import prisma from '../../../lib/prisma'
import { url } from "inspector";
import NextAuth, { User as NextAuthUser } from 'next-auth'
import { randomUUID, randomBytes } from "crypto";
import { Issuer } from 'openid-client';
import { env } from "node:process";



export const authOptions = {
  authorization: {
    url: "http://localhost:3000/api/auth/signin",
    params: { scope: "email" }
  },


  providers: [
    GitHubProvider({

      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      client: {
        client_id: process.env.NEXT_PUBLIC_GITHUB_ID,
        client_secret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
      },

      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      client: {
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      },
    })
  ],
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
      // console.log('this is session', session);
      // console.log('this is user', user)
      // session.id = user.id
      session.user.id = user.id
      // console.log('this is sess',session)

      return session
    }
  },
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours

    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  },
  debug: true,
  useSecureCookies: false,
  // callbacks: {
  //   async session({ session, token, user }) {
  //     return session
  //   }
  // },
  secret: "5OzLitvYL0eebk4GEDmKFA0c7knRKI8FR/fh6Chawjc=",
  adapter: PrismaAdapter(prisma),
};


export default NextAuth(authOptions)

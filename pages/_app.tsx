import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { Provider } from 'next-auth/client'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

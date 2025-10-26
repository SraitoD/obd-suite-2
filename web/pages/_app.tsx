import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import "@/styles/globals.css"
import { Header } from "@/components/ui/header"
import { BottomNav } from "@/components/ui/bottom-nav"

export default function App({ Component, pageProps }: AppProps) {
  const anyProps = pageProps as any
  return (
    <SessionProvider session={anyProps?.session}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pb-14 pt-14">
          <Component {...pageProps} />
        </main>
        <BottomNav />
      </div>
    </SessionProvider>
  )
}

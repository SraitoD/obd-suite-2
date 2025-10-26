import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { Header } from "@/components/ui/header"
import { MobileNavigationMenu } from "@/components/ui/navigation-menu"
import "@/styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  const anyProps = pageProps as any
  return (
    <SessionProvider session={anyProps?.session}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pb-14">
          <Component {...pageProps} />
        </main>
        <MobileNavigationMenu />
      </div>
    </SessionProvider>
  )
}

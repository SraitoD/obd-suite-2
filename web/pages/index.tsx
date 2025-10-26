import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WrenchScrewdriverIcon, SignalIcon, ClockIcon } from "@heroicons/react/24/outline"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="container flex items-center justify-center h-[calc(100vh-112px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center h-[calc(100vh-112px)] text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Bienvenue dans OBD Suite 2</h1>
          <p className="text-lg text-muted-foreground max-w-prose">
            La solution complète pour le diagnostic et la surveillance de votre véhicule
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <WrenchScrewdriverIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Diagnostic DTC</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Lisez et interprétez les codes de défaut de votre véhicule avec l'aide de notre IA
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <SignalIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Données en temps réel</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Surveillez les paramètres de votre véhicule en direct pendant votre conduite
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <ClockIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Historique</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Consultez l'historique complet des diagnostics et performances de votre véhicule
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  return { props: {} }
}

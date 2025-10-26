import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CarFront, WrenchScrewdriverIcon, BatteryFull, Fuel, Gauge } from "lucide-react"

export default function Dashboard() {
  // Données simulées
  const vehicleStatus = {
    connection: "connected",
    batteryVoltage: 12.6,
    fuelLevel: 75,
    lastCheck: "2023-05-20 14:30",
    dtcCount: 2,
    activeAlerts: ["P0300", "P0171"]
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <Button>Rafraîchir</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Statut connexion</CardTitle>
            <CarFront className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vehicleStatus.connection === "connected" ? (
                <Badge className="bg-green-500/10 text-green-600 border-green-500">
                  Connecté
                </Badge>
              ) : (
                <Badge className="bg-destructive/10 text-destructive border-destructive">
                  Déconnecté
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Dernière vérification: {vehicleStatus.lastCheck}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Batterie</CardTitle>
            <BatteryFull className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicleStatus.batteryVoltage} V</div>
            <p className="text-xs text-muted-foreground mt-2">
              Niveau optimal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carburant</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicleStatus.fuelLevel}%</div>
            <p className="text-xs text-muted-foreground mt-2">
              Autonomie estimée: 420 km
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertes DTC</CardTitle>
            <WrenchScrewdriverIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vehicleStatus.dtcCount > 0 ? (
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="py-1">
                    {vehicleStatus.dtcCount} code{vehicleStatus.dtcCount > 1 ? "s" : ""}
                  </Badge>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">Aucun</span>
                </div>
              )}
            </div>
            {vehicleStatus.activeAlerts.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {vehicleStatus.activeAlerts.map((code, index) => (
                  <Badge key={index} variant="destructive" className="py-0.5 px-2 text-xs">
                    {code}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
            <WrenchScrewdriverIcon className="h-6 w-6" />
            <span>Lire les codes DTC</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
            <Gauge className="h-6 w-6" />
            <span>Données en temps réel</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
            <CarFront className="h-6 w-6" />
            <span>Diagnostic complet</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
            <Fuel className="h-6 w-6" />
            <span>Efficacité carburant</span>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historique récent</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center pt-2 pb-4 border-b last:border-0 last:pb-0">
              <div>
                <div className="font-medium">Diagnostic complet</div>
                <div className="text-sm text-muted-foreground">15 mai 2023</div>
              </div>
              <Badge variant="outline" className="text-xs">
                2 alertes
              </Badge>
            </div>
            <div className="flex justify-between items-center pt-2 pb-4 border-b last:border-0 last:pb-0">
              <div>
                <div className="font-medium">Vidange</div>
                <div className="text-sm text-muted-foreground">10 mai 2023</div>
              </div>
              <Badge variant="secondary" className="text-xs">
                Entretien
              </Badge>
            </div>
            <div className="flex justify-between items-center pt-2 pb-4 border-b last:border-0 last:pb-0">
              <div>
                <div className="font-medium">Lecture DTC</div>
                <div className="text-sm text-muted-foreground">5 mai 2023</div>
              </div>
              <Badge variant="destructive" className="text-xs">
                1 alerte
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export async function getServerSideProps() {
  return { props: {} }
}

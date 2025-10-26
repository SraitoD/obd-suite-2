import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Gauge, CarFront, BatteryFull, Fuel } from "lucide-react"

export default function Dashboard() {
  const { data: session } = useSession()

  // Données simulées - à remplacer par des appels API réels
  const vehicleStats = {
    speed: 0,
    rpm: 0,
    batteryVoltage: 12.6,
    fuelLevel: 75,
    engineTemp: 90,
    lastTripDistance: 42.3,
    avgFuelConsumption: 6.2
  }

  return (
    <div className="container py-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          {session && (
            <div className="text-sm text-muted-foreground">
              Bienvenue, {session.user?.name || session.user?.email}
            </div>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vitesse</CardTitle>
              <Gauge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehicleStats.speed} km/h</div>
              <p className="text-xs text-muted-foreground">Actuelle</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">RPM</CardTitle>
              <CarFront className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehicleStats.rpm}</div>
              <p className="text-xs text-muted-foreground">Tr/min</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Batterie</CardTitle>
              <BatteryFull className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehicleStats.batteryVoltage} V</div>
              <p className="text-xs text-muted-foreground">Tension</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Carburant</CardTitle>
              <Fuel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehicleStats.fuelLevel}%</div>
              <p className="text-xs text-muted-foreground">Niveau restant</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Dernier trajet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-3xl font-bold">{vehicleStats.lastTripDistance} km</div>
                  <p className="text-sm text-muted-foreground">Distance parcourue</p>
                </div>
                <div>
                  <div className="text-3xl font-bold">{vehicleStats.avgFuelConsumption} L/100km</div>
                  <p className="text-sm text-muted-foreground">Consommation moyenne</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Température moteur</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{vehicleStats.engineTemp}°C</div>
              <div className="h-2 w-full rounded-full bg-muted mt-4">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${Math.min(vehicleStats.engineTemp, 120) / 1.2}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>0°C</span>
                <span>60°C</span>
                <span>120°C</span>
              </div>
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

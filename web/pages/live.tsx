import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Gauge, CarFront, BatteryFull, Fuel, Thermometer, Speedometer, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PlayIcon, PauseIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline"
import { Badge } from "@/components/ui/badge"

export default function LivePage() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [vehicleData, setVehicleData] = useState({
    speed: 0,
    rpm: 0,
    batteryVoltage: 12.6,
    fuelLevel: 75,
    engineTemp: 90,
    intakeTemp: 25,
    throttlePosition: 0,
    dtcCount: 0,
    dtcCodes: [] as string[]
  })

  // Simulation de données en temps réel
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isMonitoring) {
      interval = setInterval(() => {
        setVehicleData(prev => ({
          ...prev,
          speed: Math.max(0, Math.min(180, prev.speed + (Math.random() - 0.45) * 20)),
          rpm: Math.max(500, Math.min(7000, prev.rpm + (Math.random() - 0.45) * 500)),
          batteryVoltage: Math.max(11.5, Math.min(14.8, prev.batteryVoltage + (Math.random() - 0.49) * 0.2)),
          fuelLevel: Math.max(0, prev.fuelLevel - Math.random() * 0.1),
          engineTemp: Math.max(70, Math.min(110, prev.engineTemp + (Math.random() - 0.48) * 2)),
          intakeTemp: Math.max(20, Math.min(50, prev.intakeTemp + (Math.random() - 0.48) * 1)),
          throttlePosition: Math.max(0, Math.min(100, prev.throttlePosition + (Math.random() - 0.45) * 10)),
          // Simuler l'apparition aléatoire de codes DTC
          dtcCount: Math.random() > 0.98 ? prev.dtcCount + 1 : prev.dtcCount,
          dtcCodes: Math.random() > 0.98
            ? [...prev.dtcCodes, `P0${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`]
            : prev.dtcCodes
        }))
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isMonitoring])

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring)
    if (!isMonitoring) {
      // Réinitialiser certains valeurs au démarrage
      setVehicleData(prev => ({
        ...prev,
        speed: 0,
        rpm: 500,
        throttlePosition: 0
      }))
    }
  }

  const clearDTC = () => {
    setVehicleData(prev => ({
      ...prev,
      dtcCount: 0,
      dtcCodes: []
    }))
  }

  return (
    <div className="container py-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Données en temps réel</h1>
          <Button onClick={toggleMonitoring} className="gap-2">
            {isMonitoring ? (
              <>
                <PauseIcon className="h-4 w-4" />
                Arrêter
              </>
            ) : (
              <>
                <PlayIcon className="h-4 w-4" />
                Démarrer
              </>
            )}
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vitesse</CardTitle>
              <Speedometer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(vehicleData.speed)} km/h</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">RPM</CardTitle>
              <CarFront className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(vehicleData.rpm)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Batterie</CardTitle>
              <BatteryFull className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehicleData.batteryVoltage.toFixed(1)} V</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Carburant</CardTitle>
              <Fuel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(vehicleData.fuelLevel)}%</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Température moteur</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-3xl font-bold">{Math.round(vehicleData.engineTemp)}°C</div>
                </div>
                <div className="flex-1">
                  <div className="h-3 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${Math.min(vehicleData.engineTemp, 120)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>70°C</span>
                    <span>120°C</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Position papillon</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-3xl font-bold">{Math.round(vehicleData.throttlePosition)}%</div>
                </div>
                <div className="flex-1">
                  <div className="h-3 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${vehicleData.throttlePosition}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Codes DTC actifs</CardTitle>
            {vehicleData.dtcCount > 0 && (
              <Button variant="outline" size="sm" onClick={clearDTC} className="gap-1">
                <WrenchScrewdriverIcon className="h-4 w-4" />
                Effacer
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {vehicleData.dtcCount > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {vehicleData.dtcCodes.map((code, index) => (
                  <Badge key={index} variant="destructive" className="justify-between py-1 px-2">
                    {code}
                    <Zap className="h-3 w-3 ml-2" />
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                <Gauge className="h-8 w-8 mr-2" />
                Aucun code DTC actif détecté
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paramètres avancés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Température admission</div>
                <div className="text-xl font-medium">{Math.round(vehicleData.intakeTemp)}°C</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Tension batterie</div>
                <div className="text-xl font-medium">{vehicleData.batteryVoltage.toFixed(1)} V</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Niveau carburant</div>
                <div className="text-xl font-medium">{Math.round(vehicleData.fuelLevel)}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  return { props: {} }
}

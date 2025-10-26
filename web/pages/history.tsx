import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClockIcon, CarFront, Fuel, WrenchScrewdriverIcon, DocumentTextIcon } from "@heroicons/react/24/outline"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HistoryPage() {
  // Données simulées - à remplacer par des appels API réels
  const trips = [
    {
      id: "trip-001",
      date: "2023-05-15",
      distance: 42.3,
      duration: "1h 15m",
      avgSpeed: 34,
      fuelConsumption: 6.2,
      startLocation: "Paris, France",
      endLocation: "Versailles, France",
      maxSpeed: 112,
      avgRpm: 2450
    },
    {
      id: "trip-002",
      date: "2023-05-10",
      distance: 18.7,
      duration: "35m",
      avgSpeed: 32,
      fuelConsumption: 6.8,
      startLocation: "Paris, France",
      endLocation: "Boulogne-Billancourt, France",
      maxSpeed: 98,
      avgRpm: 2300
    },
    {
      id: "trip-003",
      date: "2023-05-05",
      distance: 215.4,
      duration: "2h 45m",
      avgSpeed: 78,
      fuelConsumption: 5.9,
      startLocation: "Paris, France",
      endLocation: "Reims, France",
      maxSpeed: 132,
      avgRpm: 2800
    }
  ]

  const dtcHistory = [
    {
      id: "dtc-001",
      code: "P0300",
      date: "2023-05-15 14:32",
      description: "Ratés d'allumage détectés dans plusieurs cylindres",
      status: "fixed",
      severity: "high"
    },
    {
      id: "dtc-002",
      code: "P0171",
      date: "2023-04-22 09:15",
      description: "Mélange trop pauvre (banque 1)",
      status: "fixed",
      severity: "medium"
    },
    {
      id: "dtc-003",
      code: "P0420",
      date: "2023-03-10 16:45",
      description: "Efficacité du catalyseur sous le seuil",
      status: "pending",
      severity: "medium"
    },
    {
      id: "dtc-004",
      code: "P0100",
      date: "2023-02-18 11:20",
      description: "Débit ou volume du circuit d'air",
      status: "fixed",
      severity: "low"
    }
  ]

  const maintenanceRecords = [
    {
      id: "maint-001",
      date: "2023-05-20",
      type: "Vidange",
      description: "Vidange huile moteur + filtre",
      mileage: 124500,
      cost: 89.99,
      nextDue: "126500 km"
    },
    {
      id: "maint-002",
      date: "2023-04-10",
      type: "Freins",
      description: "Remplacement plaquettes et disques avant",
      mileage: 123800,
      cost: 345.50,
      nextDue: "150000 km"
    },
    {
      id: "maint-003",
      date: "2023-03-05",
      type: "Filtres",
      description: "Remplacement filtre à air et filtre habitacle",
      mileage: 123000,
      cost: 65.00,
      nextDue: "135000 km"
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive/10 text-destructive border-destructive"
      case "medium": return "bg-yellow-500/10 text-yellow-600 border-yellow-500"
      case "low": return "bg-green-500/10 text-green-600 border-green-500"
      default: return "bg-muted text-muted-foreground border-muted-foreground"
    }
  }

  return (
    <div className="container py-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Historique</h1>
        </div>

        <Tabs defaultValue="trips" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trips">
              <CarFront className="h-4 w-4 mr-2" />
              Trajets
            </TabsTrigger>
            <TabsTrigger value="dtc">
              <WrenchScrewdriverIcon className="h-4 w-4 mr-2" />
              Codes DTC
            </TabsTrigger>
            <TabsTrigger value="maintenance">
              <DocumentTextIcon className="h-4 w-4 mr-2" />
              Entretien
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trips" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historique des trajets</CardTitle>
              </CardHeader>
              <CardContent>
                {trips.length > 0 ? (
                  <div className="space-y-4">
                    {trips.map((trip) => (
                      <Card key={trip.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{trip.startLocation} → {trip.endLocation}</div>
                              <div className="text-sm text-muted-foreground">{trip.date}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{trip.distance} km</div>
                              <div className="text-sm text-muted-foreground">{trip.duration}</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">Vitesse moy.</div>
                              <div>{trip.avgSpeed} km/h</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Consommation</div>
                              <div>{trip.fuelConsumption} L/100km</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Vitesse max</div>
                              <div>{trip.maxSpeed} km/h</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">RPM moy.</div>
                              <div>{trip.avgRpm}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <CarFront className="h-10 w-10 mb-4" />
                    <p>Aucun trajet enregistré</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dtc" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historique des codes DTC</CardTitle>
              </CardHeader>
              <CardContent>
                {dtcHistory.length > 0 ? (
                  <div className="space-y-3">
                    {dtcHistory.map((dtc) => (
                      <div
                        key={dtc.id}
                        className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-shrink-0">
                          <Badge className={getSeverityColor(dtc.severity)}>
                            {dtc.code}
                          </Badge>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{dtc.description}</div>
                          <div className="text-sm text-muted-foreground">{dtc.date}</div>
                        </div>
                        <div>
                          <Badge variant={dtc.status === "fixed" ? "outline" : "destructive"}>
                            {dtc.status === "fixed" ? "Résolu" : "En attente"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <WrenchScrewdriverIcon className="h-10 w-10 mb-4" />
                    <p>Aucun code DTC enregistré</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historique d'entretien</CardTitle>
              </CardHeader>
              <CardContent>
                {maintenanceRecords.length > 0 ? (
                  <div className="space-y-4">
                    {maintenanceRecords.map((record) => (
                      <Card key={record.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{record.type}</div>
                              <div className="text-sm text-muted-foreground">{record.date}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{record.mileage} km</div>
                              <div className="text-sm text-muted-foreground">{record.cost} €</div>
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="text-sm">{record.description}</div>
                            {record.nextDue && (
                              <div className="text-sm text-muted-foreground mt-1">
                                Prochain: {record.nextDue}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <DocumentTextIcon className="h-10 w-10 mb-4" />
                    <p>Aucun enregistrement d'entretien</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  return { props: {} }
}

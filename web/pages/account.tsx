import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserCircleIcon, CarIcon, KeyIcon, BellIcon, DocumentTextIcon } from "@heroicons/react/24/outline"
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AccountPage() {
  const { data: session } = useSession()

  // Données simulées
  const userVehicles = [
    {
      id: "veh-001",
      name: "Peugeot 308",
      year: 2018,
      vin: "VF3XXXXXXXXXXXXXX",
      lastConnection: "2023-05-20 14:30",
      isPrimary: true
    },
    {
      id: "veh-002",
      name: "Renault Clio",
      year: 2015,
      vin: "VF1XXXXXXXXXXXXXX",
      lastConnection: "2023-04-15 09:22",
      isPrimary: false
    }
  ]

  const accountStats = {
    scansThisMonth: 12,
    totalScans: 147,
    dtcResolved: 8,
    maintenanceRecords: 24
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mon compte</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profil utilisateur</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              {session?.user?.image ? (
                <AvatarImage src={session.user.image} alt={session.user.name || "User"} />
              ) : (
                <AvatarFallback className="text-2xl">
                  <UserCircleIcon className="h-10 w-10" />
                </AvatarFallback>
              )}
            </Avatar>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{session?.user?.name || "Utilisateur"}</h2>
                {session?.user?.email && (
                  <Badge variant="secondary" className="text-xs">
                    {session.user.emailVerified ? "Vérifié" : "Non vérifié"}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm">
                  <KeyIcon className="h-4 w-4 mr-2" />
                  Modifier mot de passe
                </Button>
                <Button variant="outline" size="sm">
                  <UserCircleIcon className="h-4 w-4 mr-2" />
                  Modifier profil
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mes véhicules</CardTitle>
            <CardDescription>
              Véhicules enregistrés dans votre compte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userVehicles.map((vehicle) => (
              <div key={vehicle.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-muted">
                    <CarIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-medium">{vehicle.name} ({vehicle.year})</div>
                    <div className="text-sm text-muted-foreground">VIN: {vehicle.vin}</div>
                    <div className="text-sm text-muted-foreground">
                      Dernière connexion: {vehicle.lastConnection}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {vehicle.isPrimary && (
                    <Badge variant="secondary" className="text-xs">
                      Principal
                    </Badge>
                  )}
                  <Button variant="outline" size="sm">
                    Gérer
                  </Button>
                </div>
              </div>
            ))}

            <Button variant="ghost" className="w-full border-dashed border-2">
              <CarIcon className="h-4 w-4 mr-2" />
              Ajouter un véhicule
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
            <CardDescription>
              Activité de votre compte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-sm text-muted-foreground">Analyses ce mois</div>
                <div className="text-2xl font-bold">{accountStats.scansThisMonth}</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-sm text-muted-foreground">Analyses totales</div>
                <div className="text-2xl font-bold">{accountStats.totalScans}</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-sm text-muted-foreground">Codes DTC résolus</div>
                <div className="text-2xl font-bold">{accountStats.dtcResolved}</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-sm text-muted-foreground">Enregistrements entretien</div>
                <div className="text-2xl font-bold">{accountStats.maintenanceRecords}</div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BellIcon className="h-4 w-4" />
                  <span className="font-medium">Notifications</span>
                </div>
                <Badge variant="outline">3 non lues</Badge>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <DocumentTextIcon className="h-4 w-4" />
                  <span className="font-medium">Documents</span>
                </div>
                <Badge variant="outline">12 sauvegardés</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Paramètres du compte</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button variant="outline" className="justify-between">
            Notifications
            <BellIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="justify-between">
            Préférences
            <KeyIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="justify-between">
            Sécurité
            <UserCircleIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="justify-between">
            Abonnement
            <DocumentTextIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="justify-between">
            Support
            <CarIcon className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export async function getServerSideProps() {
  return { props: {} }
}

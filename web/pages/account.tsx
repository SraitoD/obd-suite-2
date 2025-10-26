import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserCircleIcon, EnvelopeIcon, UserIcon, KeyIcon, CarFront, DocumentTextIcon } from "@heroicons/react/24/outline"
import { Badge } from "@/components/ui/badge"

export default function AccountPage() {
  const { data: session } = useSession()

  // Données simulées - à remplacer par des appels API réels
  const userVehicles = [
    {
      id: "veh-001",
      make: "Peugeot",
      model: "308",
      year: 2018,
      vin: "VF3XXXXXXXXXXXXXX",
      licensePlate: "AB-123-CD",
      lastConnection: "2023-05-20 14:30"
    }
  ]

  const subscription = {
    plan: "Premium",
    status: "active",
    renewalDate: "2023-12-15",
    features: [
      "Diagnostic illimité",
      "Historique complet",
      "Données en temps réel",
      "Alertes personnalisées",
      "Support prioritaire"
    ]
  }

  return (
    <div className="container py-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mon compte</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  {session?.user?.image ? (
                    <AvatarImage src={session.user.image} alt={session.user.name || "User"} />
                  ) : (
                    <AvatarFallback className="text-2xl">
                      <UserCircleIcon />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <div className="font-medium">{session?.user?.name || "Utilisateur"}</div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <EnvelopeIcon className="h-4 w-4" />
                    {session?.user?.email}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="w-full gap-2">
                  <UserIcon className="h-4 w-4" />
                  Modifier le profil
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <KeyIcon className="h-4 w-4" />
                  Changer mot de passe
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Abonnement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{subscription.plan}</div>
                  <div className="text-sm text-muted-foreground">
                    Statut: <Badge variant={subscription.status === "active" ? "default" : "destructive"}>
                      {subscription.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Renouvellement: {subscription.renewalDate}
                  </div>
                </div>
                <Button variant="outline">Gérer l'abonnement</Button>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Fonctionnalités incluses:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {subscription.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Mes véhicules</CardTitle>
          </CardHeader>
          <CardContent>
            {userVehicles.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {userVehicles.map((vehicle) => (
                  <Card key={vehicle.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{vehicle.make} {vehicle.model} ({vehicle.year})</div>
                          <div className="text-sm text-muted-foreground">{vehicle.licensePlate}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Dernière connexion</div>
                          <div className="font-medium">{vehicle.lastConnection}</div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="text-sm text-muted-foreground">VIN: {vehicle.vin}</div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1 gap-1">
                          <CarFront className="h-3.5 w-3.5" />
                          Voir détails
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 gap-1">
                          <DocumentTextIcon className="h-3.5 w-3.5" />
                          Historique
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <CarFront className="h-10 w-10 mb-4" />
                <p>Aucun véhicule enregistré</p>
                <Button variant="outline" className="mt-4 gap-2">
                  <CarFront className="h-4 w-4" />
                  Ajouter un véhicule
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <div>
                  <div className="font-medium">Notifications</div>
                  <div className="text-sm text-muted-foreground">Alertes et rappels</div>
                </div>
                <Button variant="outline" size="sm">
                  Gérer
                </Button>
              </div>
              <div className="flex justify-between items-center py-2 border-t">
                <div>
                  <div className="font-medium">Préférences</div>
                  <div className="text-sm text-muted-foreground">Unités, langue</div>
                </div>
                <Button variant="outline" size="sm">
                  Modifier
                </Button>
              </div>
              <div className="flex justify-between items-center py-2 border-t">
                <div>
                  <div className="font-medium">Confidentialité</div>
                  <div className="text-sm text-muted-foreground">Données et partage</div>
                </div>
                <Button variant="outline" size="sm">
                  Voir
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <div>
                  <div className="font-medium">Appareils connectés</div>
                  <div className="text-sm text-muted-foreground">2 appareils autorisés</div>
                </div>
                <Button variant="outline" size="sm">
                  Voir
                </Button>
              </div>
              <div className="flex justify-between items-center py-2 border-t">
                <div>
                  <div className="font-medium">Connexions récentes</div>
                  <div className="text-sm text-muted-foreground">Activité du compte</div>
                </div>
                <Button variant="outline" size="sm">
                  Voir
                </Button>
              </div>
              <div className="flex justify-between items-center py-2 border-t">
                <div>
                  <div className="font-medium">Authentification à 2 facteurs</div>
                  <div className="text-sm text-muted-foreground">Non activée</div>
                </div>
                <Button variant="outline" size="sm">
                  Configurer
                </Button>
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

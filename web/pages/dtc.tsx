import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { WrenchScrewdriverIcon, MagnifyingGlassIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { Badge } from "@/components/ui/badge"

export default function DTCPage() {
  const [dtcCode, setDtcCode] = useState("")
  const [searchResult, setSearchResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [recentCodes, setRecentCodes] = useState([
    { code: "P0300", description: "Ratés d'allumage détectés", date: "2023-05-15", severity: "high" },
    { code: "P0171", description: "Mélange trop pauvre (banque 1)", date: "2023-04-22", severity: "medium" },
    { code: "P0420", description: "Efficacité du catalyseur sous le seuil", date: "2023-03-10", severity: "medium" },
  ])

  const handleSearch = async () => {
    if (!dtcCode.trim()) return

    setIsLoading(true)
    try {
      // Simulation d'appel API - à remplacer par un vrai appel
      const mockResponses = {
        P0300: {
          code: "P0300",
          description: "Ratés d'allumage détectés dans plusieurs cylindres",
          explanation: "Ce code indique que le système de contrôle du moteur a détecté des ratés d'allumage aléatoires dans plusieurs cylindres. Cela peut être causé par des bougies d'allumage défectueuses, des bobines d'allumage défectueuses, des injecteurs de carburant encrassés, une faible compression ou des problèmes de mélange air/carburant.",
          severity: "high",
          possibleCauses: [
            "Bougies d'allumage usées ou défectueuses",
            "Bobines d'allumage défectueuses",
            "Injecteurs de carburant encrassés ou défectueux",
            "Faible compression dans un ou plusieurs cylindres",
            "Problèmes de mélange air/carburant",
            "Fuite dans le système d'admission d'air"
          ],
          recommendedActions: [
            "Vérifier et remplacer les bougies d'allumage si nécessaire",
            "Tester les bobines d'allumage et les remplacer si défectueuses",
            "Nettoyer ou remplacer les injecteurs de carburant",
            "Effectuer un test de compression",
            "Vérifier les fuites dans le système d'admission d'air",
            "Contrôler le système de carburant pour une pression adéquate"
          ]
        },
        P0171: {
          code: "P0171",
          description: "Mélange trop pauvre (banque 1)",
          explanation: "Ce code indique que le mélange air/carburant est trop pauvre (trop d'air, pas assez de carburant) dans la banque 1 du moteur. Cela peut être causé par des fuites de vide, un capteur MAF défectueux, des injecteurs de carburant encrassés, une pompe à carburant faible ou un régulateur de pression de carburant défectueux.",
          severity: "medium",
          possibleCauses: [
            "Fuite dans le système d'admission d'air après le débitmètre",
            "Débitmètre d'air (MAF) défectueux ou sale",
            "Injecteurs de carburant encrassés ou défectueux",
            "Pompe à carburant faible",
            "Régulateur de pression de carburant défectueux",
            "Fuite dans le système PCV",
            "Capteur d'oxygène (sonde lambda) défectueux"
          ],
          recommendedActions: [
            "Inspecter visuellement les tuyaux et durites pour détecter les fuites",
            "Nettoyer ou remplacer le débitmètre d'air",
            "Tester la pression de carburant",
            "Vérifier et nettoyer les injecteurs de carburant",
            "Tester le capteur d'oxygène",
            "Contrôler le système PCV"
          ]
        }
      }

      // Simulation de délai de réseau
      await new Promise(resolve => setTimeout(resolve, 800))

      setSearchResult(mockResponses[dtcCode as keyof typeof mockResponses] || {
        code: dtcCode,
        description: "Code DTC non trouvé",
        explanation: "Nous n'avons pas d'information sur ce code DTC. Veuillez vérifier que le code est correct ou contactez un professionnel.",
        severity: "unknown",
        possibleCauses: [],
        recommendedActions: ["Vérifier le code DTC", "Consulter un mécanicien"]
      })

      // Ajouter à l'historique si ce n'est pas un code inconnu
      if (mockResponses[dtcCode as keyof typeof mockResponses] && !recentCodes.some(item => item.code === dtcCode)) {
        setRecentCodes([...recentCodes.slice(0, 2), {
          code: dtcCode,
          description: mockResponses[dtcCode as keyof typeof mockResponses].description,
          date: new Date().toISOString().split('T')[0],
          severity: mockResponses[dtcCode as keyof typeof mockResponses].severity
        }])
      }
    } catch (error) {
      console.error("Error searching DTC:", error)
      setSearchResult({
        code: dtcCode,
        description: "Erreur lors de la recherche",
        explanation: "Une erreur est survenue lors de la recherche de ce code DTC. Veuillez réessayer plus tard.",
        severity: "unknown"
      })
    } finally {
      setIsLoading(false)
    }
  }

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
          <h1 className="text-2xl font-bold">Diagnostic DTC</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recherche de code DTC</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Ex: P0300"
                value={dtcCode}
                onChange={(e) => setDtcCode(e.target.value.toUpperCase())}
                className="max-w-sm"
              />
              <Button onClick={handleSearch} disabled={isLoading}>
                <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                {isLoading ? "Recherche..." : "Rechercher"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {searchResult && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <WrenchScrewdriverIcon className="h-5 w-5" />
                  {searchResult.code}: {searchResult.description}
                </CardTitle>
                <Badge className={getSeverityColor(searchResult.severity)}>
                  {searchResult.severity === "high" && "Urgent"}
                  {searchResult.severity === "medium" && "Modéré"}
                  {searchResult.severity === "low" && "Faible"}
                  {searchResult.severity === "unknown" && "Inconnu"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Explication:</h3>
                <p className="text-sm text-muted-foreground">{searchResult.explanation}</p>
              </div>

              {searchResult.possibleCauses && searchResult.possibleCauses.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Causes possibles:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {searchResult.possibleCauses.map((cause: string, index: number) => (
                      <li key={index}>{cause}</li>
                    ))}
                  </ul>
                </div>
              )}

              {searchResult.recommendedActions && searchResult.recommendedActions.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Actions recommandées:</h3>
                  <ul className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                    {searchResult.recommendedActions.map((action: string, index: number) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Codes récents</CardTitle>
          </CardHeader>
          <CardContent>
            {recentCodes.length > 0 ? (
              <div className="space-y-3">
                {recentCodes.map((code, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <div className="font-medium">{code.code}: {code.description}</div>
                      <div className="text-sm text-muted-foreground">{code.date}</div>
                    </div>
                    <Badge className={getSeverityColor(code.severity)}>
                      {code.severity === "high" && "Urgent"}
                      {code.severity === "medium" && "Modéré"}
                      {code.severity === "low" && "Faible"}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <ExclamationTriangleIcon className="h-10 w-10 mb-2" />
                <p>Aucun code DTC récent trouvé</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  return { props: {} }
}

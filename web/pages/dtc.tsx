import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { WrenchScrewdriverIcon, MagnifyingGlassIcon, InformationCircleIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

export default function DTCPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])

  // Données simulées de codes DTC
  const dtcDatabase = [
    {
      code: "P0300",
      description: "Ratés d'allumage détectés dans plusieurs cylindres",
      severity: "high",
      possibleCauses: [
        "Bougies d'allumage défectueuses",
        "Bobines d'allumage défectueuses",
        "Problèmes de compression",
        "Mélange air/carburant incorrect"
      ],
      solutions: [
        "Vérifier et remplacer les bougies si nécessaire",
        "Tester les bobines d'allumage",
        "Contrôler la compression des cylindres",
        "Vérifier le système d'injection"
      ]
    },
    {
      code: "P0171",
      description: "Mélange trop pauvre (banque 1)",
      severity: "medium",
      possibleCauses: [
        "Fuite de vide",
        "Capteur MAF défectueux",
        "Injecteurs encrassés",
        "Problème de régulation de pression carburant"
      ],
      solutions: [
        "Vérifier les durites et connexions d'admission",
        "Nettoyer ou remplacer le capteur MAF",
        "Tester les injecteurs",
        "Contrôler la pompe à carburant"
      ]
    },
    {
      code: "P0420",
      description: "Efficacité du catalyseur sous le seuil (banque 1)",
      severity: "medium",
      possibleCauses: [
        "Catalyseur endommagé ou usé",
        "Capteur d'oxygène défectueux",
        "Fuite dans le système d'échappement",
        "Mélange air/carburant incorrect"
      ],
      solutions: [
        "Remplacer le catalyseur si nécessaire",
        "Tester les capteurs d'oxygène",
        "Vérifier l'étanchéité du système d'échappement",
        "Contrôler le système d'injection"
      ]
    }
  ]

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([])
      return
    }

    const results = dtcDatabase.filter(item =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
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
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Codes DTC</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recherche de codes DTC</CardTitle>
          <CardDescription>
            Entrez un code DTC ou une description pour obtenir des informations détaillées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              placeholder="Ex: P0300 ou 'ratés d'allumage'"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch}>
              <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
              Rechercher
            </Button>
          </div>
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Résultats de recherche</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {searchResults.map((result, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-4">
                  <Badge className={getSeverityColor(result.severity)}>
                    {result.code}
                  </Badge>
                  <h3 className="font-medium">{result.description}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4 pl-4 border-l border-muted">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <InformationCircleIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                      Causes possibles
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {result.possibleCauses.map((cause: string, i: number) => (
                        <li key={i}>{cause}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <WrenchScrewdriverIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                      Solutions recommandées
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {result.solutions.map((solution: string, i: number) => (
                        <li key={i}>{solution}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {!searchTerm && (
        <Card>
          <CardHeader>
            <CardTitle>Codes DTC courants</CardTitle>
            <CardDescription>
              Voici quelques codes DTC fréquemment rencontrés
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {dtcDatabase.map((dtc, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSearchTerm(dtc.code)
                    setSearchResults([dtc])
                  }}
                >
                  <Badge className={getSeverityColor(dtc.severity)}>
                    {dtc.code}
                  </Badge>
                  <div>
                    <div className="font-medium">{dtc.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export async function getServerSideProps() {
  return { props: {} }
}

import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { getServerSession } from "next-auth/next"
import { useSession, signIn, signOut } from "next-auth/react"
import { authOptions } from './api/auth/[...nextauth]'

interface VehicleStatus {
  dtcCount: number
  lastTrip: {
    date: string
    distance: number
    consumption: number
  }
  recentDiagnostics: Array<{
    code: string
    description: string
    status: 'active' | 'monitored' | 'fixed'
  }>
}

interface HomeProps {
  initialStatus: VehicleStatus
}

const Home: NextPage<HomeProps> = ({ initialStatus }) => {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>OBD Suite 2 - Dashboard</title>
        <meta name="description" content="Tableau de bord OBD2" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">OBD Suite 2</h1>
          {session ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{session.user?.email}</span>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Connexion avec Google
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">État du véhicule</h2>
            <div className={`text-${initialStatus.dtcCount > 0 ? 'red' : 'green'}-500`}>
              {initialStatus.dtcCount > 0 ? `⚠️ ${initialStatus.dtcCount} code(s) DTC actif(s)` : "✅ Aucun code DTC actif"}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Derniers trajets</h2>
            <div className="space-y-2">
              <div className="p-2 bg-gray-50 rounded">
                {initialStatus.lastTrip.date} - {initialStatus.lastTrip.distance} km -
                Consommation: {initialStatus.lastTrip.consumption}L/100km
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Diagnostics récents</h2>
            <div className="space-y-2">
              {initialStatus.recentDiagnostics.map((diag, index) => (
                <div key={index} className={`p-2 rounded ${
                  diag.status === 'active' ? 'bg-yellow-50' :
                  diag.status === 'fixed' ? 'bg-green-50' : 'bg-blue-50'
                }`}>
                  {diag.code} - {diag.description}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  // Données simulées - en production, appeler l'API backend
  const initialStatus: VehicleStatus = {
    dtcCount: 0,
    lastTrip: {
      date: "12/05",
      distance: 42,
      consumption: 6.2
    },
    recentDiagnostics: [
      { code: "P0171", description: "Mélange trop pauvre (corrigé)", status: "fixed" },
      { code: "P0300", description: "Ratés d'allumage (en surveillance)", status: "monitored" }
    ]
  }

  if (!session) {
    return {
      props: {
        initialStatus
      }
    }
  }

  return {
    props: {
      initialStatus
    }
  }
}

export default Home

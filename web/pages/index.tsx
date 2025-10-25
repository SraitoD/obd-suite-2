import type { NextPage } from 'next'
import Head from 'next/head'
import { useSession, signIn, signOut } from "next-auth/react"

const Home: NextPage = () => {
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
            <div className="text-green-500">✅ Aucun code DTC actif</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Derniers trajets</h2>
            <div className="space-y-2">
              <div className="p-2 bg-gray-50 rounded">12/05 - 42 km - Consommation: 6.2L/100km</div>
              <div className="p-2 bg-gray-50 rounded">11/05 - 18 km - Consommation: 7.1L/100km</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Diagnostics récents</h2>
            <div className="space-y-2">
              <div className="p-2 bg-yellow-50 rounded">P0171 - Mélange trop pauvre (corrigé)</div>
              <div className="p-2 bg-green-50 rounded">P0300 - Ratés d'allumage (en surveillance)</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home

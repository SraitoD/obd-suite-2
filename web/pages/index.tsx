import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const { data: session, status } = useSession();
  if (status === "loading") return null;
  return (
    <main style={{ padding: 24 }}>
      <Card>
        <CardHeader><CardTitle>OBD Suite</CardTitle></CardHeader>
        <CardContent>
          {session ? (
            <p>Bienvenue {session.user?.email}</p>
          ) : (
            <p>Bienvenue — pas connecté</p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

// Empêche le SSG (useSession casse en SSG)
export async function getServerSideProps(){ return { props: {} }; }

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function Dashboard() {
  return (
    <main style={{ padding: 24 }}>
      <Card><CardHeader><CardTitle>Dashboard</CardTitle></CardHeader>
      <CardContent>Etat du véhicule, connexion OBD, etc.</CardContent></Card>
    </main>
  );
}

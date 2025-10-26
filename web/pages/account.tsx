import { Badge } from "@/components/ui/badge";
export default function Account() {
  return (
    <main style={{ padding:24 }}>
      <h1>Compte</h1>
      <p>Status: <Badge>déconnecté</Badge></p>
    </main>
  );
}

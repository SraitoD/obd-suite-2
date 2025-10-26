import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function DTC() {
  return (
    <main style={{ padding: 24 }}>
      <Card>
        <CardHeader><CardTitle>Codes défaut (lecture seule)</CardTitle></CardHeader>
        <CardContent>
          <div style={{display:"flex", gap:8}}>
            <Input placeholder="Rechercher un code..." />
            <Button>Rechercher</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

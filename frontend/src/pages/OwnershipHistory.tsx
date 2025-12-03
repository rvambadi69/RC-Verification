import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft, History } from "lucide-react";
import { apiClient } from "@/lib/api";
import { toast } from "sonner";

interface HistoryEntry {
  id: string;
  rcId: string;
  rcNumber: string;
  previousOwnerName: string;
  newOwnerName: string;
  transferredAt: string;
  stolenAtTransfer?: boolean;
  suspiciousAtTransfer?: boolean;
}

const OwnershipHistory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await apiClient.rc.getHistory(id);
        setEntries(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        const message = err && typeof err === "object" && "message" in err ? String((err as { message?: string }).message) : "Load failed";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Ownership History</h1>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><History className="h-5 w-5" /> Transfer Timeline</CardTitle>
            <CardDescription>Chronological record of ownership transfers</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : entries.length === 0 ? (
              <p className="text-muted-foreground">No transfers recorded.</p>
            ) : (
              <div className="space-y-4">
                {entries.map(e => (
                  <div key={e.id} className="p-4 rounded-lg border bg-card/40">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-semibold">{e.previousOwnerName || 'Unknown'} → {e.newOwnerName}</p>
                        <p className="text-xs text-muted-foreground">{new Date(e.transferredAt).toLocaleString()}</p>
                      </div>
                      {(e.stolenAtTransfer || e.suspiciousAtTransfer) && (
                        <span className="text-xs px-2 py-1 rounded bg-destructive/15 text-destructive">Risk</span>
                      )}
                    </div>
                    {(e.stolenAtTransfer || e.suspiciousAtTransfer) && (
                      <p className="text-xs mt-2 text-muted-foreground">
                        {e.stolenAtTransfer && 'Marked stolen at transfer.'} {e.suspiciousAtTransfer && 'Marked suspicious at transfer.'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default OwnershipHistory;

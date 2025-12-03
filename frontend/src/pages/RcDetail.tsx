import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield } from "lucide-react";
import { toast } from "sonner";

const RcDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [rc, setRc] = useState<any>(null);

  const load = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await apiClient.rc.getById(id);
      setRc(data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load RC");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">RC Details</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle>{rc?.rcNumber || rc?.id || "RC Details"}</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : !rc ? (
              <div className="space-y-3">
                <p className="text-muted-foreground">No data</p>
                <Button variant="outline" size="sm" onClick={load}>Retry</Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-2">
                  <h3 className="font-semibold">Owner</h3>
                  <div>Name: {rc.owner?.name ?? "—"}</div>
                  <div>Phone: {rc.owner?.phone ?? "—"}</div>
                  <div>Email: {rc.owner?.email ?? "—"}</div>
                  <div>Address: {rc.owner?.address ?? "—"}</div>
                  <div>Aadhaar Last4: {rc.owner?.aadhaarLast4 ?? "—"}</div>
                  <div>Owners Count: {rc.ownersCount ?? "—"}</div>
                  <div>Previous Owners: {Array.isArray(rc.previousOwners) ? rc.previousOwners.join(", ") : "—"}</div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Vehicle</h3>
                  <div>Type: {rc.vehicleInfo?.type ?? "—"}</div>
                  <div>Make/Model: {(rc.vehicleInfo?.make ?? "—") + " " + (rc.vehicleInfo?.model ?? "")}</div>
                  <div>Variant: {rc.vehicleInfo?.variant ?? "—"}</div>
                  <div>Fuel: {rc.vehicleInfo?.fuelType ?? "—"}</div>
                  <div>Color: {rc.vehicleInfo?.color ?? "—"}</div>
                  <div>Manufacture Year: {rc.vehicleInfo?.manufactureYear ?? "—"}</div>
                  <div>Chassis: {rc.chassisNumber ?? "—"}</div>
                  <div>Engine: {rc.engineNumber ?? "—"}</div>
                  <div>Reg State: {rc.registrationState ?? "—"}</div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Registration</h3>
                  <div>Registration Date: {rc.registrationInfo?.registrationDate ?? "—"}</div>
                  <div>Valid Till: {rc.registrationInfo?.validTill ?? "—"}</div>
                  <div>Active: {rc.registrationInfo?.active === undefined ? "—" : String(rc.registrationInfo?.active)}</div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Insurance & PUC</h3>
                  <div>Provider: {rc.insurance?.provider ?? "—"}</div>
                  <div>Policy #: {rc.insurance?.policyNumber ?? "—"}</div>
                  <div>Insurance Valid Till: {rc.insurance?.validTill ?? "—"}</div>
                  <div>PUC Cert #: {rc.puc?.certificateNumber ?? "—"}</div>
                  <div>PUC Valid Till: {rc.puc?.validTill ?? "—"}</div>
                  <div>Stolen: {rc.stolen === undefined ? "—" : String(rc.stolen)}</div>
                  <div>Suspicious: {rc.suspicious === undefined ? "—" : String(rc.suspicious)}</div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <h3 className="font-semibold">Meta</h3>
                  <div>QR Code ID: {rc.qrCodeId ?? "—"}</div>
                  <div>Created At: {rc.createdAt ?? "—"}</div>
                  <div>Updated At: {rc.updatedAt ?? "—"}</div>
                  <div>ID: {rc.id ?? "—"}</div>
                  <div className="mt-4">
                    <h3 className="font-semibold">Raw JSON</h3>
                    <pre className="p-3 bg-muted rounded overflow-auto text-xs">
{JSON.stringify(rc, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default RcDetail;
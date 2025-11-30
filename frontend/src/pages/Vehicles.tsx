import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, Trash2, RefreshCw, Eye, Replace } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Vehicles = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [adminKey, setAdminKey] = useState("");
  type Owner = { name: string; email?: string; phone?: string; address?: string; aadhaarLast4?: string };
  type VehicleInfo = { make: string; model: string; manufactureYear: string | number; color?: string; fuelType?: string; type?: string; variant?: string };
  type Insurance = { provider?: string; policyNumber?: string; validTill?: string };
  type Puc = { certificateNumber?: string; validTill?: string };
  type RegistrationInfo = { active: boolean; registrationDate?: string; validTill?: string };
  type NewRc = {
    rcNumber: string;
    owner: Owner;
    ownersCount?: number;
    previousOwners: string[];
    vehicleInfo: VehicleInfo;
    registrationState: string;
    chassisNumber: string;
    engineNumber: string;
    insurance: Insurance;
    puc: Puc;
    registrationInfo: RegistrationInfo;
    stolen: boolean;
    suspicious: boolean;
  };

  const [showCreate, setShowCreate] = useState(false);
  const [newRc, setNewRc] = useState<NewRc>({
    rcNumber: "",
    owner: { name: "", email: "", phone: "", address: "", aadhaarLast4: "" },
    ownersCount: 1,
    previousOwners: [],
    vehicleInfo: { make: "", model: "", manufactureYear: "", color: "", fuelType: "", type: "", variant: "" },
    registrationState: "",
    chassisNumber: "",
    engineNumber: "",
    insurance: { provider: "", policyNumber: "", validTill: "" },
    puc: { certificateNumber: "", validTill: "" },
    registrationInfo: { active: true, registrationDate: "", validTill: "" },
    stolen: false,
    suspicious: false,
  });

  const loadAll = async () => {
    try {
      setLoading(true);
      const data = await apiClient.rc.getAll();
      const safe = (Array.isArray(data) ? data : []).filter((x) => x && typeof x === "object");
      setItems(safe);
    } catch (err: unknown) {
      const message = err && typeof err === "object" && "message" in err ? String((err as { message?: string }).message) : "Failed to fetch vehicles";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id: string) => {
    if (!adminKey) {
      toast.error("Enter admin key to delete");
      return;
    }
    try {
      setLoading(true);
      await apiClient.rc.remove(id, adminKey);
      toast.success("Vehicle deleted");
      setItems(prev => prev.filter(v => v.id !== id));
    } catch (err: unknown) {
      const message = err && typeof err === "object" && "message" in err ? String((err as { message?: string }).message) : "Delete failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Vehicle Database</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle>Vehicle Management</CardTitle>
            <CardDescription>
              Manage and view all registered vehicles in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <Input
                placeholder="Admin key for delete"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="max-w-xs"
              />
              <Button variant="outline" size="sm" onClick={loadAll} disabled={loading}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="default" size="sm" onClick={() => setShowCreate((v) => !v)}>
                {showCreate ? "Close" : "Add New Vehicle"}
              </Button>
            </div>

            {showCreate && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-base">Create New Vehicle (Admin)</CardTitle>
                  <CardDescription>Provide details and submit with admin key.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-3">
                  <Input placeholder="Admin Key" value={adminKey} onChange={(e) => setAdminKey(e.target.value)} />
                  <Input placeholder="RC Number" value={newRc.rcNumber} onChange={(e) => setNewRc({ ...newRc, rcNumber: e.target.value })} />
                  <Input placeholder="Owner Name" value={newRc.owner.name} onChange={(e) => setNewRc({ ...newRc, owner: { ...newRc.owner, name: e.target.value } })} />
                  <Input placeholder="Owner Email" value={newRc.owner.email} onChange={(e) => setNewRc({ ...newRc, owner: { ...newRc.owner, email: e.target.value } })} />
                  <Input placeholder="Owner Phone" value={newRc.owner.phone} onChange={(e) => setNewRc({ ...newRc, owner: { ...newRc.owner, phone: e.target.value } })} />
                  <Input placeholder="Owner Address" value={newRc.owner.address} onChange={(e) => setNewRc({ ...newRc, owner: { ...newRc.owner, address: e.target.value } })} />
                  <Input placeholder="Owner Aadhaar Last 4" value={newRc.owner.aadhaarLast4} onChange={(e) => setNewRc({ ...newRc, owner: { ...newRc.owner, aadhaarLast4: e.target.value } })} />
                  <Input
                    type="number"
                    min={1}
                    placeholder="Owners Count"
                    value={String(newRc.ownersCount ?? "")}
                    onChange={(e) => {
                      const val = e.target.value;
                      const num = val === "" ? undefined : Number(val);
                      setNewRc({ ...newRc, ownersCount: typeof num === "number" && !isNaN(num) ? Math.max(1, num) : undefined });
                    }}
                  />
                  <Input placeholder="Previous Owners (comma separated)" value={(newRc.previousOwners || []).join(", ")} onChange={(e) => setNewRc({ ...newRc, previousOwners: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
                  <Input placeholder="Make" value={newRc.vehicleInfo.make} onChange={(e) => setNewRc({ ...newRc, vehicleInfo: { ...newRc.vehicleInfo, make: e.target.value } })} />
                  <Input placeholder="Model" value={newRc.vehicleInfo.model} onChange={(e) => setNewRc({ ...newRc, vehicleInfo: { ...newRc.vehicleInfo, model: e.target.value } })} />
                  <Input placeholder="Year" value={newRc.vehicleInfo.manufactureYear} onChange={(e) => setNewRc({ ...newRc, vehicleInfo: { ...newRc.vehicleInfo, manufactureYear: e.target.value } })} />
                  <Input placeholder="Color" value={newRc.vehicleInfo.color} onChange={(e) => setNewRc({ ...newRc, vehicleInfo: { ...newRc.vehicleInfo, color: e.target.value } })} />
                  <Input placeholder="Fuel Type" value={newRc.vehicleInfo.fuelType} onChange={(e) => setNewRc({ ...newRc, vehicleInfo: { ...newRc.vehicleInfo, fuelType: e.target.value } })} />
                  <Input placeholder="Type" value={newRc.vehicleInfo.type} onChange={(e) => setNewRc({ ...newRc, vehicleInfo: { ...newRc.vehicleInfo, type: e.target.value } })} />
                  <Input placeholder="Variant" value={newRc.vehicleInfo.variant} onChange={(e) => setNewRc({ ...newRc, vehicleInfo: { ...newRc.vehicleInfo, variant: e.target.value } })} />
                  <Input placeholder="Registration State" value={newRc.registrationState} onChange={(e) => setNewRc({ ...newRc, registrationState: e.target.value })} />
                  <Input placeholder="Chassis Number" value={newRc.chassisNumber} onChange={(e) => setNewRc({ ...newRc, chassisNumber: e.target.value })} />
                  <Input placeholder="Engine Number" value={newRc.engineNumber} onChange={(e) => setNewRc({ ...newRc, engineNumber: e.target.value })} />
                  <Input placeholder="Insurance Provider" value={newRc.insurance.provider} onChange={(e) => setNewRc({ ...newRc, insurance: { ...newRc.insurance, provider: e.target.value } })} />
                  <Input placeholder="Policy Number" value={newRc.insurance.policyNumber} onChange={(e) => setNewRc({ ...newRc, insurance: { ...newRc.insurance, policyNumber: e.target.value } })} />
                  <Input placeholder="Insurance Valid Till (YYYY-MM-DD)" value={newRc.insurance.validTill} onChange={(e) => setNewRc({ ...newRc, insurance: { ...newRc.insurance, validTill: e.target.value } })} />
                  <Input placeholder="PUC Certificate Number" value={newRc.puc.certificateNumber} onChange={(e) => setNewRc({ ...newRc, puc: { ...newRc.puc, certificateNumber: e.target.value } })} />
                  <Input placeholder="PUC Valid Till (YYYY-MM-DD)" value={newRc.puc.validTill} onChange={(e) => setNewRc({ ...newRc, puc: { ...newRc.puc, validTill: e.target.value } })} />
                  <div className="grid md:grid-cols-3 gap-3 col-span-2">
                    <div className="flex items-center gap-2">
                      <label className="text-sm">Active</label>
                      <input type="checkbox" checked={newRc.registrationInfo.active} onChange={(e) => setNewRc({ ...newRc, registrationInfo: { ...newRc.registrationInfo, active: e.target.checked } })} />
                    </div>
                    <Input placeholder="Registration Date (YYYY-MM-DD)" value={newRc.registrationInfo.registrationDate} onChange={(e) => setNewRc({ ...newRc, registrationInfo: { ...newRc.registrationInfo, registrationDate: e.target.value } })} />
                    <Input placeholder="Registration Valid Till (YYYY-MM-DD)" value={newRc.registrationInfo.validTill} onChange={(e) => setNewRc({ ...newRc, registrationInfo: { ...newRc.registrationInfo, validTill: e.target.value } })} />
                  </div>
                  <div className="flex items-center gap-3 col-span-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={newRc.stolen} onChange={(e) => setNewRc({ ...newRc, stolen: e.target.checked })} />
                      Stolen
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={newRc.suspicious} onChange={(e) => setNewRc({ ...newRc, suspicious: e.target.checked })} />
                      Suspicious
                    </label>
                    <Button
                      className="ml-auto"
                      onClick={async () => {
                        // Basic validation
                        const errors: string[] = [];
                        if (!adminKey) errors.push("Admin key required");
                        if (!newRc.rcNumber?.trim()) errors.push("RC Number is required");
                        if (!newRc.owner?.name?.trim()) errors.push("Owner Name is required");
                        if (!newRc.registrationState?.trim()) errors.push("Registration State is required");
                        if (!newRc.vehicleInfo.make?.trim()) errors.push("Make is required");
                        if (!newRc.vehicleInfo.model?.trim()) errors.push("Model is required");
                        if (!String(newRc.vehicleInfo.manufactureYear).trim()) errors.push("Manufacture Year is required");
                        if (!newRc.chassisNumber?.trim()) errors.push("Chassis Number is required");
                        if (!newRc.engineNumber?.trim()) errors.push("Engine Number is required");
                        const ownersArr = Array.isArray(newRc.previousOwners) ? newRc.previousOwners.filter(Boolean) : [];
                        const ownersCount = (typeof newRc.ownersCount === "number" && newRc.ownersCount > 0) ? newRc.ownersCount : (1 + ownersArr.length);
                        if (ownersCount < 1) errors.push("Owners Count must be at least 1");

                        if (errors.length) { toast.error(errors[0]); return; }

                        try {
                          setLoading(true);
                          const payload: NewRc = { ...newRc, ownersCount, previousOwners: ownersArr };
                          const created = await apiClient.rc.create(payload, adminKey);
                          toast.success("Vehicle created");
                          setItems((prev) => [created, ...prev]);
                          setShowCreate(false);
                        } catch (err: unknown) {
                          const message = err && typeof err === "object" && "message" in err ? String((err as { message?: string }).message) : "Create failed";
                          toast.error(message);
                        } finally {
                          setLoading(false);
                        }
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : items.length === 0 ? (
              <p className="text-muted-foreground">No vehicles found.</p>
            ) : (
              <div className="grid gap-4">
                {items.map((v) => (
                  <Card key={v.id} className="border">
                    <CardHeader className="py-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">{v.rcNumber}</CardTitle>
                          <CardDescription>
                            {v.vehicleInfo?.make} {v.vehicleInfo?.model} • {v.owner?.name}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => v?.id && navigate(`/rc/${v.id}`)}
                            disabled={!v?.id}
                          >
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => v?.rcNumber && navigate(`/transfer?rc=${encodeURIComponent(v.rcNumber)}`)}
                            disabled={!v?.rcNumber}
                          >
                            <Replace className="h-4 w-4 mr-1" /> Transfer
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => v?.id && removeItem(v.id)}
                            disabled={!v?.id}
                          >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 text-sm">
                      <div className="grid sm:grid-cols-2 gap-2">
                        <div>
                          <div>Owners Count: {v.ownersCount}</div>
                          <div>Previous Owners: {Array.isArray(v.previousOwners) ? v.previousOwners.join(", ") : ""}</div>
                        </div>
                        <div>
                          <div>Chassis: {v.chassisNumber}</div>
                          <div>Engine: {v.engineNumber}</div>
                          <div>Insurance: {v.insurance?.provider} ({v.insurance?.policyNumber})</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Vehicles;
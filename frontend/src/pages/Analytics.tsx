import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";
import { toast } from "sonner";

const Analytics = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/api/rc/stats");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStats(data);
    } catch (e: any) {
      toast.error(e.message || "Failed to load stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

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
            <h1 className="text-xl font-bold">Fraud Analytics</h1>
          </div>
        </div>
      </header> {/* <-- FIXED */}

      <main className="container mx-auto px-4 py-8">
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle>Fraud Detection Analytics</CardTitle>
            <CardDescription>Overview of RC fraud and verification metrics.</CardDescription>
          </CardHeader>

          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : !stats ? (
              <Button variant="outline" size="sm" onClick={load}>
                <BarChart3 className="h-4 w-4 mr-2" /> Load Stats
              </Button>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">Total RCs</CardTitle>
                  </CardHeader>
                  <CardContent className="text-2xl font-bold">{stats.total}</CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">Active</CardTitle>
                  </CardHeader>
                  <CardContent className="text-2xl font-bold">{stats.activeCount}</CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">Stolen / Suspicious</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg">Stolen: {stats.stolenCount}</div>
                    <div className="text-lg">Suspicious: {stats.suspiciousCount}</div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-3">
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">By State</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {stats.byState && Object.keys(stats.byState).length > 0 ? (
                      <ChartContainer
                        config={{ count: { label: "Count", color: "hsl(var(--primary))" } }}
                      >
                        <BarChart data={Object.entries(stats.byState).map(([state, count]) => ({ state, count }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="state" />
                          <YAxis allowDecimals={false} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="count" fill="var(--color-count)" />
                        </BarChart>
                      </ChartContainer>
                    ) : (
                      <p className="text-muted-foreground">No state data.</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="md:col-span-3">
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">Monthly Verifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {Array.isArray(stats.monthlyVerifications) && stats.monthlyVerifications.length > 0 ? (
                      <ChartContainer
                        config={{ count: { label: "Count", color: "hsl(var(--primary))" } }}
                      >
                        <LineChart data={stats.monthlyVerifications}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis allowDecimals={false} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line type="monotone" dataKey="count" stroke="var(--color-count)" />
                        </LineChart>
                      </ChartContainer>
                    ) : (
                      <p className="text-muted-foreground">No monthly data.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>

          <CardContent>
            <p className="text-muted-foreground">
              More detailed reports for law enforcement coming soon.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Analytics;

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle2, AlertTriangle, Search, BarChart3 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">RC Verification</span>
          </div>
          <Button onClick={() => navigate("/dashboard")}>
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block">
            <div className="bg-primary rounded-full p-4 mb-6">
              <Shield className="h-16 w-16 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Smart RC Verification &<br />
            <span className="text-primary">Fraud Detection System</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Instantly verify vehicle Registration Certificates, detect fraud patterns, and ensure authenticity with our intelligent verification system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="text-lg" onClick={() => navigate("/dashboard")}>
              <Shield className="mr-2 h-5 w-5" />
              Start Verification
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card p-6 rounded-lg shadow-card border border-border">
            <div className="bg-success/10 rounded-full p-3 w-fit mb-4">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-xl font-bold mb-2">Instant Verification</h3>
            <p className="text-muted-foreground">
              Scan QR codes on RC cards and verify authenticity in under 1 second. Real-time validation against secure database.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-card border border-border">
            <div className="bg-destructive/10 rounded-full p-3 w-fit mb-4">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="text-xl font-bold mb-2">Fraud Detection</h3>
            <p className="text-muted-foreground">
              Automated checks for duplicate chassis numbers, fake RCs, expired documents, and cloned vehicles across states.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-card border border-border">
            <div className="bg-info/10 rounded-full p-3 w-fit mb-4">
              <BarChart3 className="h-8 w-8 text-info" />
            </div>
            <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
            <p className="text-muted-foreground">
              Comprehensive fraud reports, verification trends, and region-wise heatmaps for law enforcement.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16 bg-muted/30 rounded-lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Scan QR Code", desc: "Use your device to scan the QR code on the RC" },
              { step: "2", title: "System Checks", desc: "Automated fraud detection runs instantly" },
              { step: "3", title: "View Results", desc: "Get complete RC details and fraud score" },
              { step: "4", title: "Audit Log", desc: "Every verification is logged for security" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground">
            Access the dashboard to start verifying vehicle registrations securely.
          </p>
          <Button size="lg" className="text-lg" onClick={() => navigate("/dashboard")}>
            <Shield className="mr-2 h-5 w-5" />
            Go to Dashboard
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/30 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 RC Verification System. Built for transparency and trust.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

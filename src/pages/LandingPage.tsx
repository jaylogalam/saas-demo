import { ExternalLink, Cpu, Layout, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* --- HERO SECTION --- */}
      <header className="relative overflow-hidden pt-16 pb-12 lg:pt-24">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Zap size={14} /> <span>Modern SaaS Starter</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Build Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-muted-foreground">
              SaaS
            </span>{" "}
            Faster
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10">
            A high-performance foundation featuring Zustand, TanStack Query, and
            Tailwind CSS. Pre-configured for scale, speed, and developer
            happiness.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                View Docs <ExternalLink size={18} />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
            >
              Browse Stack
            </Button>
          </div>
        </div>
      </header>

      {/* --- SETUP / TERMINAL SECTION --- */}
      <section className="container mx-auto px-6 py-12">
        <Card className="max-w-3xl mx-auto overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-2 px-4 py-3 bg-muted/50 border-b">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <div className="w-3 h-3 rounded-full bg-chart-4" />
            <div className="w-3 h-3 rounded-full bg-chart-2" />
            <span className="ml-2 text-xs text-muted-foreground font-mono">
              setup.sh
            </span>
          </CardHeader>
          <CardContent className="p-6 font-mono text-sm sm:text-base leading-relaxed">
            <div className="flex gap-3">
              <span className="text-primary">1</span>
              <span className="text-muted-foreground">
                # Update dependencies
              </span>
            </div>
            <div className="flex gap-3 mb-4">
              <span className="text-primary">2</span>
              <span className="text-chart-2">npx npm-check-updates -u</span>
            </div>
            <div className="flex gap-3">
              <span className="text-primary">3</span>
              <span className="text-muted-foreground"># Install & Start</span>
            </div>
            <div className="flex gap-3">
              <span className="text-primary">4</span>
              <span className="text-chart-2">npm install && npm run dev</span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --- FEATURE GRID --- */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Core Libraries */}
          <Card className="hover:border-primary/50 transition-colors">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                <Cpu size={24} />
              </div>
              <CardTitle className="text-xl mb-4">Core Stack</CardTitle>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li>
                  • <strong className="text-foreground">Zustand:</strong> State
                  management
                </li>
                <li>
                  • <strong className="text-foreground">TanStack Query:</strong>{" "}
                  Data fetching
                </li>
                <li>
                  • <strong className="text-foreground">React Router:</strong>{" "}
                  Client navigation
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Styling */}
          <Card className="hover:border-chart-2/50 transition-colors">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center text-chart-2 mb-6">
                <Layout size={24} />
              </div>
              <CardTitle className="text-xl mb-4">Styling Utility</CardTitle>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li>
                  • <strong className="text-foreground">Tailwind CSS:</strong>{" "}
                  Utility-first CSS
                </li>
                <li>
                  • <strong className="text-foreground">CVA:</strong> Class
                  variance authority
                </li>
                <li>
                  • <strong className="text-foreground">Tailwind Merge:</strong>{" "}
                  Smart class merging
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Tooling */}
          <Card className="hover:border-chart-1/50 transition-colors">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-chart-1/10 rounded-lg flex items-center justify-center text-chart-1 mb-6">
                <ShieldCheck size={24} />
              </div>
              <CardTitle className="text-xl mb-4">Code Quality</CardTitle>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li>
                  • <strong className="text-foreground">ESLint:</strong>{" "}
                  Industry-standard linting
                </li>
                <li>
                  • <strong className="text-foreground">TypeScript:</strong>{" "}
                  Strict type checking
                </li>
                <li>
                  • <strong className="text-foreground">Vite:</strong> Instant
                  HMR & bundling
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

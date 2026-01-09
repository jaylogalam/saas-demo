import { ExternalLink, Cpu, Layout, Zap, ShieldCheck } from 'lucide-react'; // Optional: Install lucide-react or use SVG icons

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30 font-sans">
      {/* --- HERO SECTION --- */}
      <header className="relative overflow-hidden pt-16 pb-12 lg:pt-24">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-indigo-500/10 blur-[120px] rounded-full" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
            <Zap size={14} /> <span>Vite + ReactTS Template</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
            Vite{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">
              ReactTS
            </span>{" "}
            Template
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10">
            A high-performance foundation featuring Zustand, TanStack Query, and
            Tailwind CSS. Pre-configured for scale, speed, and developer
            happiness.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/jaylogalam/reactTS"
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Docs <ExternalLink size={18} />
            </a>
            <button
              onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
              className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-all"
            >
              Browse Stack
            </button>
          </div>
        </div>
      </header>

      {/* --- SETUP / TERMINAL SECTION --- */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-800">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="ml-2 text-xs text-slate-500 font-mono">
              setup.sh
            </span>
          </div>
          <div className="p-6 font-mono text-sm sm:text-base leading-relaxed">
            <div className="flex gap-3">
              <span className="text-indigo-400">1</span>
              <span className="text-slate-500"># Update dependencies</span>
            </div>
            <div className="flex gap-3 mb-4">
              <span className="text-indigo-400">2</span>
              <span className="text-emerald-400">npx npm-check-updates -u</span>
            </div>
            <div className="flex gap-3">
              <span className="text-indigo-400">3</span>
              <span className="text-slate-500"># Install & Start</span>
            </div>
            <div className="flex gap-3">
              <span className="text-indigo-400">4</span>
              <span className="text-emerald-400">
                npm install && npm run dev
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE GRID --- */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Core Libraries */}
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-colors">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-400 mb-6">
              <Cpu size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Core Stack</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                • <strong className="text-slate-200">Zustand:</strong> State
                management
              </li>
              <li>
                • <strong className="text-slate-200">TanStack Query:</strong>{" "}
                Data fetching
              </li>
              <li>
                • <strong className="text-slate-200">React Router:</strong>{" "}
                Client navigation
              </li>
            </ul>
          </div>

          {/* Styling */}
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-colors">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400 mb-6">
              <Layout size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              Styling Utility
            </h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                • <strong className="text-slate-200">Tailwind CSS:</strong>{" "}
                Utility-first CSS
              </li>
              <li>
                • <strong className="text-slate-200">CVA:</strong> Class
                variance authority
              </li>
              <li>
                • <strong className="text-slate-200">Tailwind Merge:</strong>{" "}
                Smart class merging
              </li>
            </ul>
          </div>

          {/* Tooling */}
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 transition-colors">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Code Quality</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                • <strong className="text-slate-200">ESLint:</strong>{" "}
                Industry-standard linting
              </li>
              <li>
                • <strong className="text-slate-200">TypeScript:</strong> Strict
                type checking
              </li>
              <li>
                • <strong className="text-slate-200">Vite:</strong> Instant HMR
                & bundling
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
import { Link } from "react-router-dom";
import { appConfig } from "../config/app";
import FeatureCard from "../components/FeatureCard";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 15% 60%, var(--color-primary) 0%, transparent 55%),
                         radial-gradient(ellipse at 85% 15%, var(--color-accent) 0%, transparent 55%)`,
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 py-24 sm:py-36">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest mb-5 text-primary">
              App Prototype
            </p>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
              {appConfig.name}
            </h1>
            <p className="text-xl text-slate-300 mb-4 font-medium leading-snug">
              {appConfig.tagline}
            </p>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-xl">
              {appConfig.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/showcase"
                className="px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                View Prototypes
              </Link>
              <Link
                to="/generator"
                className="px-6 py-3 rounded-lg font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
              >
                Generate New
              </Link>
              {appConfig.demoUrl && (
                <a
                  href={appConfig.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg font-semibold text-slate-300 border border-slate-700 hover:border-slate-500 transition-colors"
                >
                  Live Demo →
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
            Built for
          </p>
          <p className="text-xl text-slate-200 leading-relaxed">{appConfig.targetUsers}</p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Key Features</h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Everything users need to solve the problem, nothing they don't.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {appConfig.features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div
          className="rounded-2xl p-12 text-center border border-white/5"
          style={{
            background: `linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 20%, transparent), color-mix(in srgb, var(--color-accent) 15%, transparent))`,
          }}
        >
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">See It in Action</h2>
          <p className="text-slate-300 mb-8 max-w-md mx-auto">
            Explore the prototype screens to see how {appConfig.name} will look and feel.
          </p>
          <Link
            to="/showcase"
            className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Browse Prototypes
          </Link>
        </div>
      </section>
    </div>
  );
}

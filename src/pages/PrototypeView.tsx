import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPrototypeIndex } from "../lib/prototypes";
import type { Prototype } from "../types";

const STATUS_STYLES = {
  concept: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  mockup: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  prototype: "bg-green-500/20 text-green-300 border-green-500/30",
};

export default function PrototypeView() {
  const { id } = useParams<{ id: string }>();
  const [prototype, setPrototype] = useState<Prototype | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [showMockup, setShowMockup] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchPrototypeIndex()
      .then((index) => {
        const found = index.prototypes.find((p) => p.id === id);
        if (!found) setError("Prototype not found");
        else setPrototype(found);
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-16 text-center text-slate-500">Loading…</div>;
  }

  if (error || !prototype) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-red-400 mb-4">{error ?? "Prototype not found"}</p>
        <Link to="/showcase" className="text-primary hover:underline">
          ← Back to Showcase
        </Link>
      </div>
    );
  }

  const { images, competitive, features } = prototype;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/showcase"
          className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
        >
          ← Showcase
        </Link>
        <div className="flex items-start justify-between gap-4 mt-3">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">{prototype.title}</h1>
            <p className="text-xl text-slate-300 mt-2">{prototype.tagline}</p>
          </div>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full border shrink-0 mt-1 ${STATUS_STYLES[prototype.status]}`}
          >
            {prototype.status}
          </span>
        </div>
        {prototype.tags.length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {prototype.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-full text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Image gallery */}
      {images.length > 0 ? (
        <div className="mb-10">
          <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800">
            <img
              src={images[activeImage]}
              alt={`${prototype.title} mockup ${activeImage + 1}`}
              className="w-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-1 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === activeImage
                      ? "border-primary"
                      : "border-slate-700 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="mb-10 h-48 rounded-xl border border-dashed border-slate-700 flex flex-col items-center justify-center gap-2 text-slate-600">
          <span className="text-4xl">🖼️</span>
          <span className="text-sm">No mockup images yet — ask your AI agent to generate them</span>
        </div>
      )}

      {/* Description */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Overview</h2>
        <p className="text-slate-300 leading-relaxed">{prototype.description}</p>
      </section>

      {/* Problem */}
      {prototype.problem && (
        <section className="mb-8 bg-slate-800/40 border border-slate-700/60 rounded-xl p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-2">
            The Problem
          </h2>
          <p className="text-slate-300 leading-relaxed">{prototype.problem}</p>
        </section>
      )}

      {/* Target users */}
      {prototype.targetUsers && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-2">
            Built For
          </h2>
          <p className="text-slate-300">{prototype.targetUsers}</p>
        </section>
      )}

      {/* Features */}
      {features && features.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5"
              >
                <div className="text-2xl mb-2">{f.icon}</div>
                <h3 className="font-semibold text-white mb-1">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Competitive */}
      {competitive && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Why It Wins</h2>
          {competitive.competitors && competitive.competitors.length > 0 && (
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="text-sm text-slate-500 mr-1 self-center">Better than:</span>
              {competitive.competitors.map((c) => (
                <span
                  key={c}
                  className="text-sm px-3 py-1 bg-red-900/20 border border-red-800/30 rounded-full text-red-300"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
          {competitive.advantages && competitive.advantages.length > 0 && (
            <ul className="space-y-2">
              {competitive.advantages.map((adv) => (
                <li key={adv} className="flex items-start gap-3 text-slate-300">
                  <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                  {adv}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* HTML Mockup */}
      {prototype.htmlFile && (
        <section className="mt-10 border-t border-slate-800 pt-8">
          <button
            onClick={() => setShowMockup(!showMockup)}
            className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            <span className={`transition-transform ${showMockup ? "rotate-90" : ""}`}>▶</span>
            {showMockup ? "Hide" : "View"} Interactive Mockup
          </button>
          {showMockup && (
            <div className="mt-4 rounded-xl overflow-hidden border border-slate-700">
              <iframe
                src={prototype.htmlFile}
                className="w-full bg-white"
                style={{ height: 600 }}
                title={`${prototype.title} mockup`}
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          )}
        </section>
      )}
    </div>
  );
}

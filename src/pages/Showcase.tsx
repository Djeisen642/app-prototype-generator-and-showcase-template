import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPrototypeIndex } from "../lib/prototypes";
import PrototypeCard from "../components/PrototypeCard";
import type { Prototype } from "../types";

export default function Showcase() {
  const [prototypes, setPrototypes] = useState<Prototype[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrototypeIndex()
      .then((index) => setPrototypes(index.prototypes))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Prototype Showcase
          </h1>
          <p className="text-slate-400">
            {loading
              ? "Loading..."
              : `${prototypes.length} prototype${prototypes.length !== 1 ? "s" : ""} — click any to view full screen`}
          </p>
        </div>
        <Link
          to="/generator"
          className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90 shrink-0"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          + Generate New
        </Link>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 animate-pulse">
              <div className="h-36 bg-slate-700" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-slate-700 rounded w-3/4" />
                <div className="h-3 bg-slate-700 rounded w-full" />
                <div className="h-3 bg-slate-700 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && prototypes.length === 0 && (
        <div className="text-center py-24 border border-dashed border-slate-700 rounded-2xl">
          <div className="text-5xl mb-4">🖼️</div>
          <h2 className="text-xl font-semibold text-white mb-2">No prototypes yet</h2>
          <p className="text-slate-400 mb-6 max-w-sm mx-auto">
            Generate your first prototype using the generator, or run{" "}
            <code className="text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded text-sm">
              npm run generate
            </code>{" "}
            in your terminal.
          </p>
          <Link
            to="/generator"
            className="inline-block px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Open Generator
          </Link>
        </div>
      )}

      {!loading && prototypes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prototypes.map((p) => (
            <PrototypeCard key={p.id} prototype={p} />
          ))}
        </div>
      )}
    </div>
  );
}

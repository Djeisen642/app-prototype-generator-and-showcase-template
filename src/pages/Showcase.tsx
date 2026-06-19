import { useEffect, useState } from "react";
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
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Prototype Showcase</h1>
        <p className="text-slate-400">
          {loading
            ? "Loading..."
            : `${prototypes.length} concept${prototypes.length !== 1 ? "s" : ""} — click any to explore`}
        </p>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 animate-pulse"
            >
              <div className="h-48 bg-slate-700" />
              <div className="p-5 space-y-2">
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
          <div className="text-5xl mb-4">💡</div>
          <h2 className="text-xl font-semibold text-white mb-2">No prototypes yet</h2>
          <p className="text-slate-400 mb-2 max-w-sm mx-auto">
            Run the generator to scaffold your first prototype entry, then ask your AI agent to
            build it out.
          </p>
          <code className="inline-block mt-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-green-400 font-mono">
            npm run generate
          </code>
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

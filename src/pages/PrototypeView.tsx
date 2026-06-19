import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPrototypeIndex, fetchPrototypeHtml } from "../lib/prototypes";
import type { Prototype } from "../types";

export default function PrototypeView() {
  const { id } = useParams<{ id: string }>();
  const [prototype, setPrototype] = useState<Prototype | null>(null);
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchPrototypeIndex()
      .then(async (index) => {
        const found = index.prototypes.find((p) => p.id === id);
        if (!found) { setError("Prototype not found"); return; }
        setPrototype(found);
        const content = await fetchPrototypeHtml(found.htmlFile);
        setHtml(content);
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDownload = () => {
    if (!html || !prototype) return;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${prototype.id}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center text-slate-500">
        Loading prototype...
      </div>
    );
  }

  if (error || !prototype) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-red-400 mb-4">{error ?? "Prototype not found"}</p>
        <Link to="/showcase" className="text-primary hover:underline">
          ← Back to Showcase
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 3.5rem)" }}>
      <div className="flex items-center gap-4 px-4 py-2.5 bg-slate-900 border-b border-slate-800 shrink-0">
        <Link
          to="/showcase"
          className="text-slate-400 hover:text-white transition-colors text-sm shrink-0"
        >
          ← Showcase
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="font-semibold text-white text-sm truncate">{prototype.title}</h1>
          <p className="text-xs text-slate-500 truncate">{prototype.description}</p>
        </div>
        <button
          onClick={handleDownload}
          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors shrink-0"
        >
          Download HTML
        </button>
      </div>
      <iframe
        srcDoc={html}
        className="flex-1 w-full bg-white"
        title={prototype.title}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}

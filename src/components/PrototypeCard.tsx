import { Link } from "react-router-dom";
import type { Prototype } from "../types";

const STATUS_STYLES = {
  concept: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  mockup: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  prototype: "bg-green-500/20 text-green-300 border-green-500/30",
};

export default function PrototypeCard({ prototype }: { prototype: Prototype }) {
  const firstImage = prototype.images[0];

  return (
    <Link
      to={`/showcase/${prototype.id}`}
      className="group block bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-slate-500 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30"
    >
      <div className="h-48 overflow-hidden bg-slate-700">
        {firstImage ? (
          <img
            src={firstImage}
            alt={prototype.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-700 to-slate-800">
            <span className="text-4xl opacity-30">🖼️</span>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
              No mockups yet
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-white group-hover:text-primary transition-colors leading-snug">
            {prototype.title}
          </h3>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full border shrink-0 ${STATUS_STYLES[prototype.status]}`}
          >
            {prototype.status}
          </span>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">{prototype.tagline}</p>
        <div className="flex items-center gap-1.5 mt-3 flex-wrap">
          {prototype.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-slate-700/80 rounded-full text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

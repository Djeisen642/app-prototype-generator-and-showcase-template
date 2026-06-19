import { Link } from "react-router-dom";
import type { Prototype } from "../types";

const TYPE_LABELS: Record<Prototype["type"], string> = {
  "landing-page": "Landing Page",
  dashboard: "Dashboard",
  "mobile-screen": "Mobile Screen",
  onboarding: "Onboarding",
  settings: "Settings",
  other: "Other",
};

const TYPE_ICONS: Record<Prototype["type"], string> = {
  "landing-page": "🚀",
  dashboard: "📊",
  "mobile-screen": "📱",
  onboarding: "👋",
  settings: "⚙️",
  other: "🖼️",
};

const STYLE_GRADIENTS: Record<Prototype["style"], string> = {
  minimal: "from-slate-700 to-slate-600",
  colorful: "from-purple-600 to-pink-600",
  dark: "from-slate-900 to-slate-700",
  corporate: "from-blue-700 to-blue-600",
  playful: "from-orange-500 to-yellow-400",
};

export default function PrototypeCard({ prototype }: { prototype: Prototype }) {
  return (
    <Link
      to={`/showcase/${prototype.id}`}
      className="group block bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-slate-500 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30"
    >
      <div
        className={`h-36 bg-gradient-to-br ${STYLE_GRADIENTS[prototype.style]} flex items-center justify-center`}
      >
        <div className="text-center">
          <div className="text-4xl mb-1.5">{TYPE_ICONS[prototype.type]}</div>
          <span className="text-white/60 text-xs uppercase tracking-wider font-medium">
            {TYPE_LABELS[prototype.type]}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white group-hover:text-primary transition-colors line-clamp-1">
          {prototype.title}
        </h3>
        <p className="text-sm text-slate-400 mt-1 line-clamp-2 leading-relaxed">
          {prototype.description}
        </p>
        <div className="flex items-center gap-1.5 mt-3 flex-wrap">
          {prototype.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-slate-700/80 rounded-full text-slate-400"
            >
              {tag}
            </span>
          ))}
          <span className="ml-auto text-xs text-slate-600">
            {new Date(prototype.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}

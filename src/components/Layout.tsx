import { Link, Outlet, useLocation } from "react-router-dom";
import { appConfig } from "../config/app";

const STATUS_STYLES: Record<typeof appConfig.status, string> = {
  concept: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  prototype: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  beta: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  live: "bg-green-500/20 text-green-300 border-green-500/30",
};

export default function Layout() {
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/showcase", label: "Showcase" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="font-bold text-white">{appConfig.name}</span>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full border ${STATUS_STYLES[appConfig.status]}`}
            >
              {appConfig.status}
            </span>
          </Link>
          <nav className="flex items-center gap-0.5">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === to
                    ? "bg-slate-700 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-slate-800 mt-24">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <span>
            Built with the{" "}
            <a
              href="https://github.com/djeisen642/app-prototype-generator-and-showcase-template"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors underline underline-offset-2"
            >
              App Prototype Template
            </a>
          </span>
          <div className="flex items-center gap-4">
            {appConfig.githubUrl && (
              <a
                href={appConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-300 transition-colors"
              >
                GitHub
              </a>
            )}
            {appConfig.contactEmail && (
              <a
                href={`mailto:${appConfig.contactEmail}`}
                className="hover:text-slate-300 transition-colors"
              >
                Contact
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

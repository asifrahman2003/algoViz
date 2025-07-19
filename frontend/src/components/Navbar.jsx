import { motion } from "framer-motion";
import { Github, BookOpen } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full bg-slate-900 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-3 flex items-center justify-between">
        {/* Left: Logo / Title */}
        <div className="text-base sm:text-lg !font-bold text-slate-100 flex items-center gap-2">
          <motion.div
            className="w-2.5 h-2.5 bg-blue-500 rounded-full"
            animate={{ opacity: [1, 0.3, 1], scale: [1, 1.25, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="tracking-tight select-none">
            algo<span className="text-blue-400">Viz</span>
          </span>
        </div>

        {/* Right: Icon Links */}
        <nav className="flex items-center gap-3 sm:gap-4 text-slate-400">
          <a
            href="#"
            className="hover:text-slate-100 transition"
            title="Docs"
          >
            <BookOpen size={18} strokeWidth={1.8} />
          </a>
          <a
            href="https://github.com/asifrahman2003/Sort_visualizer"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-100 transition"
            title="GitHub"
          >
            <Github size={18} strokeWidth={1.8} />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

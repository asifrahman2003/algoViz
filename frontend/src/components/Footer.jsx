import { Github, BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 shadow-inner">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col items-center justify-center text-xs sm:text-sm text-slate-400 gap-2 text-center">
        
        {/* Project Name & Year */}
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-slate-200">
            algo<span className="text-blue-400">Viz</span> v1.0
          </span>
        </p>

        {/* Built by */}
        <p className="flex flex-wrap justify-center gap-x-1">
          Built with ❤️ by{" "}
          <a
            href="https://www.linkedin.com/in/iamasiff"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline hover:text-blue-300 transition"
          >
            Asifur Rahman
          </a>{" "}
          &{" "}
          <a
            href="https://www.linkedin.com/in/apurbo-barua17/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline hover:text-blue-300 transition"
          >
            Apurbo Barua
          </a>.
        </p>

        {/* Optional Icons */}
        {/* 
        <div className="flex items-center gap-4 mt-2">
          <a
            href="#"
            className="hover:text-slate-200 transition"
            title="Docs"
          >
            <BookOpen size={18} strokeWidth={1.6} />
          </a>
          <a
            href="https://github.com/asifrahman2003/Sort_visualizer"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-200 transition"
            title="GitHub"
          >
            <Github size={18} strokeWidth={1.6} />
          </a>
        </div>
        */}
      </div>
    </footer>
  );
};

export default Footer;

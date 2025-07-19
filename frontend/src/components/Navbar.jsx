// src/components/Navbar.jsx
import { motion } from "framer-motion";

const Navbar = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-[#0d1117] border-b border-blue-950 shadow-sm z-50">
      {/* Branding */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={scrollToTop}
      >
        <motion.div
          className="w-2.5 h-2.5 bg-blue-500 rounded-full"
          whileHover={{ scale: 1.5 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          <span className="text-blue-400">algo</span>Viz
        </h1>
      </div>

      {/* Icons or Links (placeholder for future) */}
      <div className="flex items-center gap-4 text-sm text-blue-400">
        {/* You can change these to icons or links */}
        <a
          href="#"
          className="hover:text-blue-300 transition duration-200 hidden sm:inline"
        >
          Docs
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-300 transition duration-200"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

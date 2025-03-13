"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";

const links = [
  { name: "home", path: "/" },
  { name: "services", path: "/services" },
  { name: "resume", path: "/resume" },
  { name: "work", path: "/work" },
  { name: "contact", path: "/contact" },
];

export const MobileNav = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"; // Bloquear scroll
    } else {
      document.body.style.overflow = ""; // Restaurar scroll
    }

    return () => {
      document.body.style.overflow = ""; // Asegurar restauración en desmontaje
    };
  }, [menuOpen]);

  return (
    <div className="relative">
      {/* Botón del menú */}
      <button
        className="flex flex-col items-center justify-center w-10 relative z-50"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <motion.div
          className="w-6 h-0.5 bg-white rounded"
          animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 5 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="w-6 h-0.5 bg-white rounded mt-2"
          animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -5 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </button>

      {/* Menú desplegable */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-[69px] left-0 w-full h-[calc(100vh-64px)] bg-primary flex flex-col items-start justify-start gap-6 text-white z-40 p-6"
        >
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={clsx("hover:text-gray-400", {
                "text-secondary": pathname === link.path,
              })}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
};

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const links = [
  { name: "Home", path: "#home" },
  { name: "Services", path: "#services" },
  { name: "Resume", path: "#resume" },
  { name: "Work", path: "#work" },
  { name: "Contact", path: "#contact" },
];

export const MobileNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"; // Bloquea scroll cuando el menú está abierto
    } else {
      document.body.style.overflow = ""; // Restaura scroll
    }

    return () => {
      document.body.style.overflow = ""; // Asegura restauración en desmontaje
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "";

      links.forEach((link) => {
        const section = document.querySelector(link.path) as HTMLElement | null;
        if (section) {
          const { top, height } = section.getBoundingClientRect();
          if (top <= 100 && top + height > 100) {
            currentSection = link.path;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    setMenuOpen(false); // Cierra el menú después de hacer clic

    const targetElement = document.querySelector(targetId) as HTMLElement | null;
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 50,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Botón del menú hamburguesa */}
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

      {/* Menú desplegable con animación */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[69px] left-0 w-full h-[calc(100vh-64px)] bg-primary flex flex-col items-start justify-start gap-6 text-white z-40 p-6"
          >
            {links.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleScrollClick(e, link.path)}
                className={clsx("hover:text-gray-400", {
                  "text-secondary border-b-2 border-secondary": activeSection === link.path,
                })}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

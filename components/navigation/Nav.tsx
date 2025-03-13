"use client";

import { useState, useEffect } from "react";

const links = [
  { name: "Home", path: "#home" },
  { name: "Services", path: "#services" },
  { name: "Resume", path: "#resume" },
  { name: "Work", path: "#work" },
  { name: "Contact", path: "#contact" },
];

const Nav = () => {
  const [activeSection, setActiveSection] = useState<string>("");

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
    const targetElement = document.querySelector(targetId) as HTMLElement | null;

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 50,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="flex gap-8">
      {links.map((link, index) => (
        <a
          href={link.path}
          key={index}
          onClick={(e) => handleScrollClick(e, link.path)}
          className={`capitalize font-medium transition-all ${
            activeSection === link.path ? "text-secondary border-b-2 border-secondary" : "text-white"
          }`}
        >
          {link.name}
        </a>
      ))}
    </nav>
  );
};

export default Nav;

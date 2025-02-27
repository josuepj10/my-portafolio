"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";
import clsx from "clsx";
import Particles from "@/app/components/particles";
import Image from "next/image";

const links = [
  { name: "home", path: "/" },
  { name: "services", path: "/services" },
  { name: "resume", path: "/resume" },
  { name: "work", path: "/work" },
  { name: "contact", path: "/contact" },
];

export const MobileNav = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-secondary" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <Particles
          className="absolute inset-0 -z-10 animate-fade-in"
          quantity={100}
        />

        {/* logo */}
        <Link href={"/"} className="flex items-center">
          <Image
            src="/pj-logo-03.svg" // Reemplaza con la ruta de tu logo
            alt="Logo"
            width={50} // Ajusta el tamaño según necesidad
            height={50}
            priority
          />
        </Link>

        {/* nav */}
        <nav className="flex flex-col gap-8 justify-center items-center">
          {links.map((link, index) => (
            <Link
              key={link.path}
              href={link.path}
              className={clsx(
                "text-xl capitalize hover:text-secondary transition-all",
                link.path === pathname &&
                  "text-secondary border-b-2 border-secondary"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

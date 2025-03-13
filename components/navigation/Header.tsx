import Link from "next/link";
import { Button } from "../ui/button";

//components
import Nav from "./Nav";
import { MobileNav } from "./MobileNav";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="py-4 text-white border-b border-gray-800 border-opacity-50 bg-primary/70 backdrop-blur-md fixed w-full">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href={"/"} className="flex items-center">
          <Image
            src="/logo.svg" 
            alt="Logo"
            width={40} // Ajusta el tamaño según necesidad
            height={40}
            priority
          />
        </Link>

        {/* Desktop nav & hire me button */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href={"/#contact"}>
            <Button className="h-[34px] px-5 bg-white hover:bg-gray-300 transition-colors duration-300">
              Hire me
            </Button>
          </Link>
        </div>

        {/* Mobile nav */}
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

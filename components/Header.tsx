import Link from "next/link";
import { Button } from "./ui/button";

//components
import Nav from "./Nav";
import { MobileNav } from "./MobileNav";
import Image from "next/image";

export const Header = () => {
  return (
    // <header className="py-8 xl:py-12 text-white bg-primary bg-opacity-80">
    <header className="py-8 xl:py-12 text-white">
      <div className="container mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link href={"/"} className="flex items-center">
          <Image
            src="/pj-logo-03.svg" // Reemplaza con la ruta de tu logo
            alt="Logo"
            width={50} // Ajusta el tamaño según necesidad
            height={50}
            priority
          />
        </Link>

        {/* desktop nav & here me button */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href={"/#contact"}>
            <Button>Hire me</Button>
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

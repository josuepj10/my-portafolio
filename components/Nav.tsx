"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


//Name and path of the links
const links = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Resume", path: "/resume" },
  { name: "Work", path: "/work" },
  { name: "Contact", path: "/contact" },
];

const Nav = () => {
  const pathname = usePathname(); //Get the current path
  console.log(pathname);

  return (
    <nav className="flex gap-8">
      {links.map((link, index) => ( //Iterate over the links and create a Link component for each
        <Link
          href={link.path} //Set the href of the Link component
          key={index} //Set the key of the Link component
          className={`${
            link.path === pathname ? "text-secondary border-b-2 border-secondary" : "" //If the link path is the same as the current path, add a border to the link
          } capitalize font-medium hover:text-secondary transition-all`} //Add classes to the Link component
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;

import Link from "next/link";
import Image from "next/image";

import styles from "./header.module.css";
import { HeaderProps } from "./types";

const Header: React.FC<React.PropsWithChildren<HeaderProps>> = ({
  links = [],
}) => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
        <Link
          href="/"
          passHref
          className="flex items-center mb-4 font-medium text-gray-900 md:mb-0 title-font"
        >
          <span className="ml-3 text-xl">Lens Demo App</span>
        </Link>
        <nav className="flex flex-wrap justify-center items-center text-base md:py-1 md:pl-4 md:mr-auto md:ml-4 md:border-l md:border-gray-400">
          {links.map((link) => (
            (
              <Link
                key={link.url}
                href={link.url}
                className="mr-5 hover:text-gray-900"
              >
                {link.title}
              </Link>
            )
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
export * from "./types";

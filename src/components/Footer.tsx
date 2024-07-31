import Image from "next/image";
import logo from "/public/logo.png";
import logotext from "/public/logo-text.png";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-black">
      <footer className="footer text-white p-8 max-w-[1920px] mx-auto">
        <a>
          <div className="flex items-center gap-4">
            <Image
              src={logo}
              height={40}
              width={40}
              alt="Islander's View Logo"
              
            />
            <Image
              src={logotext}
              height={18}
              alt="Islander's View Logo Text"
              className=""
            />
          </div>
          <span>The key to island living</span>
        </a>
        <nav className="flex flex-col sm:flex-row text-lg sm:gap-12 w-full justify-end">
          <Link href={"/"} className="link link-hover">
            Home
          </Link>
          <Link href={"/offers"} className="link link-hover">
            Offers
          </Link>
          <Link href={"/contact"} className="link link-hover">
            Contact us
          </Link>
        </nav>
      </footer>
    </div>
  );
}

import { AlignJustify } from "lucide-react";
import Image from "next/image";
import logotext from "/public/logo-text.png";
import logo from "/public/logo.png";
import NavItems from "./NavItems";

const backgroundClassname = "bg-black bg-opacity-90";

export default function Navbar() {
  return (
    <div className={backgroundClassname}>
      <div className="navbar text-white mx-auto max-w-[1920px]">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">
            <Image
              src={logo}
              height={40}
              width={40}
              alt="Islander's View Logo"
              className="mr-2"
            />
            <Image
              src={logotext}
              height={18}
              alt="Islander's View Logo Text"
              className="hidden sm:inline-block"
            />
          </a>
        </div>

        <div className="navbar-end hidden md:flex">
          <NavItems className="menu menu-horizontal px-1" />
        </div>
        <div className="navbar-end drawer drawer-end md:hidden z-10">
          <input id="my-drawer" type="checkbox" className="drawer-toggle " />
          <div className={`drawer-content`}>
            <label
              htmlFor="my-drawer"
              className="btn drawer-button bg-black text-white"
            >
              <AlignJustify />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <NavItems
              isOnSidebar
              className={`menu min-h-full w-60 p-4 ${backgroundClassname}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

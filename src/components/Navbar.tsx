import { AlignJustify } from "lucide-react";

export default function Navbar() {
  return (
    <div className="bg-primary">
      <div className="navbar bg-primary text-primary-content mx-auto max-w-[1920px]">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">Islanders View</a>
        </div>

        <div className="navbar-end hidden md:flex">
          <NavItems className="menu menu-horizontal px-1" />
        </div>
        <div className="navbar-end drawer drawer-end md:hidden z-10">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="btn btn-primary drawer-button"
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
            <NavItems className="menu bg-base-200 text-base-content min-h-full w-60 p-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItems({ className }: { className?: string }) {
  return (
    <ul className={className}>
      <li>
        <a>Item 1</a>
      </li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a>Item 3</a>
      </li>
    </ul>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logotext from "/public/logo-text.png";

const pages = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Offers",
    url: "/offers",
  },
  {
    name: "Contact Us",
    url: "/contact",
  },
];

export default function NavItems({
  className,
  isOnSidebar,
}: {
  className?: string;
  isOnSidebar?: boolean;
}) {
  const pathname = usePathname();

  const isCurrentPage = (url: string) => {
    //split the url then compare the url one level deep

    if (url === "/") {
      return pathname === "/";
    }
    const urlArray = url.split("/");
    return urlArray[1] === pathname;
  };

  return (
    <ul className={className}>
      {isOnSidebar && (
        <Image
          src={logotext}
          height={40}
          alt="Islander's View Logo"
          className="mt-2 mb-8"
        />
      )}
      {pages.map((page) => (
        <span className="text-lg px-4 py-2" key={page.url}>
          <Link
            href={page.url}
            className={
              isCurrentPage(page.url) ? "text-secondary font-semibold" : ""
            }
          >
            {page.name}
          </Link>
        </span>
      ))}
    </ul>
  );
}

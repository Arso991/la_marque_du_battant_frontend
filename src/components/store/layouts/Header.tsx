"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Menu from "@/components/store/header/Menu";
import Search from "@/components/store/header/Search";
import UserAuth from "@/components/store/auth/UserAuth";
import Cart from "@/components/store/header/Cart";
import BlogButton from "@/components/store/header/BlogButton";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Header() {
  // Sticky Navbar
  const [sticky, setSticky] = useState(false);

  const handleStickyNavbar = () => {
    if (window.scrollY >= 60) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  const path = usePathname();
  useEffect(() => {
    if (path != "/") {
      setSticky(true);
    } else {
      window.addEventListener("scroll", handleStickyNavbar);
    }
  }, []);

  return (
    <div
      className={`h-16 px-6 left-0 top-0 right-0 container mx-auto overflow-x-hidden ${
        sticky
          ? `bg-white text-black fixed z-[9999] border-b border-gray-200`
          : "absolute bg-transparent text-white z-[9999]"
      }`}
    >
      {/* MOBILE */}
      <div className="h-full flex justify-between items-center relative md:hidden">
        <Link href="/" className="">
          <Image src="/battant.png" alt="" width={40} height={40} />
        </Link>
        <div className="flex gap-4 items-center">
          <Cart />
          <Menu />
        </div>
      </div>
      {/* WEB */}
      <div className="hidden md:flex h-full">
        <div className="flex items-center justify-between w-full">
          {/* LEFT */}
          <div className="flex items-center gap-8">
            <Link href="/" className="w-10">
              <Image src="/battant.png" alt="" width={40} height={40} />
            </Link>
            <ul className="flex items-center gap-3 font-semibold">
              <Link
                href="/products?category=Homme"
                className={`border-b-2 border-transparent py-4 ${
                  path.includes("/products?category=Homme")
                    ? "text-red-500"
                    : ""
                }`}
              >
                <li>Homme</li>
              </Link>
              <Link
                href="/products?category=Femme"
                className="border-b-2 border-transparent py-4"
              >
                <li>Femme</li>
              </Link>
              <Link
                href="/products?category=Accessoires"
                className="border-b-2 border-transparent py-4"
              >
                <li>Accessoires</li>
              </Link>
              <Link
                href="/products?category=tous"
                className="border-b-2 border-transparent py-4"
              >
                <li>Collections</li>
              </Link>
              <Link
                href="/events-page"
                className="border-b-2 border-transparent py-4"
              >
                <li>Evènements</li>
              </Link>
            </ul>
          </div>
          {/* RIGHT */}
          <div className="flex items-center gap-5">
            {/* <Search scrolled={sticky} /> */}
            <BlogButton title="BLOG" scrolled={sticky} />
            <UserAuth />
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
}

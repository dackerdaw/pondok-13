'use client';

import useScroll from "@/lib/hooks/use-scroll";
import Link from "next/link";
import { NextLogo } from '@/ui/next-logo';
import LoginComponent from "./login";
import CurrentUser from "./current-user";

export function Navbar() {
  const scrolled = useScroll(50);

  return (
    <div
      className={`fixed top-0 w-full ${scrolled
        ? "border-b border-gray-600 bg-black/10 backdrop-blur-xl"
        : "bg-black/0"
        } z-30 transition-all`}
    >
      <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
        <Link
          href="/"
          className="group flex items-center font-display text-2xl gap-x-2.5"
        >
          <div className="h-7 w-7 rounded-full border border-white/30 group-hover:border-white/50">
            <NextLogo />
          </div>

          <h3 className="font-semibold tracking-wide text-gray-400 group-hover:text-gray-50">
            Pondok Pelajar
          </h3>
        </Link>
        {/* <LoginComponent/> */}
        <CurrentUser />
      </div>
    </div>
  )
}
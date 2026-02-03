"use client";
import { cn } from "@/utils/cn";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const navItems = [
    { name: "Accueil", link: "/", current: pathname === "/" },
    { name: "Nos réalisations", link: "/cases", current: pathname.includes("cases") },
    { name: "Qui sommes-nous ?", link: "/articles", current: pathname.includes("articles") },
  ];

  return (
    <div className="fixed z-50 w-full px-4 pt-4">
      <DesktopNav navItems={navItems} />
      <MobileNav navItems={navItems} />
    </div>
  );
}

const DesktopNav = ({ navItems }: { navItems: { name: string; link: string; current: boolean }[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <motion.div
      onMouseLeave={() => {
        setHovered(null);
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-white/60 backdrop-blur-xl px-4 py-2 lg:flex dark:bg-neutral-800/60",
      )}
    >
      <Logo />
      <div className="hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2">
        {navItems.map((navItem, idx) => (
          <Link
            onMouseEnter={() => setHovered(idx)}
            className={cn(
              "relative px-4 py-2 text-neutral-600 dark:text-neutral-300",
              navItem.current && "text-neutral-900 dark:text-white font-semibold"
            )}
            key={`link-${idx}`}
            href={navItem.link}
          >
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-600"
              />
            )}
            <span className="relative z-20">{navItem.name}</span>
          </Link>
        ))}
      </div>
      <Link
        href="/contact"
        className="rounded-full bg-black px-6 py-2 text-sm font-medium text-white shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.4)_inset] transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
      >
        Contactez-nous
      </Link>
    </motion.div>
  );
};

const MobileNav = ({ navItems }: { navItems: { name: string; link: string; current: boolean }[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        animate={{ borderRadius: open ? "4px" : "2rem" }}
        key={String(open)}
        className="relative mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-white/60 backdrop-blur-xl px-4 py-2 lg:hidden dark:bg-neutral-800/60"
      >
        <div className="flex w-full flex-row items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            {open ? (
              <IconX
                className="text-black dark:text-white cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            ) : (
              <IconMenu2
                className="text-black dark:text-white cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            )}
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-0 top-16 z-20 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 dark:bg-neutral-800"
            >
              {navItems.map((navItem, idx) => (
                <Link
                  key={`link-${idx}`}
                  href={navItem.link}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "relative text-neutral-600 dark:text-neutral-300",
                    navItem.current && "text-neutral-900 dark:text-white font-semibold"
                  )}
                >
                  <motion.span className="block">{navItem.name}</motion.span>
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="w-full rounded-lg bg-black px-8 py-2 text-center font-medium text-white shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.4)_inset] dark:bg-white dark:text-black"
              >
                Contact
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center px-2 py-1"
    >
      <Image
        className="h-10 w-auto hidden dark:block"
        src="/images/logo_white.png"
        alt="Fabdev"
        width={120}
        height={40}
      />
      <Image
        className="h-10 w-auto dark:hidden"
        src="/images/logo.png"
        alt="Fabdev"
        width={120}
        height={40}
      />
    </Link>
  );
};

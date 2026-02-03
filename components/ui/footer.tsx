"use client";
import { cn } from "@/utils/cn";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Footer() {
  const pages = [
    { title: "Accueil", href: "/" },
    { title: "Nos réalisations", href: "/cases" },
    { title: "Qui sommes-nous ?", href: "/articles" },
    { title: "Contact", href: "/contact" },
    { title: "Mentions légales", href: "/mentions_legales" },
  ];

  return (
    <div className="relative w-full overflow-hidden border-t border-white/[0.1] bg-transparent px-8 py-20">
      <div className="mx-auto max-w-7xl items-start justify-between text-sm text-neutral-500 md:px-8">
        <div className="relative flex w-full flex-col items-center justify-center">
          <div className="mr-0 mb-4 md:mr-4 md:flex">
            <Logo />
          </div>

          <ul className="flex list-none flex-col gap-4 text-neutral-300 transition-colors sm:flex-row">
            {pages.map((page, idx) => (
              <li key={"pages" + idx} className="list-none text-center">
                <Link
                  className="hover:text-white transition-colors"
                  href={page.href}
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>

          <GridLineHorizontal className="mx-auto mt-8 max-w-7xl" />
        </div>
        <div className="mt-8 flex w-full flex-col items-center justify-between sm:flex-row">
          <div className="mb-8 text-center text-neutral-400 sm:mb-0 sm:text-left">
            <p>9 rue François Bonvin 75015 Paris</p>
            <p>&copy; 2015-{new Date().getFullYear()} Fabdev. Tous droits réservés.</p>
          </div>
          <div className="flex gap-4">
            <Link href="https://github.com/FabDevGit">
              <IconBrandGithub className="h-6 w-6 text-neutral-300 hover:text-white transition-colors" />
            </Link>
            <Link href="https://fr.linkedin.com/company/fabdev">
              <IconBrandLinkedin className="h-6 w-6 text-neutral-300 hover:text-white transition-colors" />
            </Link>
            <Link href="mailto:contact@fabdev.fr">
              <IconMail className="h-6 w-6 text-neutral-300 hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#0a0a0a",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        className,
      )}
    ></div>
  );
};

const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center px-2 py-1"
    >
      <Image
        className="h-10 w-auto"
        src="/images/logo_white.png"
        alt="Fabdev"
        width={120}
        height={40}
      />
    </Link>
  );
};

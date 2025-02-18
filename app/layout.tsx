import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "@/app/globals.css";
import Theme from '@/components/ui/theme-provider'
import React from "react";
import {usePathname} from 'next/navigation'
import Nav from "@/components/ui/nav"
import Link from "next/link";
import Script from "next/script";
import nextConfig from "@/next.config.mjs"
import Head from "next/head";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Fabdev",
    description: "Fabdev développe vos applications web, data & IA",
    icons: ["https://backoffice.fabdev.fr/static/img/favicon.png"],
    openGraph: {
        title: "Fabdev",
        description: "Fabdev développe vos applications web, data & IA",
        type: "website",
        url: "https://fabdev.fr",
        images: [
            {
                url: "https://fabdev.fr/images/fabdev800x600.png",
                width: 800,
                height: 600,
                alt: "Fabdev",
            },
            {
                url: "https://fabdev.fr/images/fabdev1200x630.png",
                width: 1200,
                height: 630,
                alt: "Fabdev",
            },
        ],
    },

};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
        <body className={inter.className}>
        <Script
            src="https://umami.fabdev.fr/script.js"
            data-website-id="74e87a8c-c273-48af-896b-1ad85f409b7c"
            strategy="lazyOnload"
        />
        <Theme>
            <div className="relative   dark:bg-grid-white/[0.15] bg-grid-black/[0.15]   ">
                <div className="absolute pointer-events-none inset-0 dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>
                <div className="relative">
                    <Nav></Nav>
                    {children}
                </div>
                <div className="h-[30vh] w-full flex flex-col items-center justify-around border-t border-gray-700 dark:border-gray-200 pt-10">
                    <div className="flex flex-col sm:flex-row text-center">
                        <Link href="/" className="mx-5 inline-block">Accueil</Link>
                        <Link href="/cases/" className="mx-5 inline-block">Cas d&apos;usage</Link>
                        <Link href="/articles/" className="mx-5 inline-block">Qui sommes-nous ?</Link>
                        <Link href="/mentions_legales/" className="mx-5 inline-block">Mentions légales</Link>
                        <Link href="/contact/" className="mx-5 inline-block">Contact</Link>
                    </div>
                    <div className="flex flex-row my-3">
                        <Link href="https://github.com/FabDevGit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mx-2">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path
                                d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"/>
                            </svg>
                        </Link>
                        <Link href="https://fr.linkedin.com/company/fabdev">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mx-2">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"/>
                            <path d="M8 11l0 5"/>
                            <path d="M8 8l0 .01"/>
                            <path d="M12 16l0 -5"/>
                            <path d="M16 16v-3a2 2 0 0 0 -4 0"/>
                            </svg>
                        </Link>
                        <Link href="mailto:contact@fabdev.fr">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mx-2">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"/>
                            <path d="M3 7l9 6l9 -6"/>
                            </svg>
                        </Link>
                    </div>
                    <div className="text-center text-gray-700 dark:text-gray-300">
                        9 rue François Bonvin 75015 Paris <br/>
                        2024 Fabdev. Tous droits réservés. contact@fabdev.fr.
                    </div>
                </div>
            </div>
        </Theme>
        </body>
        </html>
    );
}

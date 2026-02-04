import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "@/app/globals.css";
import Theme from '@/components/ui/theme-provider'
import React from "react";
import Nav from "@/components/ui/nav"
import Footer from "@/components/ui/footer";
import Script from "next/script";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    preload: true,
});

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
        <html lang="fr" suppressHydrationWarning className="overflow-x-hidden">
        <head>
            <link rel="preconnect" href="https://backoffice.fabdev.fr" />
            <link rel="dns-prefetch" href="https://backoffice.fabdev.fr" />
        </head>
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
                    <Footer />
                </div>
            </div>
        </Theme>
        </body>
        </html>
    );
}

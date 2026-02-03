"use client";
import Link from "next/link";
import { cn } from "@/utils/cn";

export type Article = {
    id: number;
    title: string;
    description: string;
    content: string;
    content_js: string;
    author: string;
    thumbnail: string;
    picture: string;
};

export function BlogCard({ article }: { article: Article }) {
    const truncate = (text: string, length: number) => {
        return text.length > length ? text.slice(0, length) + "..." : text;
    };
    return (
        <Link
            className="shadow-derek w-full overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 transition duration-200 hover:scale-[1.02]"
            href={`/articles/${article.id}`}
        >
            {article.picture ? (
                <img
                    src={"https://backoffice.fabdev.fr" + article.picture}
                    alt={article.title}
                    height="800"
                    width="800"
                    className="h-52 w-full object-cover object-top"
                />
            ) : (
                <div className="flex h-52 items-center justify-center bg-neutral-900">
                    <Logo />
                </div>
            )}
            <div className="bg-neutral-900 p-4 md:p-8">
                <div className="mb-2 flex items-center space-x-2">
                    <div className="h-5 w-5 rounded-full bg-neutral-700 flex items-center justify-center text-xs font-medium text-white">
                        {article.author.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-sm font-normal text-neutral-400">
                        {article.author}
                    </p>
                </div>
                <p className="mb-4 text-lg font-bold text-neutral-100">
                    {article.title}
                </p>
                <p className="mt-2 text-left text-sm text-neutral-400">
                    {truncate(article.description, 100)}
                </p>
            </div>
        </Link>
    );
}

const Logo = () => {
    return (
        <div className="relative z-20 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-white">
            <div className="h-5 w-6 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white" />
            <span className="font-medium text-white">Fabdev</span>
        </div>
    );
};

export function GridPatternContainer({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]",
                className,
            )}
        >
            <GridPattern />
        </div>
    );
}

export function GridPattern() {
    const columns = 30;
    const rows = 11;
    return (
        <div className="flex flex-shrink-0 scale-105 flex-wrap items-center justify-center gap-x-px gap-y-px bg-neutral-700">
            {Array.from({ length: rows }).map((_, row) =>
                Array.from({ length: columns }).map((_, col) => {
                    const index = row * columns + col;
                    return (
                        <div
                            key={`${col}-${row}`}
                            className={`flex h-10 w-10 flex-shrink-0 rounded-[1px] ${
                                index % 2 === 0
                                    ? "bg-neutral-800"
                                    : "bg-neutral-800 shadow-[0px_0px_0px_3px_rgba(0,0,0,0.2)_inset]"
                            }`}
                        />
                    );
                }),
            )}
        </div>
    );
}

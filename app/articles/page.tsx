"use client"
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { Fondateurs } from "@/components/ui/fondateurs";
import Link from "next/link";

export default function Page() {
    type Article = {
        id: number;
        title: string;
        description: string;
        content: string;
        content_js: string;
        author: string;
        thumbnail: string;
        picture: string;
    }
    type ListArticle = Article[];

    const [articles, setArticles] = useState<ListArticle>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/articles/api/');
            const MyData = await res.json();
            if (MyData) {
                setArticles(MyData)
            }
        };
        fetchData()
    }, []);

    return (
        <div className="pt-32 pb-10 flex flex-col items-center overflow-x-hidden">
            <Fondateurs />

            <div className="w-full max-w-3xl mx-auto px-4 md:px-8 mt-20">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">
                    Quelques articles
                </h2>

                <div className="flex flex-col gap-8">
                    {articles.map((article) => (
                        <Link
                            href={"/articles/" + article.id}
                            key={article.id}
                            className="group flex flex-col sm:flex-row gap-6 p-4 -mx-4 rounded-2xl transition-colors hover:bg-neutral-800/50"
                        >
                            <div className="sm:w-48 sm:h-32 flex-shrink-0">
                                <Image
                                    src={"https://backoffice.fabdev.fr" + article.picture}
                                    height={200}
                                    width={300}
                                    className="w-full h-48 sm:h-32 rounded-xl object-cover"
                                    alt={article.title}
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="flex items-center mb-2">
                                    <div className="h-5 w-5 rounded-full bg-neutral-700 flex items-center justify-center text-xs font-medium text-white">
                                        {article.author.charAt(0).toUpperCase()}
                                    </div>
                                    <p className="pl-2 text-sm text-neutral-400">
                                        {article.author}
                                    </p>
                                </div>
                                <h3 className="text-xl font-bold text-white group-hover:text-neutral-200 transition-colors">
                                    {article.title}
                                </h3>
                                <p className="mt-1 text-neutral-400 line-clamp-2">
                                    {article.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

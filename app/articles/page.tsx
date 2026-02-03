"use client"
import React, { useEffect, useState } from "react";
import { Fondateurs } from "@/components/ui/fondateurs";
import { BlogCard, GridPatternContainer, Article } from "@/components/ui/blog-grid";
import { cn } from "@/utils/cn";

export default function Page() {
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

            <div className="relative overflow-hidden py-20 md:py-0 w-full mt-20">
                <div className="relative overflow-hidden px-4 py-4 md:px-8 md:py-10">
                    <GridPatternContainer className="opacity-50" />
                    <div className="relative z-20 py-10 max-w-7xl mx-auto">
                        <h1
                            className={cn(
                                "mb-6 scroll-m-20 text-center text-4xl font-bold tracking-tight text-white md:text-left",
                            )}
                        >
                            Nos articles
                        </h1>

                        <p className="!mb-6 max-w-xl text-center text-lg text-neutral-400 md:text-left">
                            Découvrez nos ressources et conseils d&apos;experts pour enrichir vos connaissances.
                        </p>
                    </div>
                </div>
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 pb-20 md:px-8">
                    <div className="relative z-20 grid w-full grid-cols-1 gap-10 md:grid-cols-3">
                        {articles.map((article) => (
                            <BlogCard article={article} key={article.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

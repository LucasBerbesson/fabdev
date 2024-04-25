"use client"
import React, {useEffect, useState} from "react";
import Image from 'next/image';
import {Fondateurs} from "@/components/ui/fondateurs";
import Link from "next/link"; // Modify the import path accordingly

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
        <div className="pt-32 pb-10 flex flex-col items-center overflow-x-hidden max-w-screen-xl mx-auto px-5">
            <Fondateurs></Fondateurs>
            <div className="text-5xl font-bold my-10 text-center">Quelques articles</div>
            {articles.map((article) => (
                <Link href={"/articles/" + article.id} key={article.id} className="flex flex-col gap-5 sm:flex-row sm:w-9/12 my-5 cursor-pointer">
                    <div className="sm:w-4/12">
                        <Image
                            src={"https://fabdev.fr" + article.picture}
                            height="600"
                            width="600"
                            className=" w-full rounded-xl group-hover/card:shadow-xl"
                            alt="thumbnail"
                        />
                    </div>
                    <div className="sm:w-8/12 flex flex-col justify-center sm:ps-7">
                        <div className="text-gray-700 dark:text-gray-300 ">{article.author}</div>
                        <div className="text-xl sm:text-3xl font-bold sm:my-2">{article.title}</div>
                        <div className="text-gray-700 dark:text-gray-300">{article.description}</div>
                    </div>
                </Link>
            ))}
        </div>
    );
}


"use client"
import { useEffect, useState } from 'react';

export default function Home({ params }: { params: { id: number } }) {
    interface Article {
        id: number;
        title: string;
        description: string;
        content: string;
        content_js: string;
        author: string;
        thumbnail: string | null;
        picture: string;
    }

    const [iframeHeight, setIframeHeight] = useState('1200px');
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/articles/api/');
            const MyData = await res.json();
            if (MyData) {
                const firstArticle = MyData.find((item: Article) => item.id == params.id)
                const regex = /src=["']([^"']*)["'][^>]*>/g;
                firstArticle.content = firstArticle.content.replace(regex, (match: string, src: string) => {
                    if (!src.startsWith('https://')) {
                        src = `https://backoffice.fabdev.fr/${src}`;
                    }
                    return match.replace(/src=["'][^"']*["']/, `src="${src}"`);
                });
                setArticle(firstArticle);
            }
        };
        fetchData()

    }, []);

    useEffect(() => {
        const handleResizeMessage = (event: MessageEvent) => {
            if (event.data.frameHeight) {
                setIframeHeight(`${event.data.frameHeight + 10}px`);
            }
        };

        window.addEventListener('message', handleResizeMessage);
        return () => window.removeEventListener('message', handleResizeMessage);
    }, []);

    if (!article) {
        return (
            <div className="pt-32 pb-20 flex items-center justify-center">
                <div className="animate-pulse text-neutral-400">Chargement...</div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20">
            <div className="mx-auto w-full max-w-3xl px-4 md:px-8">
                {article.picture && (
                    <img
                        src={"https://backoffice.fabdev.fr" + article.picture}
                        alt={article.title}
                        className="h-60 w-full rounded-3xl object-cover md:h-[30rem]"
                        height={720}
                        width={1024}
                    />
                )}
                <h1 className="mt-6 mb-2 text-2xl md:text-4xl font-bold tracking-tight text-white">
                    {article.title}
                </h1>
                <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-neutral-700 flex items-center justify-center text-sm font-medium text-white">
                        {article.author.charAt(0).toUpperCase()}
                    </div>
                    <p className="pl-3 text-sm text-neutral-400">
                        {article.author}
                    </p>
                </div>
                {article.description && (
                    <p className="mt-6 text-lg text-neutral-300">
                        {article.description}
                    </p>
                )}
                <div className="mt-10 rounded-2xl overflow-hidden">
                    <iframe
                        srcDoc={`
                            <script>
                                document.addEventListener("DOMContentLoaded", function() {
                                    document.body.style.backgroundColor = "black";
                                    document.body.style.color = "white";
                                    document.body.style.overflow = "hidden";
                                    document.body.style.fontFamily = "system-ui, -apple-system, sans-serif";
                                    setTimeout(function() {
                                        const height = document.body.scrollHeight;
                                        window.parent.postMessage({
                                            frameHeight: height
                                        }, "*");
                                    }, 100);
                                });
                            </script>
                            <script src="/plugin/jquery-3.6.1.min.js"></script>
                            <script src="/plugin/tabler.min.js"></script>
                            <link rel="stylesheet" href="/plugin/tabler.min.css">
                            <style>
                                body { line-height: 1.7; }
                                img { border-radius: 12px; margin: 1rem 0; }
                                a { color: #60a5fa; }
                                h1, h2, h3, h4, h5, h6 { margin-top: 1.5rem; margin-bottom: 0.5rem; }
                            </style>
                            ${article.content} ${article.content_js}
                        `}
                        width="100%"
                        height={iframeHeight}
                        sandbox="allow-scripts allow-same-origin"
                        style={{ overflow: "hidden", border: "none" }}
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

"use client"
import {useEffect, useState} from 'react';
import {useTheme} from 'next-themes'


export default function Home({params}: { params: { id: number } }) {
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
    const {theme, setTheme} = useTheme()

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/articles/api/');
            const MyData = await res.json();
            if (MyData) {
                const firstArticle = MyData.find((item: Article) => item.id == params.id)
                const regex = /src=["']([^"']*)["'][^>]*>/g;
                firstArticle.content = firstArticle.content.replace(regex, (match: string, src: string) => {
                    if (!src.startsWith('https://')) {
                        src = `https://fabdev.fr/${src}`;
                    }
                    return match.replace(/src=["'][^"']*["']/, `src="${src}"`);
                });
                setArticle(firstArticle);
            }
        };
        fetchData()

    }, []);


    // Gérer le rendu du JavaScript interne
    useEffect(() => {
        const handleResizeMessage = (event: MessageEvent) => {
            if (event.data.frameHeight) {
                setIframeHeight(`${event.data.frameHeight + 10}px`);
            }
        };

        window.addEventListener('message', handleResizeMessage);
        return () => window.removeEventListener('message', handleResizeMessage);
    }, []);

    if (!article) return <div>Loading...</div>;
    const bgColor = theme == "dark" ? "black" : "white"
    const textColor = theme == "dark" ? "white" : "black"
    return (
        <div className="pt-32 px-1 sm:px-24 pb-20">
            <h1 className="text-3xl font-bold text-center my-4">{article.title}</h1>
            <div className="text-center text-gray-800 dark:text-gray-300 mb-10">Par {article.author}</div>
            <div className="bg-white dark:bg-black p-5 rounded-3xl">
                <iframe
                    srcDoc={`<script>
                            document.addEventListener("DOMContentLoaded", function() {
                            document.body.style.backgroundColor = "${bgColor}"
                            document.body.style.color = "${textColor}"
                            document.body.style.overflow = "hidden"
                            setTimeout(function() {
                                const height = document.body.scrollHeight;
                                window.parent.postMessage({
                                        frameHeight: height
                                    }, "*");
                                }, 100); // Adjust the delay time as needed, e.g., 2000 milliseconds
                            });
                         </script> 
                         <script src="/plugin/jquery-3.6.1.min.js"></script>   
                         <script src="/plugin/tabler.min.js"></script>
                         <link rel="stylesheet" href="/plugin/tabler.min.css"> 
                         ${article.content} ${article.content_js}`}
                    width="100%"
                    height={iframeHeight}
                    sandbox="allow-scripts allow-same-origin"
                    style={{overflow: "hidden"}}
                ></iframe>
            </div>
        </div>
    );
}

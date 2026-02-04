"use client"
import { useEffect, useState } from 'react';

interface ArticleContentProps {
    content: string;
    content_js: string;
}

export default function ArticleContent({ content, content_js }: ArticleContentProps) {
    const [iframeHeight, setIframeHeight] = useState('1200px');

    useEffect(() => {
        const handleResizeMessage = (event: MessageEvent) => {
            if (event.data.frameHeight) {
                setIframeHeight(`${event.data.frameHeight + 10}px`);
            }
        };

        window.addEventListener('message', handleResizeMessage);
        return () => window.removeEventListener('message', handleResizeMessage);
    }, []);

    return (
        <div className="mt-10 rounded-2xl overflow-hidden">
            <iframe
                srcDoc={`
                    <script src="/plugin/jquery-3.6.1.min.js"></script>
                    <script src="/plugin/tabler.min.js"></script>
                    <link rel="stylesheet" href="/plugin/tabler.min.css">
                    <style>
                        html, body {
                            background-color: #0a0a0a !important;
                            color: white !important;
                            overflow: hidden;
                            font-family: system-ui, -apple-system, sans-serif;
                            line-height: 1.7;
                            margin: 0;
                            padding: 0;
                        }
                        body {
                            padding: 1.5rem !important;
                            padding-top: 0.5rem !important;
                        }
                        img { border-radius: 12px; margin: 1rem 0; }
                        a { color: #60a5fa; }
                        h1, h2, h3, h4, h5, h6 { margin-top: 1.5rem; margin-bottom: 0.5rem; color: white; }
                        p { color: white; }
                    </style>
                    <script>
                        document.addEventListener("DOMContentLoaded", function() {
                            setTimeout(function() {
                                const elements = document.body.querySelectorAll('*');
                                let maxBottom = 0;
                                elements.forEach(function(el) {
                                    const rect = el.getBoundingClientRect();
                                    if (rect.height > 0 && rect.bottom > maxBottom) {
                                        maxBottom = rect.bottom;
                                    }
                                });
                                const height = Math.ceil(maxBottom) + 20;
                                window.parent.postMessage({
                                    frameHeight: height
                                }, "*");
                            }, 500);
                        });
                    </script>
                    ${content} ${content_js}
                `}
                width="100%"
                height={iframeHeight}
                sandbox="allow-scripts allow-same-origin"
                style={{ overflow: "hidden", border: "none" }}
            ></iframe>
        </div>
    );
}

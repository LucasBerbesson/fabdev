import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { generateSlug, isNumericId } from '@/utils/slug';
import ArticleContent from '@/components/ui/article-content';

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

async function getArticles(): Promise<Article[]> {
    const res = await fetch('https://backoffice.fabdev.fr/api/articles/', {
        next: { revalidate: 60 }, // Cache pendant 60 secondes
    });
    if (!res.ok) {
        throw new Error('Failed to fetch articles');
    }
    return res.json();
}

async function getArticle(slug: string): Promise<Article | undefined> {
    const articles = await getArticles();

    if (isNumericId(slug)) {
        return articles.find((item) => item.id == parseInt(slug));
    } else {
        return articles.find((item) => generateSlug(item.title) === slug);
    }
}

function processContent(content: string): string {
    const regex = /src=["']([^"']*)["'][^>]*>/g;
    return content.replace(regex, (match: string, src: string) => {
        if (!src.startsWith('https://')) {
            src = `https://backoffice.fabdev.fr/${src}`;
        }
        return match.replace(/src=["'][^"']*["']/, `src="${src}"`);
    });
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const article = await getArticle(params.slug);

    if (!article) {
        return {
            title: 'Article non trouvé - Fabdev',
        };
    }

    const imageUrl = article.picture
        ? `https://backoffice.fabdev.fr${article.picture}`
        : 'https://fabdev.fr/images/fabdev1200x630.png';

    return {
        title: `${article.title} - Fabdev`,
        description: article.description,
        authors: [{ name: article.author }],
        openGraph: {
            title: article.title,
            description: article.description,
            type: 'article',
            url: `https://fabdev.fr/articles/${generateSlug(article.title)}`,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
            siteName: 'Fabdev',
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.description,
            images: [imageUrl],
        },
    };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
    const article = await getArticle(params.slug);

    if (!article) {
        notFound();
    }

    const processedContent = processContent(article.content);

    return (
        <div className="pt-32 pb-20">
            <div className="mx-auto w-full max-w-3xl px-4 md:px-8">
                {article.picture && (
                    <Image
                        src={"https://backoffice.fabdev.fr" + article.picture}
                        alt={article.title}
                        className="h-60 w-full rounded-3xl object-cover md:h-[30rem]"
                        height={720}
                        width={1024}
                        unoptimized
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
                <ArticleContent
                    content={processedContent}
                    content_js={article.content_js}
                />
            </div>
        </div>
    );
}

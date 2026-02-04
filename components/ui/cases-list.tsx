'use client'
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from 'next/navigation'
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-cards";
import { GlowingStarsBackgroundCard } from "@/components/ui/glowing-stars";
import Link from "next/link";
import Image from "next/image";

function SkeletonCard({ isLarge = false }: { isLarge?: boolean }) {
    return (
        <div className={`${isLarge ? "lg:col-span-3" : "lg:col-span-2"}`}>
            <div className="bg-black border-white/[0.2] w-full rounded-xl p-6 border flex flex-col animate-pulse">
                <div className={`${isLarge ? "lg:h-72" : "h-48"} h-48 w-full bg-neutral-800 rounded-xl`} />
                <div className="h-6 bg-neutral-800 rounded mt-4 w-3/4" />
                <div className="h-4 bg-neutral-800 rounded mt-2 w-full" />
                <div className="h-4 bg-neutral-800 rounded mt-1 w-2/3" />
            </div>
        </div>
    );
}

function SkeletonTags() {
    const widths = ["w-24", "w-32", "w-28", "w-20", "w-36", "w-24", "w-28", "w-32", "w-20", "w-24"];
    return (
        <>
            {widths.map((w, i) => (
                <div
                    key={i}
                    className={`inline-block ${w} h-10 bg-neutral-800 rounded-full me-3 mb-2 animate-pulse`}
                />
            ))}
        </>
    );
}

function SkeletonCTA() {
    return (
        <div className="lg:col-span-6">
            <div className="h-32 lg:h-40 w-full bg-neutral-800 rounded-xl animate-pulse" />
        </div>
    );
}

export default function CasesList() {
    type ItemType = {
        id: number;
        title: string;
        subtitle: string;
        brief: string;
        date: string;
        duration: string;
        solution: string;
        outcomes: string;
        client: string;
        screenshot: string;
        services: string[];
        thumbnail: string;
    };

    const searchParams = useSearchParams()
    let initialTag = searchParams.get('tag') || '';

    type TypeItems = ItemType[];

    const [items, setItems] = useState<TypeItems>([]);
    const [activeTag, setActiveTag] = useState(initialTag);
    const [imagesReady, setImagesReady] = useState(false);

    // Preload images before showing cards
    const preloadImages = async (cases: TypeItems) => {
        const imagePromises = cases.slice(0, 8).map((cas) => {
            return new Promise<void>((resolve) => {
                const img = new window.Image();
                img.onload = () => resolve();
                img.onerror = () => resolve(); // Don't block on error
                img.src = cas.thumbnail;
            });
        });
        await Promise.all(imagePromises);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/cases/api/');
            const dataCases = await res.json();
            if (dataCases) {
                await preloadImages(dataCases);
                setItems(dataCases)
                setImagesReady(true);
                localStorage.setItem("dataCases", JSON.stringify({
                    data: dataCases,
                    timestamp: Date.now()
                }))
            }
        };
        const cached = localStorage.getItem("dataCases")
        if (cached) {
            const { data, timestamp } = JSON.parse(cached)
            const oneDay = 24 * 60 * 60 * 1000
            if (Date.now() - timestamp < oneDay) {
                preloadImages(data).then(() => {
                    setItems(data)
                    setImagesReady(true);
                });
                return
            }
        }
        fetchData()
    }, [])

    // Calculate filtered items synchronously to avoid render gaps
    const filtered = useMemo(() => {
        if (activeTag && items.length > 0) {
            return items.filter(item => item.services.includes(activeTag));
        }
        return items;
    }, [activeTag, items]);

    // Calculate all services from items
    const allServices = useMemo(() => {
        const services = new Set<string>();
        items.forEach(item => {
            item.services.forEach((service: string) => {
                services.add(service);
            });
        });
        return services;
    }, [items]);

    const selectTag = (tag: string) => {
        if (activeTag === tag) {
            setActiveTag("");
        } else {
            setActiveTag(tag);
        }
    };

    // Show skeletons until images are preloaded
    const isLoading = !imagesReady;

    return (
        <div className="pb-10">
            <div className="my-8 text-center mx-1 sm:mx-10">
                {isLoading ? (
                    <SkeletonTags />
                ) : (
                    Array.from(allServices).map((cas: string) => (
                        <div
                            key={cas}
                            className={`inline-block px-4 py-2 rounded-full me-3 mb-2 cursor-pointer transition-all duration-200 ${
                                cas === activeTag
                                    ? "bg-white text-black"
                                    : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                            }`}
                            onClick={() => selectTag(cas)}
                        >
                            {cas}
                        </div>
                    ))
                )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-6 text-white gap-6 sm:px-10">
                {isLoading ? (
                    <>
                        {/* Row 1: 3 cards */}
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        {/* Row 2: 3 cards */}
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        {/* Row 3: 2 large cards */}
                        <SkeletonCard isLarge />
                        <SkeletonCard isLarge />
                        {/* Row 4: 3 cards */}
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        {/* CTA card */}
                        <SkeletonCTA />
                    </>
                ) : (
                    <>
                        {filtered.map((cas, index) => {
                            const isLargeCard = index % 8 == 6 || index % 8 == 7;
                            return (
                            <React.Fragment key={cas.id}>
                                <a
                                    className={`${isLargeCard ? "lg:col-span-3" : "lg:col-span-2"} h-full`}
                                    href={"cases/" + cas.id + "?tag=" + activeTag}
                                >
                                    <CardContainer className="inter-var w-full h-full">
                                        <CardBody className="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2] w-full h-full rounded-xl p-6 border flex flex-col">
                                            <CardItem translateZ="100" className="w-full">
                                                <Image
                                                    src={cas.thumbnail}
                                                    height={600}
                                                    width={900}
                                                    unoptimized
                                                    className={`${isLargeCard ? "lg:h-72" : "h-48"} h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl`}
                                                    alt={cas.title}
                                                />
                                            </CardItem>
                                            <CardItem
                                                translateZ="50"
                                                className="text-xl font-bold text-white mt-4"
                                            >
                                                {cas.title}
                                            </CardItem>
                                            <CardItem
                                                as="p"
                                                translateZ="60"
                                                className="text-neutral-300 text-sm max-w-sm mt-2 flex-grow"
                                            >
                                                {cas.subtitle}
                                            </CardItem>
                                        </CardBody>
                                    </CardContainer>
                                </a>
                                {index % 16 === 10 && (
                                <Link className="block lg:col-span-6" href="/contact">
                                    <GlowingStarsBackgroundCard>
                                        <div className="font-bold text-white text-center mt-3 lg:mt-0 lg:text-left text-xl lg:text-3xl backdrop-blur-sm">
                                            Construisons ensemble votre prochain succès
                                        </div>
                                        <div className="text-xl bg-white text-black mb-3 lg:mb-0 p-2 px-6 rounded-2xl flex flex-row items-center">
                                            <div className="me-2">Contact</div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                 strokeLinejoin="round"
                                                 className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                <path d="M5 12l14 0"/>
                                                <path d="M13 18l6 -6"/>
                                                <path d="M13 6l6 6"/>
                                            </svg>
                                        </div>
                                    </GlowingStarsBackgroundCard>
                                </Link>
                                )}
                            </React.Fragment>
                        )})}
                    </>
                )}
            </div>
        </div>
    );
}

'use client'
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation'
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-cards";
import { GlowingStarsBackgroundCard } from "@/components/ui/glowing-stars";
import Link from "next/link";

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
    const [filtered, setFiltered] = useState<TypeItems>([]);
    let allServices = new Set<string>();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/cases/api/');
            const dataCases = await res.json();
            if (dataCases) {
                setFiltered(dataCases)
                setItems(dataCases)
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
                setFiltered(data)
                setItems(data)
                return
            }
        }
        fetchData()
    }, [])

    if (items) {
        items.forEach(item => {
            item.services.forEach((service: string) => {
                allServices.add(service);
            });
        });
    }

    const selectTag = (tag: string) => {
        if (activeTag === tag) {
            setActiveTag("");
        } else {
            setActiveTag(tag);
        }
    };

    useEffect(() => {
        if (activeTag && items) {
            const filtered = items.filter(item => item.services.includes(activeTag))
            setFiltered(filtered)
        } else {
            setFiltered(items)
        }
    }, [activeTag, items])

    return (
        <div className="pb-10">
            <div className="my-8 text-center mx-1 sm:mx-10">
                {Array.from(allServices).map((cas: string) => (
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
                ))}
            </div>
            <motion.div layout className="grid grid-cols-1 lg:grid-cols-6 text-white gap-5 sm:px-10">
                <AnimatePresence>
                    {filtered.map((cas, index) => (
                        <React.Fragment key={cas.id}>
                            <motion.a
                                className={`${index % 8 == 6 || index % 8 == 7 ? "lg:col-span-3" : "lg:col-span-2"} h-full`}
                                animate={{ opacity: 1 }}
                                initial={{ opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                layout
                                href={"cases/" + cas.id + "?tag=" + activeTag}
                            >
                                <CardContainer className="inter-var w-full h-full">
                                    <CardBody className="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2] w-full h-full rounded-xl p-6 border flex flex-col">
                                        <CardItem translateZ="100" className="w-full">
                                            <img
                                                src={cas.thumbnail}
                                                height={600}
                                                width={900}
                                                className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl"
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
                                        <div className="flex justify-end items-center mt-6">
                                            <CardItem
                                                translateZ={20}
                                                className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold whitespace-nowrap"
                                            >
                                                Voir →
                                            </CardItem>
                                        </div>
                                    </CardBody>
                                </CardContainer>
                            </motion.a>
                            <Link className={index % 16 == 10 ? "block lg:col-span-6" : "hidden"} href="/contact">
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
                        </React.Fragment>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

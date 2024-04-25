'use client'
import React, {useState, useEffect, Suspense} from "react";
import Image from 'next/image';
import {motion, AnimatePresence} from 'framer-motion';
import {useSearchParams} from 'next/navigation'


import {CardBody, CardContainer, CardItem} from "@/components/ui/3d-cards";

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

    // Missing Suspense boundary with useSearchParams

    const searchParams = useSearchParams()
    let initialTag = searchParams.get('tag') || '';

    type TypeItems = ItemType[];

    const [items, setItems] = useState<TypeItems>([]);
    const [activeTag, setActiveTag] = useState(initialTag);
    const [filtered, setFiltered] = useState<TypeItems>([]);
    let allServices = new Set<string>();
    useEffect(() => {
        let MyData = sessionStorage.getItem("dataCases")
        if (MyData) {
            const ParsedData = JSON.parse(MyData)
            setFiltered(ParsedData)
            setItems(ParsedData)

        }
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
                    <div key={cas}
                         className={"border-black border-2 inline-block border-opacity-10 px-3 py-2 rounded-3xl bg-gray-200 bg-opacity-50 me-3 mb-2 cursor-pointer dark:bg-opacity-10 dark:border-gray-200 dark:border-opacity-20" + (cas === activeTag ? "bg-black bg-opacity-100 border-opacity-90 dark:bg-white dark:bg-opacity-30" : "")}
                         onClick={() => selectTag(cas)}>{cas}</div>
                ))}
            </div>
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 dark:text-white gap-5 sm:px-10">
                <AnimatePresence>
                    {filtered.map((cas) => (
                        <motion.a animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}} transition={{duration: 0.25}} layout key={cas.id} href={"cases/" + cas.id + "?tag=" + activeTag}>
                            <CardContainer className="hover:cursor-pointer  relative">
                                <CardBody
                                    className="rounded-xl m-5">
                                    <CardItem translateZ="80" className="mt-4">
                                        <Image
                                            src={cas.thumbnail}
                                            height="600"
                                            width="600"
                                            className="  rounded-xl group-hover/card:shadow-xl"
                                            alt="thumbnail"
                                        />
                                    </CardItem>
                                    <CardItem
                                        translateZ="70"
                                        className="text-xl font-bold text-neutral-600 dark:text-white mt-4"
                                    >
                                        {cas.title}
                                    </CardItem>

                                    <CardItem
                                        as="p"
                                        translateZ="50"
                                        className="text-sm max-w-sm dark:text-neutral-300 mt-3"
                                    >
                                        {cas.subtitle}
                                    </CardItem>
                                </CardBody>
                            </CardContainer>
                        </motion.a>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}


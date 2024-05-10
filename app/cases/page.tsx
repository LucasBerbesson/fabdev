"use client"
import {motion, AnimatePresence} from 'framer-motion';
import {useSearchParams} from 'next/navigation'
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import React, {useState, useEffect, Suspense} from "react";
import {GlowingStarsBackgroundCard} from "@/components/ui/glowing-stars";
import Link from "next/link";

import {CardBody, CardContainer, CardItem} from "@/components/ui/3d-cards";
import Image from "next/image";

export default function Page() {
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
        const fetchData = async () => {
            const res = await fetch('/cases/api/');
            const dataCases = await res.json();
            if (dataCases) {
                setFiltered(dataCases)
                setItems(dataCases)
                sessionStorage.setItem("dataCases", JSON.stringify(dataCases))
            }
        };
        if (sessionStorage["dataCases"]) {
            let MyData = sessionStorage.getItem("dataCases")
            if (MyData) {
                let dataCases: TypeItems;
                const jsonData = JSON.parse(MyData)
                dataCases = jsonData as TypeItems;
                setFiltered(dataCases)
                setItems(dataCases)
            }

        } else {
            fetchData()
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
        <div className="max-w-screen-xl mx-auto min-h-[100vh]">
            <div className="h-[14vh] w-full">
            </div>
            <h1 className="text-5xl text-center m-10">
                Nos Réalisations
            </h1>
            <Suspense>
                <div className="pb-10 ">
                    <div className="my-8 text-center mx-1 sm:mx-10">
                        {Array.from(allServices).map((cas: string) => (
                            <div key={cas}
                                 className={"border-black border-2 inline-block border-opacity-10 px-3 py-2 rounded-3xl bg-gray-200 bg-opacity-50 me-3 mb-2 cursor-pointer dark:bg-opacity-10 dark:border-gray-200 dark:border-opacity-20" + (cas === activeTag ? "bg-black bg-opacity-100 border-opacity-90 dark:bg-white dark:bg-opacity-30" : "")}
                                 onClick={() => selectTag(cas)}>{cas}</div>
                        ))}
                    </div>
                    <motion.div layout className="grid grid-cols-1 lg:grid-cols-6 dark:text-white gap-5 sm:px-10">
                        <AnimatePresence>
                            {filtered.map((cas, index) => (
                                <React.Fragment key={cas.id}>
                                    <motion.a className={`${index % 8 == 6 || index % 8 == 7 ? "lg:col-span-3" : "lg:col-span-2"} h-full`} animate={{opacity: 1}} initial={{opacity: 0}}
                                              exit={{opacity: 0}}
                                              transition={{duration: 0.25}} layout
                                              href={"cases/" + cas.id + "?tag=" + activeTag}>
                                        <CardContainer className="hover:cursor-pointer  relative">
                                            <CardBody
                                                className="rounded-xl m-5 ">
                                                <CardItem translateZ="80" className="mt-4 ">
                                                    <Image
                                                        src={cas.thumbnail}
                                                        height="600"
                                                        width="900"
                                                        className="  rounded-xl group-hover/card:shadow-xl border-2 border-neutral-300 dark:border-0"
                                                        alt="thumbnail"
                                                    />
                                                </CardItem>
                                                <CardItem
                                                    translateZ="70"
                                                    className="text-xl font-bold text-neutral-600 dark:text-white mt-4 "
                                                >
                                                    {cas.title}
                                                </CardItem>

                                                <CardItem
                                                    as="p"
                                                    translateZ="50"
                                                    className="text-sm max-w dark:text-neutral-300 mt-3"
                                                >
                                                    {cas.subtitle}
                                                </CardItem>
                                            </CardBody>
                                        </CardContainer>
                                    </motion.a>
                                    <Link className={index % 16 == 10 ? "block lg:col-span-6 " : "hidden"} href="/contact">
                                        <GlowingStarsBackgroundCard>
                                            <div className="font-bold text-white text-center mt-3 lg:mt-0 lg:text-left text-xl lg:text-3xl backdrop-blur-sm">Construisons ensemble votre prochain succès
                                            </div>
                                            <div className="text-xl bg-white text-black mb-3 lg:mb-0 p-2 px-6 rounded-2xl flex flex-row items-center ">
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
            </Suspense>
        </div>
    );
}


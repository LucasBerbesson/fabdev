"use client"
import {useRouter} from 'next/router'
import getData from '@/app/cases/page'
import {allowedDisplayValues} from "next/dist/compiled/@next/font/dist/constants";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {cn} from "@/utils/cn";
import Link from "next/link";
import {useSearchParams} from 'next/navigation'
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

export default function Page({params}: { params: { id: number } }) {
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
        nb_users: string;
        screenshot: string;
        services: string[];
        thumbnail: string;
    };

    type TypeItems = ItemType[];

    const [items, setItems] = useState<TypeItems>([]);
    const searchParams = useSearchParams()
    let tag = searchParams.get('tag')
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/cases/api/');
            let MyData = await res.json();
            if (MyData) {
                if (tag) {
                    MyData = MyData.filter((item: ItemType) => item.services.includes(tag))
                }
                setItems(MyData)
            }
        };
        fetchData()
    }, [tag])


    const item = items.find((item: ItemType) => item.id == params.id);
    const currentIndex = item ? items.indexOf(item) : -1;
    const previousIndex = currentIndex !== 0 ? currentIndex - 1 : items.length - 1;
    const nextIndex = currentIndex !== items.length - 1 ? currentIndex + 1 : 0;
    if (item) {
        let outcomes = item.outcomes.split("-");
        outcomes = outcomes.map((element: string) =>
            element.replace(/(\r\n|\n|\r)/gm, "").replace(" - ", '')
        );
        outcomes.shift()
        return (
            <div className="pt-36 px-4 sm:px-10 pb-10">
                <Link
                    key={`previous`}
                    href={`/cases/?tag=${tag}`}
                >
                    <div className="text-fabdev flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round"
                             className="inline-block">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M15 6l-6 6l6 6"/>
                        </svg>
                        <div className="inline-block">Tous nos cas</div>
                    </div>
                </Link>
                <div className="flex flex-row justify-between items-center">
                    <div className="max-w-[90%]">
                        <h1 className="text-3xl font-bold">{item.title}</h1>
                        <h3 className="text-xl">{item.subtitle}</h3>
                    </div>
                    <div>
                        <Link key={`${previousIndex}`} href={`/cases/${items[previousIndex].id}?tag=${tag}`}>
                            <div className="p-2 rounded-3xl border-2 border-black dark:border-white hover:cursor-pointer inline-block me-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M5 12l14 0"/>
                                    <path d="M5 12l6 6"/>
                                    <path d="M5 12l6 -6"/>
                                </svg>
                            </div>
                        </Link>
                        <Link key={`${nextIndex}`} href={`/cases/${items[nextIndex].id}?tag=${tag}`}>

                            <div className="p-2 rounded-3xl border-2 border-black dark:border-white hover:cursor-pointer inline-block">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M5 12l14 0"/>
                                    <path d="M15 16l4 -4"/>
                                    <path d="M15 8l4 4"/>
                                </svg>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="my-8">
                    {item.services.slice(0, 4).map((cas: string) => (
                        <Link href={"/cases/?tag=" + cas} key={cas}
                              className={"border-black border-2 inline-block border-opacity-10 px-3 py-2 rounded-3xl bg-gray-200 bg-opacity-50 me-3 mb-2 cursor-pointer dark:bg-opacity-10 dark:border-gray-200 dark:border-opacity-20"}
                        >{cas}</Link>
                    ))}
                </div>
                <div className="border-y-2 border-y-opacity-40 border-y-black my-12 p-3 dark:border-y-white dark:border-y-opacity-80">
                    <div className="flex flex-row justify-between px-1 sm:px-8">
                        <div className="flex flex-col">
                            <div className="font-bold text-gray-500 dark:text-gray-300">Date</div>
                            <div className="">{item.date}</div>
                        </div>
                        <div className="flex flex-col">
                            <div className="font-bold text-gray-500 dark:text-gray-300">Durée</div>
                            <div className="">{item.duration}</div>
                        </div>
                        <div className="flex flex-col">
                            <div className="font-bold text-gray-500 dark:text-gray-300">Client</div>
                            <div className="">{item.client}</div>
                        </div>
                        <div className="flex flex-col">
                            <div className="font-bold text-gray-500 dark:text-gray-300">Utilisateurs</div>
                            <div className="">{item.nb_users}</div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 my-6 gap-5">
                    <div className="px-6">
                        <Image
                            src={item.screenshot}
                            width={1024}
                            height={1024}
                            unoptimized
                            className="rounded-xl object-cover w-full"
                            alt={item.title}
                        />
                    </div>
                    <div className="">
                        <h5 className="text-xl font-bold">Le Brief</h5>
                        <div className="whitespace-pre-wrap">{item.brief}</div>
                        <h5 className="text-xl font-bold mt-4">Les solutions</h5>
                        <div className="whitespace-pre-wrap">{item.solution}</div>
                        <h5 className="text-xl font-bold mt-4">Les retombées</h5>
                        <div className="mt-2">
                            {outcomes.map((outcome: string) => (
                                <div key={outcome}
                                     className="flex flex-row mt-3">
                                    <div className="px-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                             className="stroke-green-500 dark:stroke-green-300">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M5 12l5 5l10 -10"/>
                                        </svg>
                                    </div>
                                    <div>{outcome}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

        )
    } else {
        return <div className="h-[100vh]"></div>
    }
}

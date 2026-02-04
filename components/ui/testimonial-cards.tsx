"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Meteors } from "@/components/ui/meteor";

interface CardProps {
    title: string;
    content: string;
    nom: string;
    role: string;
    image: string;
}

const Card: React.FC<CardProps> = ({ title, content, nom, role, image }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="relative cursor-pointer" onClick={toggleExpand}>
            <div className="relative shadow-xl bg-gray-200 dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 px-4 py-8 overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                <h3 className="font-bold text-xl dark:text-white mb-4 relative z-10">
                    {title} [...]
                </h3>
                <div
                    className={`overflow-hidden duration-700 transition-max-height ${
                        expanded ? "max-h-96" : "max-h-0"
                    }`}
                >
                    <p className="my-3 font-normal text-base text-slate-400 mb-4 relative z-50">
                        {content}
                    </p>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex flex-column items-center">
                        <Image
                            src={image}
                            height={40}
                            width={40}
                            className="rounded-xl aspect-w-1 aspect-h-1 object-cover w-12 h-12 me-4"
                            alt={nom}
                        />
                        <div className="font-normal text-base text-slate-500 relative z-50">
                            {nom} <br />
                            {role}
                        </div>
                    </div>
                    <div className="h-10 w-10 me-6 rounded-full border flex items-center text-gray-500 justify-center mb-4 border-gray-500 hover:border-gray-100 cursor-pointer hover:text-gray-50">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1"
                            stroke="currentColor"
                            className={`h-4 w-4 duration-700 transition-transform ${
                                expanded ? "transform -rotate-180" : ""
                            }`}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                            />
                        </svg>
                    </div>
                </div>
                <Meteors number={20} />
            </div>
        </div>
    );
};

interface TestimonialCardsProps {
    cards: CardProps[];
}

export function TestimonialCards({ cards }: TestimonialCardsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mx-4 sm:mx-16 mb-32 max-w-screen-xl">
            {cards.map((card, index) => (
                <Card
                    key={index}
                    title={card.title}
                    content={card.content}
                    nom={card.nom}
                    role={card.role}
                    image={card.image}
                />
            ))}
        </div>
    );
}

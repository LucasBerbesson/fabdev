import React from "react";
import {cn} from "@/utils/cn";
import {MovingBorder} from "@/components/ui/moving-border";
import {CardBody, CardContainer, CardItem} from "@/components/ui/3d-cards";
import Image from "next/image";


export function Fondateurs({}: {}) {
    return (
        <div className="flex flex-col justify-items-center items-center">
            <div className="text-5xl font-bold mb-20 ">Les fondateurs</div>
            <div className="flex flex-col md:flex-row">
                <CardContainer className="w-11/12 h-full mb-8 rounded-3xl">
                    <CardBody className="bg-gray-50 dark:bg-black p-5 group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] rounded-xl ">
                        <a href="https://www.linkedin.com/in/claire-berbesson-86ba1339/" className="flex flex-col  items-center lg:flex-row">
                            <CardItem translateZ="0" className="h-full me-7 flex flex-col content-center justify-center ">
                                <Image
                                    src="/images/claire.png"
                                    height="1000"
                                    width="1000"
                                    className="object-cover rounded-xl group-hover/card:shadow-xl w-44 h-44"
                                    alt="thumbnail"
                                />
                            </CardItem>
                            <div>
                                <CardItem
                                    translateZ="60"
                                    className="text-3xl font-bold text-neutral-600 dark:text-white mt-4 flex flex-row content-center"
                                >
                                    <div>Claire Protin</div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                             strokeLinecap="round" strokeLinejoin="round"
                                             className="mx-3 h-full">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"/>
                                            <path d="M8 11l0 5"/>
                                            <path d="M8 8l0 .01"/>
                                            <path d="M12 16l0 -5"/>
                                            <path d="M16 16v-3a2 2 0 0 0 -4 0"/>
                                        </svg>
                                    </div>
                                </CardItem>
                                <CardItem
                                    as="p"
                                    translateZ="50"
                                    className="text-xl max-w-sm text-fabdev"
                                >
                                    Co-fondatrice, relations et business
                                </CardItem>
                                <CardItem
                                    as="p"
                                    translateZ="40"
                                    className="text-sm max-w-sm dark:text-neutral-300 mt-3 "
                                >
                                    Diplômée de l’ESSEC, Claire oeuvre pour la résolution de problématiques d’entreprise par le code. Elle facilite le déroulement des projets en priorisant les
                                    besoins et en accompagnant la transformation. Elle a embarqué plus de 1000 collaborateurs dans la co-construction d’outils.
                                </CardItem>
                            </div>
                        </a>

                    </CardBody>
                </CardContainer>
                <CardContainer className="w-11/12 h-full mb-8 rounded-3xl">
                    <CardBody className="bg-gray-50 dark:bg-black p-5 group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] rounded-xl ">
                        <a href="https://www.linkedin.com/in/claire-berbesson-86ba1339/" className="flex flex-col lg:flex-row items-center">
                            <CardItem translateZ="0" className="h-full me-7 flex flex-col content-center justify-center">
                                <Image
                                    src="/images/lucas.png"
                                    height="1000"
                                    width="1000"
                                    className="object-cover rounded-xl group-hover/card:shadow-xl w-44 h-44"
                                    alt="thumbnail"
                                />
                            </CardItem>
                            <div>
                                <CardItem
                                    translateZ="60"
                                    className="text-3xl font-bold text-neutral-600 dark:text-white mt-4 flex flex-row content-center"
                                >
                                    <div>Lucas Berbesson</div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                             strokeLinecap="round" strokeLinejoin="round"
                                             className="mx-3 h-full">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"/>
                                            <path d="M8 11l0 5"/>
                                            <path d="M8 8l0 .01"/>
                                            <path d="M12 16l0 -5"/>
                                            <path d="M16 16v-3a2 2 0 0 0 -4 0"/>
                                        </svg>
                                    </div>
                                </CardItem>
                                <CardItem
                                    as="p"
                                    translateZ="50"
                                    className="text-xl max-w-sm text-fabdev "
                                >
                                    Co-fondateur et digital architect
                                </CardItem>
                                <CardItem
                                    as="p"
                                    translateZ="40"
                                    className="text-sm max-w-sm dark:text-neutral-300 mt-3"
                                >
                                    Diplômé de CentraleSupélec, Lucas code depuis plus de 15 ans. Il a participé au développement de plus de 90 plateformes, algorithmes, scripts et outils pour des
                                    Grands Groupes, des PME et des startups de tous secteurs. Il aime transformer les problèmes complexes en solutions simples.
                                </CardItem>
                            </div>
                        </a>

                    </CardBody>
                </CardContainer>
            </div>
        </div>
    );
}

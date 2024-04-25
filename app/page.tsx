"use client"
import Image from "next/image";
import {HeroParallax} from "@/components/ui/hero-parallax"; // Modify the import path accordingly
import {Meteors} from "@/components/ui/meteor"; // Modify the import path accordingly
import {Fondateurs} from "@/components/ui/fondateurs"; // Modify the import path accordingly
import {InfiniteMovingCards} from "@/components/ui/infinite-moving-cards"; // Modify the import path accordingly
import {Button} from "@/components/ui/moving-border"; // Modify the import path accordingly
import React, {useEffect, useState} from "react";
import Link from "next/link"; // Modify the import path accordingly
import {LampContainer} from "@/components/ui/lamp"; // Modify the import path accordingly
import {motion} from "framer-motion";

import {cn} from "@/utils/cn";

const clients = [
    {
        link: "/partenaires/sncf.png",
        name: "SNCF",
    },
    {
        link: "/partenaires/engie.png",
        name: "Engie",
    },
    {
        link: "/partenaires/fiehl.png",
        name: "Diehl",
    },
    {
        link: "/partenaires/rte.png",
        name: "RTE",
    },
    {
        link: "/partenaires/cfj.png",
        name: "CFJ",
    },
    {
        link: "/partenaires/valeo.png",
        name: "Valeo",
    },
    {
        link: "/partenaires/air-france.png",
        name: "Air-France",
    },
    {
        link: "/partenaires/atlantic.png",
        name: "Atlantic",
    },
    {
        link: "/partenaires/oreal.png",
        name: "L'Oréal",
    },
    {
        link: "/partenaires/alogia.png",
        name: "Alogia",
    },
    {
        link: "/partenaires/established.png",
        name: "Established inc",
    },
    {
        link: "/partenaires/cooperation_agricole.png",
        name: "La cooperation agricole",
    },
];
const cardsData = [
    {
        title: 'Dynamiques, serviables, et avant tout grandement compétents, les qualificatifs se bousculent à l\'évocation de FabDev',
        content: 'Dynamiques, serviables, et avant tout grandement compétents, les qualificatifs se bousculent à l\'évocation de FabDev. Beaucoup prétendent savoir développer, beaucoup se targuent d\'une longue expérience, mais peu allient l\'excellence à la qualité d\'écoute. Avec leur complémentarité de formation et de tempérament, Claire et Lucas ont su mettre en orbite l\'Inventaire national des orgues, application web clé au sein d\'un projet original soutenu par le monde associatif et le ministère de la culture.\n' +
            'Délais tenus, souplesse d\'exécution, force de proposition, ont fait merveille au service de l\'univers exigeant des amoureux du patrimoine.\n' +
            'FABDEV fait de la conception et du developpement informatique web un artisan de génie !',
        nom: "Gwilherm Poullennec",
        role: "Chef d'équipe, RTE",
        image: "/images/gwilherm.jpg",
    },
    {
        title: 'Fabdev a développé de grands succès pour notre entreprise. Une équipe efficace et plus que sympathique, à l’écoute de ses clients',
        content: "Fabdev nous a accompagné dans deux projets de digitalisation, axés sur la transformation et l’innovation, avec une forte dimension métiers. L’équipe a contribué activement à l’identification des besoins, au design des solutions et à leur mise en œuvre. L'accompagnement « front to end » et l’implication active et engagée à comprendre les contraintes métiers ont permis d’avoir dès la première version, une solution opérationnelle efficace. La capacité à héberger la solution dans un premier temps et accompagner par la suite la reprise dans les SI de notre groupe en satisfaisant toutes les contraintes de sécurité a véritablement aidé à l’adoption et au succès des deux projets. Deux grands succès au final avec une équipe efficace et plus que sympathique, à l’écoute de ses clients.",
        nom: "François-Xavier Olivieri",
        role: "Director Hydrogen, Engie",
        image: "/images/fx.jpeg",
    },
    {
        title: 'Fonctionnement agile, respect des délais, budget dimensionné au plus juste : je ne peux que recommander FABDEV pour vos projets digitaux ',
        content: "J’ai eu l’occasion de travailler avec Fabdev sur différents projets dans plusieurs entreprises. Je peux affirmer en toute confiance que j’ai rarement eu l’opportunité d’avancer aussi efficacement sur des projets digitaux.\n" +
            "L’équipe délivre un maximum de valeur pour l’utilisateur cible le plus rapidement et le plus intelligemment possible. Des échanges toujours très constructifs qui nous ont à chaque fois permis d’avoir un œil neuf sur nos projets et y apporter des améliorations pertinentes.\n" +
            "Les solutions techniques proposées sont toujours expliquées de manière pertinente, permettant d’avoir toutes les clés en main pour réaliser des arbitrages. Fonctionnement agile, respect des délais, budget dimensionné au plus juste : je ne peux que recommander FABDEV pour vos projets digitaux !",
        nom: "Arnaud Marec",
        role: "Directeur Marketing",
        image: "/images/arnaud.jpeg",
    },
    {
        title: 'Vrai sentiment d\'écoute et de compréhension de notre besoin. Excellente qualité des livrables.\n' +
            'Ce fut un réel plaisir de travailler avec FABDEV',
        content: "J'ai eu la chance de travailler avec FABDEV sur le développement de solutions au sein de deux groupes du CAC40. Les deux outils, initialement des proof of concepts, sont rapidement devenus des plateformes intégrées à d'autres applications de types ERP ou CRM. Vrai sentiment d'écoute et de compréhension de notre besoin. Excellente qualité des livrables. Solide expérience multi-industries. Tout cela a permis d'accompagner la transformation et l'adoption de ces nouvelles solutions en interne. J'ajouterais que leurs choix technologiques ainsi que leur pragmatisme naturel ont été des atouts de choix pour rassurer et accompagner les DSI.\n" +
            "Ce fut un réel plaisir de travailler avec FABDEV.",
        nom: "Antoine Aimar",
        role: "Manager Achats, L'Oréal\n",
        image: "/images/antoine.jpeg",
    },
];


interface CardProps {
    title: string;
    content: string;
    nom: string;
    role: string;
    image: string;
}

const Card: React.FC<CardProps> = ({title, content, nom, role, image}) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="relative cursor-pointer" onClick={toggleExpand}>
            <div className="relative shadow-xl bg-gray-200 dark:bg-neutral-900 border border-gray-200 dark:border-gray-800  px-4 py-8 overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                <h1 className="font-bold text-xl dark:text-white mb-4 relative z-10">
                    {title} [...]
                </h1>
                <div
                    className={`overflow-hidden duration-700 transition-max-height ${
                        expanded ? 'max-h-96' : 'max-h-0'
                    }`}
                >
                    <p className="my-3 font-normal text-base text-slate-400 mb-4 relative z-50">{content}</p>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex flex-column items-center ">
                        <Image
                            src={image}
                            height="40"
                            width="40"
                            className="rounded-xl aspect-w-1 aspect-h-1 object-cover w-12 h-12 me-4"
                            alt="thumbnail"
                        />
                        <div className="font-normal text-base text-slate-500 relative z-50">
                            {nom} <br/>
                            {role}
                        </div>
                    </div>
                    <div
                        className="h-10 w-10 me-6 rounded-full border flex items-center text-gray-500 justify-center mb-4 border-gray-500 hover:border-gray-100 cursor-pointer hover:text-gray-50">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1"
                            stroke="currentColor"
                            className={`h-4 w-4 duration-700 transition-transform ${
                                expanded ? 'transform -rotate-180' : ''
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
                <Meteors number={20}/>
            </div>
        </div>

    )
        ;
};


export default function Home() {
    type ItemType = { title: string, link: string, thumbnail: string, services: [string] }
    type TypeItems = ItemType[];
    const [products, setProducts] = useState<TypeItems>([]);
    let allServices = new Set<string>();
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/cases/api/');
            const MyData = await res.json();
            if (MyData) {
                const ParsedData = MyData
                let newProducts = []
                for (let item of ParsedData) {
                    newProducts.push(
                        {
                            title: item["title"],
                            thumbnail: item["screenshot"],
                            link: `/cases/${item["id"]}?tag=`,
                            services: item["services"]
                        }
                    )
                }
                setProducts(newProducts)
            }
        };
        fetchData()

    }, [])
    if (products) {
        products.forEach(item => {
            item.services.forEach((service: string) => {
                allServices.add(service);
            });
        });
    }
    return (
        <div className="pt-20 overflow-x-hidden">
            <HeroParallax products={products}/>
            <div className=" p-4 max-w-7xl mx-auto relative z-10  w-full pt-20 md:pt-0 text-center mb-40">
                <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 from-neutral-500  to-neutral-700 bg-opacity-50">
                    On peut tout faire <br/> vite et bien.
                </h1>
                <p className="mt-4 mb-12 text-xl dark:text-neutral-300 text-neutral-700 max-w-lg text-center mx-auto">
                    Notre méthode de travail et notre expérience nous permettent de livrer des outils en moyenne 4 fois plus vite que nos concurrents (et accessoirement, à des prix compétitifs...)
                </p>
                <Link href="/cases/" className="mt-12">
                    <Button
                        borderRadius="3rem"
                        className="bg-neutral-800 dark:bg-black dark:text-white text-xl text-white  ">
                        Voir tous nos projets
                    </Button>
                </Link>
            </div>
            <div className="flex flex-col justify-items-center items-center">
                <Fondateurs></Fondateurs>
                <div className="text-5xl font-bold mb-20 mt-48 mx-4 text-center">Témoignages de nos clients</div>
                <div className="grid grid-cols-3 lg:grid-cols-6 max-w-screen-2xl mx-auto mt-0 my-10 lg:mb-20">
                    {clients.map((client, index) => (
                        <div className={"text-center"}>
                            <Image
                                src={client.link}
                                height="100"
                                width="200"
                                className="mx-auto filter grayscale  brightness-0 invert transition-all"
                                alt="thumbnail"
                            />
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2  gap-12 mx-4 sm:mx-16 mb-48 max-w-screen-xl">
                    {cardsData.map((card, index) => (
                        <Card key={index} title={card.title} content={card.content} nom={card.nom} role={card.role} image={card.image}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

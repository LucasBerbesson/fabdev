import { HeroParallax } from "@/components/ui/hero-parallax";
import { Fondateurs } from "@/components/ui/fondateurs";
import { Button } from "@/components/ui/moving-border";
import React from "react";
import Link from "next/link";
import { LogoCloudMarquee } from "@/components/ui/logo-cloud-marquee";
import { TestimonialCards } from "@/components/ui/testimonial-cards";

const cardsData = [
    {
        title: "Dynamiques, serviables, et avant tout grandement compétents, les qualificatifs se bousculent à l'évocation de FabDev",
        content:
            "Dynamiques, serviables, et avant tout grandement compétents, les qualificatifs se bousculent à l'évocation de FabDev. Beaucoup prétendent savoir développer, beaucoup se targuent d'une longue expérience, mais peu allient l'excellence à la qualité d'écoute. Avec leur complémentarité de formation et de tempérament, Claire et Lucas ont su mettre en orbite l'Inventaire national des orgues, application web clé au sein d'un projet original soutenu par le monde associatif et le ministère de la culture.\nDélais tenus, souplesse d'exécution, force de proposition, ont fait merveille au service de l'univers exigeant des amoureux du patrimoine.\nFABDEV fait de la conception et du developpement informatique web un artisan de génie !",
        nom: "Gwilherm Poullennec",
        role: "Chef d'équipe, RTE",
        image: "/images/gwilherm.jpg",
    },
    {
        title: "Fabdev a développé de grands succès pour notre entreprise. Une équipe efficace et plus que sympathique, à l'écoute de ses clients",
        content:
            "Fabdev nous a accompagné dans deux projets de digitalisation, axés sur la transformation et l'innovation, avec une forte dimension métiers. L'équipe a contribué activement à l'identification des besoins, au design des solutions et à leur mise en œuvre. L'accompagnement « front to end » et l'implication active et engagée à comprendre les contraintes métiers ont permis d'avoir dès la première version, une solution opérationnelle efficace. La capacité à héberger la solution dans un premier temps et accompagner par la suite la reprise dans les SI de notre groupe en satisfaisant toutes les contraintes de sécurité a véritablement aidé à l'adoption et au succès des deux projets. Deux grands succès au final avec une équipe efficace et plus que sympathique, à l'écoute de ses clients.",
        nom: "François-Xavier Olivieri",
        role: "Director Hydrogen, Engie",
        image: "/images/fx.jpeg",
    },
    {
        title: "Fonctionnement agile, respect des délais, budget dimensionné au plus juste : je ne peux que recommander FABDEV pour vos projets digitaux ",
        content:
            "J'ai eu l'occasion de travailler avec Fabdev sur différents projets dans plusieurs entreprises. Je peux affirmer en toute confiance que j'ai rarement eu l'opportunité d'avancer aussi efficacement sur des projets digitaux.\nL'équipe délivre un maximum de valeur pour l'utilisateur cible le plus rapidement et le plus intelligemment possible. Des échanges toujours très constructifs qui nous ont à chaque fois permis d'avoir un œil neuf sur nos projets et y apporter des améliorations pertinentes.\nLes solutions techniques proposées sont toujours expliquées de manière pertinente, permettant d'avoir toutes les clés en main pour réaliser des arbitrages. Fonctionnement agile, respect des délais, budget dimensionné au plus juste : je ne peux que recommander FABDEV pour vos projets digitaux !",
        nom: "Arnaud Marec",
        role: "Directeur Marketing",
        image: "/images/arnaud.jpeg",
    },
    {
        title: "Vrai sentiment d'écoute et de compréhension de notre besoin. Excellente qualité des livrables.\nCe fut un réel plaisir de travailler avec FABDEV",
        content:
            "J'ai eu la chance de travailler avec FABDEV sur le développement de solutions au sein de deux groupes du CAC40. Les deux outils, initialement des proof of concepts, sont rapidement devenus des plateformes intégrées à d'autres applications de types ERP ou CRM. Vrai sentiment d'écoute et de compréhension de notre besoin. Excellente qualité des livrables. Solide expérience multi-industries. Tout cela a permis d'accompagner la transformation et l'adoption de ces nouvelles solutions en interne. J'ajouterais que leurs choix technologiques ainsi que leur pragmatisme naturel ont été des atouts de choix pour rassurer et accompagner les DSI.\nCe fut un réel plaisir de travailler avec FABDEV.",
        nom: "Antoine Aimar",
        role: "Manager Achats, L'Oréal",
        image: "/images/antoine.jpeg",
    },
];

type CaseItem = {
    id: string;
    title: string;
    thumbnail: string;
    services: string[];
    subtitle: string;
    home: boolean;
};

async function getCases() {
    const res = await fetch("https://backoffice.fabdev.fr/api/cases/", {
        next: { revalidate: 60 },
    });
    if (!res.ok) {
        return [];
    }
    const data: CaseItem[] = await res.json();
    return data
        .filter((item) => item.home)
        .map((item) => ({
            title: item.title,
            thumbnail: item.thumbnail,
            link: `/cases/${item.id}?tag=`,
            services: item.services,
            subtitle: item.subtitle,
        }));
}

export default async function Home() {
    const products = await getCases();

    return (
        <div className="pt-20 overflow-x-hidden">
            <HeroParallax products={products} />
            <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0 text-center mb-40">
                <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 from-neutral-500 to-neutral-700 bg-opacity-50">
                    On peut tout faire <br /> vite et bien.
                </h1>
                <p className="mt-4 mb-12 text-xl dark:text-neutral-300 text-neutral-700 max-w-2xl text-center mx-auto">
                    Notre méthode de travail et notre expérience nous permettent
                    de livrer des outils en moyenne 4 fois plus vite que nos
                    concurrents (et accessoirement, à des prix compétitifs...)
                    <br />
                    En{" "}
                    <span className="font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5">
                        10 ans d&apos;existence
                    </span>
                    , nous avons développé{" "}
                    <span className="font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5">
                        plus de 200 projets
                    </span>
                    .
                </p>
                <Link href="/cases/" className="mt-12">
                    <Button
                        borderRadius="3rem"
                        className="bg-neutral-800 dark:bg-black dark:text-white text-xl text-white"
                    >
                        Voir tous nos projets
                    </Button>
                </Link>
            </div>
            <div className="flex flex-col justify-items-center items-center">
                <LogoCloudMarquee />
                <Fondateurs />
                <h2 className="bg-gradient-to-b from-white to-neutral-600 bg-clip-text text-center font-sans text-2xl font-bold text-transparent md:text-5xl mb-20 mt-40 mx-4">
                    Témoignages de nos clients
                </h2>
                <TestimonialCards cards={cardsData} />
            </div>
        </div>
    );
}

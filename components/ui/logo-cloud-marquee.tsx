"use client";
import Marquee from "react-fast-marquee";
import Image from "next/image";

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
        link: "/partenaires/bostik.png",
        name: "Bostik",
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
        link: "/partenaires/technis.png",
        name: "Technis",
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
    {
        link: "/partenaires/culture.png",
        name: "Ministère de la culture",
    },
    {
        link: "/partenaires/malakoff.png",
        name: "Malakoff humanis",
    },
    {
        link: "/partenaires/olympics.png",
        name: "Jeux olympiques",
    },
     {
        link: "/partenaires/orgue-en-france.png",
        name: "Orgue en France",
    },
      {
        link: "/partenaires/cea.png",
        name: "CEA",
    },

];

export function LogoCloudMarquee() {
    // Décaler la deuxième ligne de 8 logos pour éviter la répétition visuelle
    const clientsSecondRow = [...clients.slice(8), ...clients.slice(0, 8)];

    return (
        <div className="relative z-20 px-4 py-20 md:px-8 md:py-32">
            <h2 className="bg-gradient-to-b from-white to-neutral-600 bg-clip-text text-center font-sans text-2xl font-bold text-transparent md:text-5xl">
                Ils nous font confiance
            </h2>
            <div className="relative mx-auto mt-10 flex h-full w-full max-w-7xl flex-wrap justify-center gap-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] md:mt-20">
                <Marquee pauseOnHover direction="right">
                    {clients.map((client, idx) => (
                        <Image
                            key={client.name + "logo-marquee" + idx}
                            src={client.link}
                            alt={client.name}
                            width={200}
                            height={100}
                            className="mx-4 w-40 object-contain filter grayscale brightness-0 invert md:mx-10 md:w-52"
                        />
                    ))}
                </Marquee>
            </div>
            <div className="relative mx-auto mt-4 flex h-full w-full max-w-7xl flex-wrap justify-center gap-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] md:mt-10">
                <Marquee pauseOnHover direction="left" speed={30}>
                    {clientsSecondRow.map((client, idx) => (
                        <Image
                            key={client.name + "logo-marquee-second" + idx}
                            src={client.link}
                            alt={client.name}
                            width={200}
                            height={100}
                            className="mx-4 w-40 object-contain filter grayscale brightness-0 invert md:mx-10 md:w-52"
                        />
                    ))}
                </Marquee>
            </div>
        </div>
    );
}

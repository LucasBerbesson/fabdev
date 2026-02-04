import React from "react";
import CasesList from "@/components/ui/cases-list";

type CaseItem = {
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

async function getCases(): Promise<CaseItem[]> {
    const res = await fetch("https://backoffice.fabdev.fr/api/cases/", {
        next: { revalidate: 60 },
    });
    if (!res.ok) {
        return [];
    }
    return res.json();
}

export default async function Page() {
    const cases = await getCases();
    const allServices = Array.from(
        new Set(cases.flatMap((item) => item.services))
    );

    return (
        <div className="max-w-screen-xl mx-auto min-h-[100vh]">
            <div className="h-[14vh] w-full"></div>
            <h1 className="text-5xl text-center m-10">Nos Réalisations</h1>
            <CasesList initialCases={cases} allServices={allServices} />
        </div>
    );
}

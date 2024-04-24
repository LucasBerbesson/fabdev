"use client"
import React from "react";
import {Suspense} from "react";

import {CardBody, CardContainer, CardItem} from "@/components/ui/3d-cards";
import CasesList from "@/components/ui/cases-list";

export default function Page() {
    return (
        <div className="">
            <div className="h-[14vh] w-full">
            </div>
            <h1 className="text-5xl text-center m-10">
                Nos Réalisations
            </h1>
            <Suspense>
            <CasesList></CasesList>
            </Suspense>
        </div>
    );
}


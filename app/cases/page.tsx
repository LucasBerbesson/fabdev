"use client"
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import React, {Suspense} from "react";
import CasesList from "@/components/ui/cases-list";

export default function Page() {

    return (
        <div className="max-w-screen-xl mx-auto min-h-[100vh]">
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


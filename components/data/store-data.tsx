"use client"
import React, {useEffect} from "react";


export function StoreData({dataCases, dataArticles}: {
    dataCases: [{
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
        services: [string];
        thumbnail: string;
    }],
    dataArticles: []

}) {
    useEffect(() => {
        if (!sessionStorage["dataCases"]) {
            sessionStorage.setItem("dataCases", JSON.stringify(dataCases))
        }
        if (!sessionStorage["dataArticles"]) {
            sessionStorage.setItem("dataArticles", JSON.stringify(dataArticles))
        }
    }, [])

    return <div></div>
}
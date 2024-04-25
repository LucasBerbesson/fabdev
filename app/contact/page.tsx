"use client";
import React, {useRef, useEffect, useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {cn} from "@/utils/cn";
import {XMarkIcon} from "@heroicons/react/24/outline";
import nextConfig from "@/next.config.mjs"

export default function Form() {
    const budgetRef = useRef(null);
    const delaiRef = useRef(null);
    const hiddenRef = useRef(null);
    const [timer, setTimer] = useState(0);
    const [message, setMessage] = useState('');
    const [colorMessage, setColorMessage] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);

        return () => clearInterval(intervalId);

    }, []);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget
        const formElements = form.elements as typeof form.elements & {
            name: HTMLInputElement
            company: HTMLInputElement
            budget: HTMLInputElement
            project: HTMLInputElement
            deadline: HTMLInputElement
            email: HTMLInputElement
            reason: HTMLInputElement
        }

        try {
            const response = await fetch(`https://fabdev.fr/contact/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formElements.name.value,
                    company: formElements.company.value,
                    project: formElements.project.value,
                    budget: formElements.budget.value,
                    deadline: formElements.deadline.value,
                    email: formElements.email.value,
                    reason: formElements.reason.value,
                }),
            });

            if (!response.ok) {
                setColorMessage("bg-rose-700 text-white")
                setMessage("Le message n'est pas parvenu à destination.");
            } else {
                console.log('Success:', await response.json());
                setColorMessage("bg-fabdev")
                setMessage('Votre formulaire a été soumis avec succès.');
            }
            const form = event.target as HTMLFormElement;
            form.reset();
        } catch (error) {
            console.error('Failed to send form:', error);
            setColorMessage("bg-rose-700 text-white")
            setMessage("Le message n'est pas parvenu à destination.");
        }
    }

    const handleMessageClick = () => {
        setMessage('');
    };

    return (
        <div className="pt-44 pb-8 mb-20">
            <div className="w-11/12 sm:w-6/12 mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Contactez Fabdev en remplissant ce formulaire !
                </h2>
                <form className="my-8" onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-10">
                        <Label htmlFor="name">Quel est votre nom ?</Label>
                        <Input required placeholder="John Doe" id="name" type="text" name="name"/>
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-10">
                        <Label htmlFor="company">Pour quelle société travaillez-vous ?</Label>
                        <Input required id="company" placeholder="Acme inc" type="text" name="company"/>
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-10">
                        <Label htmlFor="project">Décrivez votre projet en une ligne</Label>
                        <Input required id="project" placeholder="Un outil de gestion boosté à l'IA" type="text" name="project"/>
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-10">
                        <Label htmlFor="budgets">Quel est le budget pour votre projet ?</Label>
                        <div>
                            <input className="inputLabel" id="0-10" type="radio" defaultValue="0-10" hidden name="budget" ref={budgetRef}/>
                            <label htmlFor="0-10" className="mt-1  mx-1 inline-block p-2 px-3.5 rounded-3xl bg-neutral-200 dark:bg-neutral-800 hover:cursor-pointer">0-10k€</label>
                            <input className="inputLabel" id="10-30" type="radio" defaultValue="10-30" hidden name="budget" ref={budgetRef}/>
                            <label htmlFor="10-30" className="mt-1 mx-1 inline-block p-2 px-3.5 rounded-3xl bg-neutral-200 dark:bg-neutral-800 hover:cursor-pointer"> 10-30k€</label>
                            <input className="inputLabel" id="30-80" type="radio" defaultValue="30-80" hidden name="budget" ref={budgetRef}/>
                            <label htmlFor="30-80" className="mt-1 mx-1 inline-block p-2 px-3.5 rounded-3xl bg-neutral-200 dark:bg-neutral-800 hover:cursor-pointer">30-80k€</label>
                            <input className="inputLabel" id="80-150" type="radio" defaultValue="80-150" hidden name="budget" ref={budgetRef}/>
                            <label htmlFor="80-150" className="mt-1 mx-1 inline-block p-2 px-3.5 rounded-3xl bg-neutral-200 dark:bg-neutral-800 hover:cursor-pointer">80-150k€</label>
                            <input className="inputLabel" id="150" type="radio" defaultValue="150" hidden name="budget" ref={budgetRef}/>
                            <label htmlFor="150" className="mt-1 mx-1 inline-block p-2 px-3.5 rounded-3xl bg-neutral-200 dark:bg-neutral-800 hover:cursor-pointer">150k€+</label>
                        </div>
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-10">
                        <Label htmlFor="deadline">Quel est votre délai pour réaliser votre projet ?</Label>
                        <div>
                            <input className="inputLabel" id="mois" type="radio" defaultValue="mois" hidden name="deadline" ref={delaiRef}/>
                            <label htmlFor="mois" className="mt-1  mx-1 inline-block p-2 px-3.5 rounded-3xl bg-neutral-200 dark:bg-neutral-800 hover:cursor-pointer">Dans le mois</label>
                            <input className="inputLabel" id="semestre" type="radio" defaultValue="semestre" hidden name="deadline" ref={delaiRef}/>
                            <label htmlFor="semestre" className="mt-1 mx-1 inline-block p-2 px-3.5 rounded-3xl bg-neutral-200 dark:bg-neutral-800 hover:cursor-pointer">Dans le semestre</label>
                            <input className="inputLabel" id="annee" type="radio" defaultValue="annee" hidden name="deadline" ref={delaiRef}/>
                            <label htmlFor="annee" className="mt-1 mx-1 inline-block p-2 px-3.5 rounded-3xl bg-neutral-200 dark:bg-neutral-800 hover:cursor-pointer">Dans l`&apos;année</label>
                            <input className="inputLabel" id="unknown" type="radio" defaultValue="unknown" hidden name="deadline" ref={delaiRef}/>
                            <label htmlFor="unknown" className="mt-1 mx-1 inline-block p-2 px-3.5 rounded-3xl bg-neutral-200 dark:bg-neutral-800 hover:cursor-pointer">Je ne sais pas</label>
                        </div>
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-10">
                        <Label htmlFor="email">Adresse mail</Label>
                        <Input id="email" required name="email" placeholder="" type="email"/>
                    </LabelInputContainer>

                    <input className="hidden" id="" type="text" value={timer} name="reason" ref={hiddenRef}/>

                    <button
                        className="bg-gradient-to-br relative group/btn from-neutral-400 dark:from-zinc-900 dark:to-zinc-900 to-neutral-400 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                    >
                        Envoyer &rarr;
                        <BottomGradient/>
                    </button>
                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-7 h-[1px] w-full"/>
                </form>
            </div>
            {message && <p className={`text-gray-800 bg-opacity-80 p-3 px-3 rounded-md fixed cursor-pointer ${colorMessage}  left-8 bottom-8 hover:scale-105 transform duration-300`} onClick={handleMessageClick}>{message}<XMarkIcon className="h-6 w-6 inline-block ml-3 " aria-hidden="true"/> </p>}

        </div>
    )
        ;
}

const BottomGradient = () => {
    return (
        <>
            <span
                className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-fabdev to-transparent"/>
            <span
                className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"/>
        </>
    );
};

const LabelInputContainer = ({
                                 children,
                                 className,
                             }: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};

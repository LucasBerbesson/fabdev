"use client"
import React, {Fragment} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import Link from "next/link";
import {usePathname} from 'next/navigation'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import ThemeToggle from "@/components/ui/theme-toggle";
import LogoSpline from "@/components/ui/logo-spline";


function classNames(...classes: [string, string]) {
    return classes.filter(Boolean).join(' ')
}

export default function Nav() {
    const pathname = usePathname()
    const navigation = [
        {name: 'Accueil', href: '/', current: pathname === '/'},
        {name: 'Nos réalisations', href: '/cases', current: pathname.includes("cases")},
        {name: 'Qui sommes-nous ?', href: '/articles', current: pathname.includes("articles")},
        {name: 'Contact', href: '/contact', current: pathname === '/contact'},
    ]
    return (
        <Disclosure as="nav" className="backdrop-blur fixed z-50 w-full bg-neutral-50 dark:bg-neutral-900 bg-opacity-60 dark:bg-opacity-65">
            {({open}) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-24 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className="relative inline-flex items-center justify-center rounded-md p-2 text-black dark:text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5"/>
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6 " aria-hidden="true"/>
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link href="/">
                                        <img
                                            className="h-10 w-auto me-6 hidden dark:block"
                                            src="/images/logo_white.png"
                                            alt="Your Company"
                                        />
                                        <img
                                            className="h-10 w-auto me-6  dark:hidden"
                                            src="/images/logo.png"
                                            alt="Your Company"
                                        />
                                    </Link>
                                </div>
                                <div className="hidden w-full  sm:mr-6 sm:block">
                                    <div className="flex justify-end space-x-4 ">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-neutral-600 dark:bg-neutral-800 text-white' : ' dark:text-gray-400',
                                                    'rounded-md px-3 py-2 text-md font-medium dark:hover:bg-neutral-800 hover:bg-neutral-600 hover:text-white'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <ThemeToggle/>
                            </div>
                        </div>
                    </div>
                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2  font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

"use client";
import React from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/moving-border";

export const HeroParallax = ({
                                 products,
                             }: {
    products: {
        title: string;
        link: string;
        thumbnail: string;
    }[];
}) => {
    const firstRow = products.slice(0, 5);
    const secondRow = products.slice(5, 10);
    const thirdRow = products.slice(10, 15);
    const ref = React.useRef(null);
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const springConfig = {stiffness: 300, damping: 30, bounce: 100};

    const translateX = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 1000]),
        springConfig
    );
    const translateXReverse = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, -1000]),
        springConfig
    );
    const rotateX = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [15, 0]),
        springConfig
    );
    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
        springConfig
    );
    const rotateZ = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [20, 0]),
        springConfig
    );
    const translateY = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
        springConfig
    );
    return (
        <div
            ref={ref}
            className=" overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] [height:30fix 00px]"
        >
            <Header/>
            <motion.div
                style={{
                    rotateX,
                    rotateZ,
                    translateY,
                    opacity,
                }}
                className=""
            >
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
                    {firstRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={product.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row  mb-20 space-x-20 ">
                    {secondRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateXReverse}
                            key={product.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
                    {thirdRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={product.title}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export const Header = () => {
    return (
        <div className="max-w-7xl  relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0 z-50">
            <h1 className="text-4xl sm:text-2xl md:text-7xl font-bold dark:text-white">
                <span className="text-fabdev">Fabdev</span><br/>
                Développe vos applications web, data & IA
            </h1>
            <p className="max-w-3xl text-lg md:text-xl mt-8 mb-5 dark:text-neutral-200">
                Devenez le chouchou de votre manager en nous confiant votre projet de développement, de dashboard, de plateforme, d&apos;API, d&apos;IA générative, de dataviz, de machine learning et encore bien d’autres défis. <br/>
                Depuis 2015, nous avons développé plus de 100 projets et formé plus de 1000 collaborateurs.

            </p>
             <div>
              <Link href="/cases/" className="mt-12">
                    <Button
                        borderRadius="3rem"
                        className="bg-neutral-800 dark:bg-black dark:text-white text-lg text-white  ">
                        Voir nos projets
                    </Button>
                </Link>
             </div>
        </div>
    );
};

export const ProductCard = ({
                                product,
                                translate,
                            }: {
    product: {
        title: string;
        link: string;
        thumbnail: string;
    };
    translate: MotionValue<number>;
}) => {
    return (
        <motion.div
            style={{
                x: translate,
            }}
            whileHover={{
                y: -20,
            }}
            key={product.title}
            className="group/product h-96 w-[30rem] relative flex-shrink-0"
        >
            <Link
                href={product.link}
                className="block group-hover/product:shadow-2xl "
            >
                <Image
                    src={product.thumbnail}
                    height="600"
                    width="600"
                    className="object-cover object-left-top absolute h-full w-full inset-0"
                    alt={product.title}
                />
            </Link>

            <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black dark:bg-gray-200 dark:group-hover/product:opacity-80  pointer-events-none"></div>
            <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white dark:text-black font-weight-bold">
                {product.title}
            </h2>
        </motion.div>
    );
};

import React from 'react'

import {
    Button,
} from "@material-tailwind/react";

import { HeroImg, HeroImg2 } from '../services/imageImports';

function Hero() {

    const divStyle = {
        backgroundImage: `url(${HeroImg2})`, // Set the background image
        backgroundRepeat: 'no-repeat', // Do not repeat the background image
        backgroundPosition: 'right center', // Center the background image
      };
      

    return (

        <section
            className="relative"
        >
            <div
                className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
            >
                <div className="max-w-5xl text-center lg:text-left">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Remembering Love,<br className='block md:hidden'/> Sharing Hope :
                        <strong className="block font-extrabold text-rose-700"> Together Against Alzheimer's. </strong>
                    </h1>

                    <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                        Remembering Love,<br />Sharing Hope : Together Against Alzheimer's.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                        <Button
                            variant="gradient"
                            size="md"
                            className="rounded "
                        >
                            <span>Get Started</span>
                        </Button>
                        <Button
                            variant="text"
                            size="md"
                            className="rounded "

                        >
                            <span>Learn More</span>
                        </Button>


                    </div>
                </div>
            </div>
        </section>

    )
}

export default Hero;


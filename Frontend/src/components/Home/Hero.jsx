import React from 'react'
import { Typography } from "@material-tailwind/react";

const Hero = () => {
  return (
    <section className="flex flex-col justify-center items-center py-20 text-gray-900">
      <div className="text-center max-w-3xl">
        <Typography variant="h1" className="text-6xl font-bold mb-4">
          Remembering Love, Sharing Hope : <span className="text-blue-500">Together Against Alzheimer's.</span>
        </Typography>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
          <button className="text-white font-bold py-2 px-4 rounded bg-gray-700 hover:bg-gray-900">
            Learn More
          </button>
        </div>
    
      </div>
    </section>
  )
}

export default Hero;
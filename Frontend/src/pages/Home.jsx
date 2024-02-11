import React from 'react';
import NavbarComponent from '../components/NavbarComponent';

import { HeroImg, HeroImg2 } from '../services/imageImports';
import Hero from '../components/Hero';

function Home() {

  return (
    <>
      <div id='home'>
        <NavbarComponent />
        <Hero />
      </div>
    </>
  );
}

export default Home;
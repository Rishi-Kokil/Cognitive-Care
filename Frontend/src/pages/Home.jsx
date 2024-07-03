import React from 'react';
import { Hero, InfoDisplay, NavbarComponent,About } from '../components/Home';
import { CardComponent } from '../components/Home/CardComponent';
import { image1, image2, image3, image4, image5} from '../../public/assets/index.js';
import landingfInfo from '../constants/landingPageInfo';
import Footer from '../components/Home/Footer.jsx';

function Home() {
  const imageArray = [image1, image2, image3, image4, image5];
  return (
    <>
      <div
        className='container mx-auto scroll-smooth'
      >
        <NavbarComponent />
        <div
          id='home'
        >
          <Hero />
        </div>
        <InfoDisplay />
        <div
          id='feature'
          className='container flex flex-wrap justify-center gap-5 mt-6'
        >
          {
            landingfInfo.map(
              (item, index) => (
                <CardComponent
                  key={item.id}
                  title={item.title}
                  tagline={item.info}
                  image={imageArray[index]}
                />
              )
            )
          }
        </div>
        <About />
        <Footer />
      </div>
    </>
  );
}

export default Home;
import React from 'react';

const About = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">About Cognitive Care</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          At Cognitive Care, our mission is to revolutionize the early detection and management of Alzheimer's disease through advanced technology and community support. We believe in harnessing the power of artificial intelligence to make a significant impact on the lives of those affected by cognitive impairments.
        </p>
        
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
          <p className="text-base max-w-xl mx-auto">
            Our vision is to create a world where Alzheimer's disease is detected early, managed effectively, and where those affected can lead fulfilling lives with the support of innovative technology and a compassionate community.
          </p>
        </div>

        

        <div>
          <h3 className="text-2xl font-semibold mb-2">Our Commitment</h3>
          <p className="text-base max-w-xl mx-auto">
            We are committed to continuous improvement and innovation, ensuring that our platform remains at the forefront of Alzheimer's detection and support. Our team of experts is dedicated to providing the best tools and resources to help those affected by Alzheimer's live their best lives.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;

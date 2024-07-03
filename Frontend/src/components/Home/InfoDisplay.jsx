import React from 'react';

function InfoDisplay() {
  return (
    <div className="flex justify-center">
      <div className=" md:w-3/4 bg-blue-900 text-white rounded-lg p-8 shadow-lg">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="flex flex-col items-center mb-8 md:mb-0 md:mr-8">
            <p className="text-4xl font-bold">N+</p>
            <p className="text-lg">Patients Every Day</p>
          </div>
          <div className="hidden md:block border-l border-gray-400 h-16 mx-8"></div>
          <div className="flex flex-col items-center mb-8 md:mb-0 md:mr-8">
            <p className="text-4xl font-bold">M+</p>
            <p className="text-lg">Years Experience</p>
          </div>
          <div className="hidden md:block border-l border-gray-400 h-16 mx-8"></div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">K+</p>
            <p className="text-lg">Diagnosis Verity</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoDisplay;

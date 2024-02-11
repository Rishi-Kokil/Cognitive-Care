import React, { useState } from 'react'
import { Typography, Select, MenuItem, Input, Card, Button } from '@material-tailwind/react';

function CreateUserPatient() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file.name);
    setSelectedFile(file.name);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };


  return (
    <>
      <Card className="h-[calc(100vh-2rem)] w-full p-4 shadow-xl shadow-blue-gray-900/5 overflow-y-auto">
        <Typography variant="h4" className="text-center" color="blue-gray">
          Create Patient
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-center">
          Here you can create patients so that you can use the ML Model to detect Alzheimer's.
        </Typography>

        <form >
          <div className="p-4 grid grid-cols-2 gap-x-10 gap-y-6">
            {/* Half of section 1: Patient Information */}
            <div className='flex flex-col gap-6'>
              <Input
                label='Name'
                placeholder="Enter name"
                value={name}
                onChange={handleNameChange}
              />
              <Input
                value={age}
                label='Age'
                onChange={handleAgeChange}
              />
              <Select
                label='Gender'
                value= {gender}
                size="large"
                onChange={handleGenderChange}
              > 
                <MenuItem value={null} defaultChecked> --Select-- </MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </div>

            {/* Half of section 1: Additional Patient Information */}
            <div className='flex flex-col gap-6'>
              <Input
                label='Height'
                value={height}
                variant="Outlined"
                onChange={handleHeightChange}
              />
              <Input
                label='Weight'
                value={weight}
                onChange={handleWeightChange}
              />
            </div>
            <hr className="my-4 border-t border-gray-400 col-span-2" />

            {/* Section 2: MRI Image Upload */}
            <div className="col-span-2">
              <Typography variant="h6" color="blue-gray" className="font-normal">
                Upload MRI Image
              </Typography>
              <label htmlFor="file-upload" className="block mt-2">
                <div className="relative bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 flex justify-center items-center">
                  {selectedFile ? (
                    <span className="text-blue-gray-600">{selectedFile}</span>
                  ) : (
                    <span className="text-blue-gray-600">Choose file...</span>
                  )}
                  <input
                    id="file-upload"
                    type="file"
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    onChange={handleFileChange}
                  />
                </div>
              </label>


            </div>
          </div>
        </form>
      </Card>
    </>
  )
};


export default CreateUserPatient;
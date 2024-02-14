import React, { useState } from 'react'
import { Typography, Select, Input, Card, Button, Option } from '@material-tailwind/react';
import axios from 'axios';
import { useAuth } from '../../context/authContext';


function CreateUserPatient() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const { isAuthenticated, token, login, logout } = useAuth();

  const resetFields = () => {
    setName('');
    setAge('');
    setGender('');
    setHeight('');
    setWeight('');
    setSelectedFile('');
  }

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

  const handleFormSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('height', height);
    formData.append('weight', weight);
    formData.append('image', selectedFile);

    const axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    };

    console.log(token);

    try {
      const response = await axios.post("http://localhost:8080/user/create-patients", formData, axiosConfig);
      console.log(response);
      if (response.data.success === true) {
        resetFields();
      }
      
    }
    catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <Card className="h-[calc(100vh-2rem)] w-full p-8 shadow-xl shadow-blue-gray-900/5 overflow-y-auto">
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
                value={gender}
                size="large"
                onChange={handleGenderChange}
              >
                <Option value={null} defaultChecked> --Select-- </Option>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
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
              <Button className="mt-6"
                onClick={handleFormSubmit}
              >
                Submit
              </Button>

            </div>
          </div>
        </form>
      </Card>
    </>
  )
};


export default CreateUserPatient;
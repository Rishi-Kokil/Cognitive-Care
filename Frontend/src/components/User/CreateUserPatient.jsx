import React, { useState } from 'react';
import { Typography, Select, Input, Card, Button, Option, Slider, Alert } from '@material-tailwind/react';
import axios from 'axios';
import { useAuth } from '../../context/authContext';

function CreateUserPatient() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("Choose File");
  const [toggleAlert, setToggleAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");

  const { isAuthenticated, token, login, logout } = useAuth();

  const resetFields = () => {
    setName('');
    setAge('');
    setGender('');
    setHeight('');
    setWeight('');
    setSelectedFile('');
    setFileName("Choose File");
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    setSelectedFile(file);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const showSuccessAlert = () => {
    setAlertMessage("Patient Added Successfully");
    setAlertColor("green");
    setToggleAlert(true);

    setTimeout(() => {
      setToggleAlert(false)
    }, 2000);
  }

  const showErrorAlert = () => {
    setAlertMessage("There was an error while adding the Patient !!! ");
    setAlertColor("red");
    setToggleAlert(true);

    setTimeout(() => {
      setToggleAlert(false)
    }, 2000);
  }

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

    try {
      const response = await axios.post("http://localhost:8080/user/create-patients", formData, axiosConfig);
      console.log(response);
      showSuccessAlert();
      if (response.data.success === true) {
        resetFields();
      }

    }
    catch (error) {
      showErrorAlert();
      console.log(error);
    }

  }

  return (
    <>
      <div className="w-full flex flex-col gap-5 rounded-md px-12 py-6">
        <Typography variant="h3" className='text-center' >
          Create Patient
        </Typography>
        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700" htmlFor="name">Name</label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={handleNameChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-4 ">
              <>
                <label className="text-gray-700 mr-2" htmlFor="age">Age : {age}</label>
              </>
              <Slider
                color="blue"
                defaultValue={age}
                step={1}
                onChange={handleAgeChange}
              />
            </div>

            <div>
              <label className="text-gray-700" htmlFor="gender">Gender</label>
              <Select
                id="gender"
                value={gender}
                onChange={handleGenderChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              >
                <Option value="">--Select--</Option>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </div>

            <div>
              <label className="text-gray-700" htmlFor="weight">Weight</label>
              <Input
                id="weight"
                type="text"
                value={weight}
                onChange={handleWeightChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="block text-gray-700">MRI Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>{fileName}</span>
                      <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
            <div>
              <label className="text-gray-700" htmlFor="height">Height</label>
              <Input
                id="height"
                type="text"
                value={height}
                onChange={handleHeightChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button
              color="gray"
              onClick={handleFormSubmit}
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Submit
            </Button>
          </div>

        </form>
        <Alert
          className={`w-[500px] mx-auto ${!toggleAlert ? "hidden" : "block"}`}
          color='green'
        >{alertMessage}</Alert>
      </div>
    </>
  )
};

export default CreateUserPatient;
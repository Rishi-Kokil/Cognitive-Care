import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Button, Tooltip } from '@material-tailwind/react';
import axios from 'axios';
import { useAuth } from '../../../context/authContext';
import defaultAvatar from '/assets/DefaultAvatar.png';
import RenderTestResults from './RenderTestResults';
import formatDateTime from '../../../services/formatDate';
import { X } from 'lucide-react';


function PatientInfo() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const { token } = useAuth();
  const [pageRefresh, setPageRefresh] = useState(true);
  const [imgData, setImgData] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [fileName, setFileName] = useState("Choose File");
  const navigate = useNavigate();

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const testPatient = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/user/test-patient/${patient._id}`, null, axiosConfig);
      console.log(response.data);
      setPageRefresh(!pageRefresh);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleUpdate = () => {
    setShowImageUpload(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    setImageFile(file);
  };

  const handleImageUpload = async () => {
    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append("pid", patient._id);
        formData.append('image', imageFile);

        const response = await axios.post(`http://localhost:8080/user/updateMRI`, formData, axiosConfig);

        setPageRefresh(!pageRefresh);
        setShowImageUpload(false); // Close the image upload component on successful upload
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/get-patient-info?patient_id=${id}`, axiosConfig);
        const patientData = response.data.patient;
      
        setPatient(patientData);

        if (patientData && patientData.mri_image && patientData.mri_image.data) {
          const imageUrl = `http://localhost:8080/user/mri-image/${response.data.patient._id}`;
          const headers = {
            'Authorization': `Bearer ${token}`
          };

          const imageResponse = await axios.get(imageUrl, { headers: headers, responseType: 'blob' });
          const imageUrlBlob = URL.createObjectURL(imageResponse.data);
          setImgData(imageUrlBlob);
        }

        //updating the Upload MRI Image  variables
        setImageFile(null);
        setFileName("Choose File");

      } catch (error) {
        console.log('Error fetching patient:', error);
      }
    };

    fetchPatient();

  }, [id, token, pageRefresh]);

  return (
    <>
      {patient && (
        <section className="h-[98vh] rounded-lg px-4 py-2 overflow-y-auto flex flex-col gap-2">
          <div className="flex items-center gap-6 px-6 py-4 bg-white rounded-lg shadow-md h-[20vh]">
            <img
              src={defaultAvatar}
              alt="Avatar"
              className="h-28 w-28 rounded-full object-cover border-2 border-gray-200"
            />
            <div className="flex justify-between items-center flex-grow">
              <p className="text-2xl font-semibold text-gray-800">{patient.fullName}</p>
              <p className="text-sm text-gray-500">Joined {formatDateTime(patient.created_at)}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-md flex-grow">
            <div className="relative flex justify-center items-center w-full md:w-[50%] bg-transparent rounded-lg object-contain cursor-pointer h-[70vh]">
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="bg-gray-800 bg-opacity-75 rounded-lg p-4 flex gap-2">
                  <Button
                    color="green"
                    className="text-white"
                    onClick={handleUpdate}
                  >
                    Update MRI Image
                  </Button>
                  <Button color="blue" className="text-white" onClick={toggleFullScreen}>
                    View Full Screen
                  </Button>
                </div>
              </div>

              <img
                  src={imgData}
                  alt="MRI"
                  className="h-full rounded-lg"
                  onClick={toggleFullScreen}
                />
              
              {isFullScreen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex justify-center items-center">
                  <X 
                    className='absolute top-2 right-6 w-10 h-10 text-white bg-black p-2 cursor-pointer rounded-full'
                    onClick={toggleFullScreen}
                  />
                  <img
                    src={imgData}
                    alt="Full Screen MRI"
                    className="h-[100vh] hover:cursor-pointer"
                    onClick={toggleFullScreen}
                  />
                </div>
              )}
            </div>

            {/* information section */}
            <div className="w-full md:w-[50%] flex flex-col gap-4 overflow-auto">
              <div className="bg-gray-200 rounded-lg shadow-md p-4">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <p>Age: {patient.age}</p>
                  <p>Height: {patient.height} cm</p>
                  <p>Gender: {patient.gender || 'Not specified'}</p>
                  <p>Joined: {formatDateTime(patient.created_at)}</p>
                </div>
              </div>
              <div className="bg-gray-200 rounded-lg shadow-md p-4 overflow-hidden">
                <Typography variant="h6" color="gray">Detection Results</Typography>
                <RenderTestResults
                  detectionResult={patient.detectionResults}
                  patient_id={patient._id}
                  pageRefresh={pageRefresh}
                  setPageRefresh={setPageRefresh}
                />
                <Button
                  color="gray"
                  className="mt-2"
                  onClick={testPatient}
                >
                  Run Detection Test
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-gray-300 rounded-lg shadow-md p-4 mt-4">
            <Typography variant="h6" color="gray">MMSE Test Scores</Typography>
            <Button 
              color="gray" 
              className="mt-2"
              onClick={
                ()=>{
                  navigate(`/user/mmse/test/${patient._id}`)
                  console.log(`/user/mmse/test/${patient._id}`);
                }
              }  
            >Take Test</Button>
          </div>
        </section>
      )}


      {showImageUpload && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-300 px-3 py-6 flex flex-col gap-3 rounded-lg shadow-lg relative w-[90vw] max-w-lg">
            <Typography 
              variant='h4'
              className='text-center'
            >
              Upload MRI Image
            </Typography>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-500 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-700" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer p-2 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span>{fileName}</span>
                    <input id="file-upload" type="file" className="sr-only" onChange={handleImageChange} />
                  </label>
                </div>
                <p className="text-xs text-gray-700">PNG, JPG, GIF up to 1MB</p>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button color="red" onClick={() => setShowImageUpload(false)}>
                Cancel
              </Button>
              <Button color="green" onClick={handleImageUpload}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PatientInfo;

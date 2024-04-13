import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, Tooltip } from '@material-tailwind/react';
import axios from 'axios';
import { useAuth } from '../../context/authContext';
import defaultAvatar from '/assets/DefaultAvatar.png';
import formatDateTime from '../../services/formatDate';

function PatientInfo() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const { token } = useAuth();
  const [imgData, setImgData] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

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

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/get-patient-info?patient_id=${id}`, axiosConfig);
        const patientData = response.data.patient;
        console.log(patientData);
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
      } catch (error) {
        console.log('Error fetching patient:', error);
      }
    };

    fetchPatient();
  }, [id, token]);

  const renderDetection = (detectionResult) => {
    console.log(detectionResult);
    return (
      detectionResult && (
        <div className="scroll-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Result
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {detectionResult.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.result || `Marks: ${item.result}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDateTime(item.TimeStamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    );
  };

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
            <div
              className='flex justify-between items-center flex-grow'
            >
              <p className="text-2xl font-semibold text-gray-800">{patient.fullName}</p>
              <p className="text-sm text-gray-500">Joined {formatDateTime(patient.created_at)}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-md h-full">
            <div className="h-[70vh] relative flex justify-center items-center w-full h-[400px] md:w-[50%] bg-transparent rounded-lg object-contain cursor-pointer">
              {/* Use Tooltip component to display info box */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="bg-gray-800 bg-opacity-75 rounded-lg p-4 flex gap-2">
                  <Button color="green" className="text-white">
                    Update MRI Image
                  </Button>
                  <Button color="blue" className="text-white" onClick={toggleFullScreen}>
                    View Full Screen
                  </Button>
                </div>
              </div>
              <Tooltip content="Click to view in full screen" placement="top">
                <img
                  src={imgData}
                  alt="MRI"
                  className="h-full rounded-lg"
                  onClick={toggleFullScreen}
                />
              </Tooltip>
              {isFullScreen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex justify-center items-center">
                  <img
                    src={imgData}
                    alt="Full Screen MRI"
                    className="h-[100vh]"
                    onClick={toggleFullScreen}
                  />
                </div>
              )}
            </div>

            <div className="mt-4 w-full md:w-[50%] max-w-lg flex flex-col gap-4">
              <div className="bg-gray-200 rounded-lg shadow-md p-4">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <p>Age: {patient.age}</p>
                  <p>Height: {patient.height} cm</p>
                  <p>Gender: {patient.gender || 'Not specified'}</p>
                  <p>Joined: {formatDateTime(patient.created_at)}</p>
                </div>
              </div>
              {/* Detection Results section */}
              <div className="bg-gray-200 h-full rounded-lg shadow-md p-4 overflow-hidden overflow-y-auto">
                <Typography variant="h6" color="gray">Detection Results</Typography>
                {renderDetection(patient.detectionResults)}
                <Button
                  color="gray"
                  className="mt-2"
                  onClick={testPatient}
                >Run Detection Test</Button>
              </div>
            </div>

          </div>


          <div className="bg-gray-300 rounded-lg shadow-md p-4">
            <Typography variant="h6" color="gray">MMSE Test Scores</Typography>
            {renderDetection(patient.MMSETestResults)}
            <Button color="gray" className="mt-2">Take Test</Button>
          </div>
        </section>
      )}
    </>
  );
}

export default PatientInfo;

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

  const renderHistory = (historyItems) => {
    return
    {
      historyItems &&
        (
          <div className="overflow-y-auto h-48">
            {historyItems.map((item, index) => (
              <div key={index} className="bg-gray-100 rounded-lg shadow-md p-4 mb-4">
                <p>{item.Output || `Marks: ${item.marks}`}</p>
                <p className="text-sm text-gray-500">Timestamp: {formatDateTime(item.timeStamp)}</p>
              </div>
            ))}
          </div>
        )
    }

  };

  return (
    <>
      {patient && (
        <section className="h-[98vh] rounded-lg px-4 py-2 overflow-y-auto flex flex-col gap-2">
          <div className="flex items-center gap-6 p-4 bg-white rounded-lg shadow-md">
            <img
              src={defaultAvatar}
              alt="Avatar"
              className="h-28 w-28 rounded-full object-cover border-2 border-gray-200"
            />
            <div>
              <p className="text-2xl font-semibold text-gray-800">{patient.fullName}</p>
              <p className="text-sm text-gray-500">Joined {formatDateTime(patient.created_at)}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-md h-full">
            <div className="relative flex justify-center items-center w-full h-[400px] md:w-[50%] bg-transparent rounded-lg object-contain cursor-pointer">
              {/* Use Tooltip component to display info box */}
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
              <div className="bg-gray-200 rounded-lg shadow-md p-4">
                <Typography variant="h6" color="gray">Detection Results</Typography>
                {renderHistory(patient.detectionResults)}
                <Button color="gray" className="mt-2">Run Detection Test</Button>
              </div>

              {/* MMSE Test Scores section */}
              <div className="bg-gray-300 rounded-lg shadow-md p-4">
                <Typography variant="h6" color="gray">MMSE Test Scores</Typography>
                {renderHistory(patient.MMSETestResults)}
                <Button color="gray" className="mt-2">Take Test</Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default PatientInfo;

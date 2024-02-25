import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, Button } from '@material-tailwind/react';
import axios from 'axios';
import { useAuth } from '../../context/authContext';


function PatientInfo() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchPatient = async () => {
      console.log(token);
      const axiosConfig = {
        headers: {
          'authorization': `Bearer ${token}`
        }
      };

      try {
        const response = await axios.get(`http://localhost:8080/user/get-patient-info?patient_id=${id}`, axiosConfig);
        setPatient(response.data.patient);
        console.log(response.data.patient);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPatient();
  }, []);

  return (
    <>
      <Card
        className='h-[calc(100vh-2rem)] w-full p-8 shadow-xl shadow-blue-gray-900/5 overflow-y-auto'
      >
        {patient
          &&
          <img
            src={`data:${patient.mri_image.contentType};base64,${patient.mri_image.data.toString('base64')}`}
            alt="MRI"

          />
        }
        {patient && console.log(`data:${patient.mri_image.contentType};base64,${patient.mri_image.data}`)}

      </Card>
    </>
  )
}

export default PatientInfo;
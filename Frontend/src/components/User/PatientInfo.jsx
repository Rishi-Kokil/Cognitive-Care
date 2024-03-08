import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button } from '@material-tailwind/react';
import axios from 'axios';
import { useAuth } from '../../context/authContext';

function PatientInfo() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const { token } = useAuth();
  const [imgData, setImgData] = useState(null);



  useEffect(() => {
    const fetchPatient = async () => {
      const axiosConfig = {
        headers: {
          'Authorization': `Bearer ${token}` // Corrected typo in 'Authorization'
        }
      };

      try {
        const response = await axios.get(`http://localhost:8080/user/get-patient-info?patient_id=${id}`, axiosConfig);
        setPatient(response.data.patient);

        console.log(response.data.patient.mri_image);

        if (response.data.patient && response.data.patient.mri_image && response.data.patient.mri_image.data) {
          const imageUrl = `http://localhost:8080/user/mri-image/${patient._id}`;
          const headers = {
            'Authorization': 'Bearer ' + token
          };

          axios.get(imageUrl, { headers: headers, responseType: 'blob' })
            .then(response => {
              // Create object URL from blob
              const url = URL.createObjectURL(response.data);
              // Now you have the image blob, you can use it to set the src attribute of an img tag
              const img = document.createElement('img');
              setImgData(url)
              // document.body.appendChild(img); // Append the image to the DOM
            })
            .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
            });
        }
      } catch (error) {
        console.log('Error fetching patient:', error);
      }
    }

    fetchPatient();
  }, []); // Include id and token as dependencies

  const handleTestPatient = async () => {
    try {
      const axiosConfig = {
        headers: {
          'authorization': `Bearer ${token}`
        }
      };

      console.log(`Bearer ${token}`);
      // const response = await axios.get("http://localhost:8080/user/manage-patients", axiosConfig);
      const response = await axios.post(`http://localhost:8080/user/test-patient/${id}`, axiosConfig);
      console.log(response);
    }

    catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      {/* Header: Patient Name */}
      {patient && <Typography variant="h1" className='text-center font-normal text-black py-2'>{patient.fullName}</Typography>}

      {/* Patient Information */}
      <div className='mx-3 my-1 bg-blue-gray-100 rounded-xl p-3'>
        {/* Display patient information */}
        {patient && (
          <>
            <Typography variant="h1">MRI Image</Typography>
            <Typography variant='h6'>{patient.age}</Typography>
            {imgData && <img className="h-[100px] w-[100px]" src={imgData} alt='MRI_Image' />}
            <Typography variant='h6'>{patient.height}</Typography>
            <Typography variant='h6'>{patient.gender}</Typography>
            <Typography variant='h6'>{patient.medicalRecords.toString()}</Typography>
            <Typography variant='h6'>{patient.created_at}</Typography>
            <Typography variant='h6'>{patient.detectionResults.toString()}</Typography>
            <Button
              className="font-normal"
              onClick={handleTestPatient}
            >Test this Patient</Button>
          </>
        )}

        <br />
        Start Designing here
      </div>
    </>
  )
}

export default PatientInfo;

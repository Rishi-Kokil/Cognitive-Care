import React, { useEffect, useState } from 'react'
import { Typography, Card, Button } from '@material-tailwind/react';
import PatientListComponent from './patientListComponent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/authContext';


function ManageUserPatient() {

  const [patientList, setPatientList] = useState(null);

  const navigate = useNavigate();
  const date = new Date();

  const handleItemClick = (id) => {
    console.log(id);
    navigate(`/user/patient-info/${id}`);
  }

  const { token } = useAuth();

  useEffect(() => {
    const getPatientList = async () => {
      console.log("Inside manage patient");
      console.log(token);
      const axiosConfig = {
        headers: {
          'authorization': `Bearer ${token}`
        }
      };
      //get data grom the get route
      try {
        const response = await axios.get("http://localhost:8080/user/manage-patients", axiosConfig);
        setPatientList(response.data.patients);
        console.log(response.data.patients);
        console.log(response.data);
      }
      catch (error) {
        console.log(error)
      }
    }
    getPatientList();
  }, [])


  return (
    <>
      <Card className="h-[calc(100vh-2rem)] w-full p-8 shadow-xl shadow-blue-gray-900/5 overflow-y-auto">
        <Typography variant="h4" className="text-center" color="blue-gray">
          Patient List
        </Typography>
        <div>
          <Typography variant="h4" className="text-right" color="blue-gray">
            No of Patients Created
          </Typography>
          <Typography className="text-right" color="blue-gray font-normal">
            No of Patients Created
          </Typography>
        </div>
        <hr class="my-4 border-t border-gray-400" />

        {patientList &&
          patientList.map((item) => (
            <PatientListComponent {...item} handleItemClick={handleItemClick} />
          ))
        }
      </Card>
    </>
  )
}

export default ManageUserPatient;
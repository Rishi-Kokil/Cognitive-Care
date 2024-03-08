
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/authContext';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import PatientListComponent from '../patientListComponent';

function MMSEPatientList() {
    const { token } = useAuth();
    const [patientList, setPatientList] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleItemClick = (id) => {
        console.log(id);
         // Split the pathname into segments
         const pathSegments = location.pathname.split('/');

         // Remove the last segment
         pathSegments.pop();
 
         // Append '/test/:id' to the remaining path segments
         const newPath = `${pathSegments.join('/')}/test/${id}`;
 
         // Navigate to the new path
         navigate(newPath);
    }

    useEffect(() => {
        const fetchPatients = async () => {
            const axiosConfig = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            };

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

        fetchPatients();
    }, [])

    return (
        <>
            {patientList &&
                patientList.map((item) => (
                    <PatientListComponent {...item} handleItemClick={handleItemClick} />
                ))
            }
        </>
    );
}

export default MMSEPatientList;
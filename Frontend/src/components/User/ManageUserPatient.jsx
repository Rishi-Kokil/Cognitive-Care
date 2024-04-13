import React, { useEffect, useState } from 'react';
import { Typography, Card } from '@material-tailwind/react';
import PatientListComponent from './patientListComponent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/authContext';
import SearchBar from '../SearchBar';

function ManageUserPatient() {
    const [patientList, setPatientList] = useState(null);
    const [filteredPatientList, setFilteredPatientList] = useState(null); // State to hold filtered patient list
    const navigate = useNavigate();
    const { token } = useAuth();

    const handleItemClick = (id) => {
        navigate(`/user/patient-info/${id}`);
    };

    useEffect(() => {
        const getPatientList = async () => {
            const axiosConfig = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            };

            try {
                const response = await axios.get("http://localhost:8080/user/manage-patients", axiosConfig);
                setPatientList(response.data.patients);
                setFilteredPatientList(response.data.patients); // Initialize filtered list with all patients
            } catch (error) {
                console.log(error);
            }
        };
        getPatientList();
    }, [token]);

    const handleSearchChange = (event) => {
        const searchText = event.target.value.toLowerCase();
        const filteredPatients = patientList.filter(patient =>
            patient.fullName.toLowerCase().includes(searchText)
        );
        setFilteredPatientList(filteredPatients);
    };

    return (
        <>
            <Card className="h-[98vh] w-full p-8 shadow-xl shadow-blue-gray-900/5 overflow-y-auto scroll-auto">
                <Typography variant="h3" className="text-center" color="blue-gray">
                    Patient List
                </Typography>
                <div>
                    <Typography variant="h5" className="text-right" color="blue-gray">
                        No of Patients Created
                    </Typography>
                    <Typography variant="h6" className="text-right" color="blue-gray font-normal">
                        {patientList?.length || 0}
                    </Typography>
                </div>
                <hr className="my-4 border-t border-gray-400" />

      
                <SearchBar handleSearch={handleSearchChange} />

                {/* Render filtered patient list */}
                {filteredPatientList &&
                    filteredPatientList.map((item) => (
                        <PatientListComponent key={item.id} {...item} handleItemClick={handleItemClick} />
                    ))}
            </Card>
        </>
    );
}

export default ManageUserPatient;

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import PatientListComponent from '../PatientListComponent';
import { Input } from '@material-tailwind/react';
import SearchBar from '../../SearchBar';

function MMSEPatientList() {
    const { token } = useAuth();
    const [patientList, setPatientList] = useState(null);
    const [filteredPatientList, setFilteredPatientList] = useState(null); // State to hold filtered patient list
    const [search, setSearch] = useState("")
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchPatients = async () => {
            const axiosConfig = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            };

            try {
                const response = await axios.get("http://localhost:8080/user/manage-patients", axiosConfig);
                let temp = response.data.patients;
                temp.sort((a, b) => (a.created_at > b.created_at) ? -1 : ((a.created_at < b.created_at) ? 1 : 0));
                setPatientList(temp);
                setFilteredPatientList(temp); // Initialize filtered list with all patients
            } catch (error) {
                console.log(error);
            }
        };

        fetchPatients();
    }, [token]);

    const handleItemClick = (id) => {
        const pathSegments = location.pathname.split('/');
        pathSegments.pop();
        const newPath = `${pathSegments.join('/')}/test/${id}`;
        navigate(newPath);
    };

    const handleSearchChange = (event) => {
        const searchText = event.target.value.toLowerCase();
        setSearch(searchText)
        const filteredPatients = patientList.filter(patient =>
            patient.fullName.toLowerCase().includes(searchText)
        );
        setFilteredPatientList(filteredPatients);
    };

    return (
        <div className='w-[80%] mx-auto'>
            <SearchBar handleSearch={handleSearchChange} search={search} setSearch={setSearch} />
            {filteredPatientList && filteredPatientList.map((item) => (
                <PatientListComponent key={item._id} {...item} handleItemClick={handleItemClick} />
            ))}
        </div>
    );
}

export default MMSEPatientList;

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import { useLocation, useNavigate } from 'react-router-dom';
import PatientListComponent from '../PatientListComponent';
import { Button, Typography } from '@material-tailwind/react';
import SearchBar from '../../SearchBar';
import { useAxios } from '../../../context/axiosContext';



function MMSEPatientList() {
    const { token } = useAuth();
    const [patientList, setPatientList] = useState(null);
    const [filteredPatientList, setFilteredPatientList] = useState(null);
    const [search, setSearch] = useState("");
    const [patientsFound, setPatientsFound] = useState(true); // State to track if patients are found

    const navigate = useNavigate();
    const location = useLocation();
    const axiosInstance = useAxios();

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axiosInstance.get("user/manage-patients");
                let temp = response.data.patients;
                temp.sort((a, b) => (a.created_at > b.created_at) ? -1 : ((a.created_at < b.created_at) ? 1 : 0));
                setPatientList(temp);
                setFilteredPatientList(temp);
                setPatientsFound(temp.length > 0);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPatients();
    }, [axiosInstance]);

    const handleItemClick = (id) => {
        const pathSegments = location.pathname.split('/');
        pathSegments.pop();
        const newPath = `${pathSegments.join('/')}/test/${id}`;
        console.log(newPath);
        navigate(newPath);

    };

    const handleSearchChange = (event) => {
        const searchText = event.target.value.toLowerCase();
        setSearch(searchText);
        const filteredPatients = patientList.filter(patient =>
            patient.fullName.toLowerCase().includes(searchText)
        );
        setFilteredPatientList(filteredPatients);
        setPatientsFound(filteredPatients.length > 0); // Update patientsFound based on filtered data
    };

    return (
        <div className='w-[80%] mx-auto'>
            <SearchBar handleSearch={handleSearchChange} search={search} setSearch={setSearch} />
            {
                patientsFound ? (
                    filteredPatientList && filteredPatientList.map((item) => (
                        <PatientListComponent key={item._id} {...item} handleItemClick={handleItemClick} />
                    ))
                ) : (
                    <div className="text-center mt-8">
                        <Typography variant="h6" color="blue-gray">
                            No patients found. Create patients to manage.
                        </Typography>
                        <Button
                            className="mt-4 bg-gray-900"
                            onClick={() => navigate('/user/create-patient')}
                        >
                            Create Patient
                        </Button>
                    </div>
                )
            }
        </div>
    );
}

export default MMSEPatientList;

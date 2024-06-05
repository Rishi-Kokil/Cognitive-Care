import React, { useEffect, useState } from 'react';
import { Typography, Card, Button } from '@material-tailwind/react';
import PatientListComponent from './PatientListComponent';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar';
import { useAxios } from '../../context/axiosContext';

function ManageUserPatient() {
    const [patientList, setPatientList] = useState([]); // Original list of patients
    const [filteredPatientList, setFilteredPatientList] = useState([]); // Filtered list of patients
    const navigate = useNavigate();
    const [pageRefresh, setPageRefresh] = useState(true);
    const axiosInstance = useAxios(); // Use the Axios instance from context
    const [search, setSearch] = useState("");

    const handleItemClick = (id) => {
        navigate(`/user/patient-info/${id}`);
    };

    useEffect(() => {
        const getPatientList = async () => {
            try {
                const response = await axiosInstance.get("/user/manage-patients");
                const sortedPatients = response.data.patients.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setPatientList(sortedPatients); // Set the original list
                setFilteredPatientList(sortedPatients); // Set the filtered list
            } catch (error) {
                console.log(error);
            }
        };

        getPatientList();
    }, [axiosInstance, pageRefresh]);

    const handleSearchChange = (event) => {
        const searchText = event.target.value.toLowerCase();
        setSearch(searchText);
        const searchRegex = new RegExp(searchText, 'i');
        setFilteredPatientList(
            patientList
                .filter(patient => searchRegex.test(patient.fullName))
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        );
    };

    return (
        <Card className="h-[98vh] w-full p-8 shadow-xl shadow-blue-gray-900/5 overflow-y-auto">
            <div className="p-4 bg-gray-900 text-white rounded-md mb-4">
                <Typography variant="h3" className="text-center text-white" color="blue-gray">
                    Patient List
                </Typography>
                <div>
                    <Typography variant="h5" className="text-right" color="white">
                        No of Patients Created
                    </Typography>
                    <Typography variant="h6" className="text-right" color="white">
                        {filteredPatientList.length}
                    </Typography>
                </div>
            </div>

            <hr className="my-4 border-t border-gray-400" />

            <SearchBar handleSearch={handleSearchChange} search={search} />

            {filteredPatientList.length > 0 ? (
                filteredPatientList.map((item) => (
                    <PatientListComponent
                        key={item._id}
                        {...item}
                        handleItemClick={handleItemClick}
                        pageRefresh={pageRefresh}
                        setPageRefresh={setPageRefresh}
                    />
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
            )}
        </Card>
    );
}

export default ManageUserPatient;

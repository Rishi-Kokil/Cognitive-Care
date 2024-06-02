import React, { useEffect, useState } from 'react';
import { Typography, Card, Collapse, Button } from '@material-tailwind/react';
import PatientListComponent from './PatientListComponent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/authContext';
import SearchBar from '../SearchBar';

function ManageUserPatient() {
    const [patientList, setPatientList] = useState([]);
    const [filteredPatientList, setFilteredPatientList] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { token } = useAuth();

    const handleItemClick = (id) => {
        navigate(`/user/patient-info/${id}`);
    };

    const toggleOpen = () => {
        setOpen(prevOpen => !prevOpen);
        console.log('Toggle state:', !open); // Debugging the toggle function
    };

    useEffect(() => {
        const getPatientList = async () => {
            const axiosConfig = {
                headers: {
                    'authorization': `Bearer ${token}`,
                },
            };

            try {
                const response = await axios.get("http://localhost:8080/user/manage-patients", axiosConfig);
                let temp = response.data.patients;
                temp.sort((a, b) => (a.created_at > b.created_at) ? -1 : ((a.created_at < b.created_at) ? 1 : 0));
                setPatientList(temp);
                setFilteredPatientList(temp);
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
        setFilteredPatientList(filteredPatients.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    };

    return (
        <>
            <Card className="h-[98vh] w-full p-8 shadow-xl shadow-blue-gray-900/5 overflow-y-auto">
                <Typography variant="h3" className="text-center" color="blue-gray">
                    Patient List
                </Typography>
                <div>
                    <Typography variant="h5" className="text-right" color="blue-gray">
                        No of Patients Created
                    </Typography>
                    <Typography variant="h6" className="text-right" color="blue-gray font-normal">
                        {filteredPatientList.length}
                    </Typography>
                </div>
                <hr className="my-4 border-t border-gray-400" />
                <div className='flex gap-5 items-center'>
                    <SearchBar handleSearch={handleSearchChange} />
                    <Button onClick={toggleOpen}>Toggle Age</Button>
                </div>
                <Collapse open={open}>
                    <Card
                        className='h-[400px] w-[100px] z-20'
                    >
                        <Typography

                        >
                            Use our Tailwind CSS collapse for your website. You can use it for
                            accordion, collapsible items, and much more.
                        </Typography>
                    </Card>
                </Collapse>
                {filteredPatientList.map((item) => (
                    <PatientListComponent key={item._id} {...item} handleItemClick={handleItemClick} />
                ))}
            </Card>
        </>
    );
}

export default ManageUserPatient;

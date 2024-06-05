import React, { useState } from 'react';
import { Typography, Button } from '@material-tailwind/react';
import formatDateTime from '../../services/formatDate';
import { Trash2 } from 'lucide-react';
import defaultAvatar from '/assets/DefaultAvatar.png';
import { HoverBorderGradient } from '../ui/hover-border-gradient';
import axios from 'axios';
import { useAuth } from '../../context/authContext';

function PatientListComponent({ fullName, _id, age, gender, created_at, handleItemClick, pageRefresh, setPageRefresh }) {
  const [showWarning, setShowWarning] = useState(false);
  const { token } = useAuth();

  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowWarning(true);
  };


  const confirmDelete = () => {
    handleDeleteClick(_id);
    setShowWarning(false);
  };

  const cancelDelete = (e) => {
    e.stopPropagation();
    setShowWarning(false);
  };

  const handleDeleteClick = async (pid) => {
    try {
      const response = await axios.post(`http://localhost:8080/user/deletePatient?patient_id=${pid}`, null, axiosConfig);
      console.log(response.data);
      setPageRefresh(!pageRefresh);

    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <HoverBorderGradient
        onClick={() => {
          handleItemClick(_id);
        }}
        className="bg-gray-300 text-black w-full rounded-xl p-2 lg:p-6 cursor-pointer flex items-center hover:shadow-lg"
        containerClassName="w-full mb-2 border-2"
      >
        <button
          className="absolute top-2 right-2 p-1 rounded-full text-gray-500 hover:text-gray-900"
          onClick={handleDelete}
        >
          <Trash2 className="w-5 h-5" />
        </button>

        <div>
          <img
            src={defaultAvatar}
            alt="Avatar"
            className="h-[50px] w-[50px] rounded-full object-contain border-2 border-gray-200 md:h-[100px] md:w-[100px]"
          />
        </div>

        <div className="flex-grow ml-4">
          <div className="flex items-center justify-between mb-2">
            <Typography variant="h5" className="font-bold text-sm lg:text-lg" color="blue-gray">
              {fullName}
            </Typography>
            <p className="text-gray-700 text-xs hidden lg:block">
              <strong>Timestamp:</strong> {formatDateTime(created_at)}
            </p>
          </div>
          <p className="hidden sm:block text-xs md:text-base text-left">
            <strong>ID:</strong> {_id}
          </p>
        </div>
      </HoverBorderGradient>

      {showWarning && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[90vw] max-w-md">
            <Typography variant="h6" color="red" className="text-center mb-4">
              Warning
            </Typography>
            <Typography variant="paragraph" className="text-center mb-6">
              Are you sure you want to delete this patient?
            </Typography>
            <div className="text-center mb-6">
              <Typography variant="body2">
                <strong>Full Name:</strong> {fullName}
              </Typography>
              <Typography variant="body2">
                <strong>ID:</strong> {_id}
              </Typography>
            </div>
            <div className="flex justify-around">
              <Button color="red" onClick={confirmDelete}>
                Delete
              </Button>
              <Button color="blue-gray" onClick={cancelDelete}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PatientListComponent;

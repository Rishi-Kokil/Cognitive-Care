import React from 'react';
import { Typography } from '@material-tailwind/react';
import formatDateTime from '../../services/formatDate';

import defaultAvatar from '/assets/DefaultAvatar.png';

function PatientListComponent({ fullName, _id, age, gender, created_at, handleItemClick }) {
  return (
    <div
      className="bg-gray-300 rounded-xl shadow-md p-6 mb-4 cursor-pointer flex items-center transform hover:scale-105 transition duration-300 ease-in-out"
      onClick={() => {
        handleItemClick(_id);
      }}
    >
      <div>
        <img
          src={defaultAvatar}
          alt="Avatar"
          className="h-[100px] w-[100px] rounded-full object-contain border-2 border-gray-200"
        />
      </div>

      <div className="flex-grow ml-4"> {/* Use flex-grow to occupy remaining space */}
        <div className="flex items-center justify-between mb-2">
          <Typography variant="h5" className="font-bold" color="blue-gray">
            {fullName}
          </Typography>
          <p className="text-gray-700 text-sm">
            <strong>Timestamp:</strong> {formatDateTime(created_at)}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-2 text-[0.9rem]">
          <p className="text-gray-700">
            <strong>ID:</strong> {_id}
          </p>
          <p className="text-gray-700">
            <strong>Age:</strong> {age}
          </p>
          <p className="text-gray-700">
            <strong>Gender:</strong> {gender}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PatientListComponent;

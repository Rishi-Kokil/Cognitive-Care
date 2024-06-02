import React from 'react';
import { Typography } from '@material-tailwind/react';
import formatDateTime from '../../services/formatDate';
import { Trash2 } from 'lucide-react';

import defaultAvatar from '/assets/DefaultAvatar.png';
import { HoverBorderGradient } from '../ui/hover-border-gradient';

function PatientListComponent({ fullName, _id, age, gender, created_at, handleItemClick, handleDeleteClick }) {
  return (
    <HoverBorderGradient
      onClick={() => {
        handleItemClick(_id); 
      }}
      className="bg-gray-300 text-black w-full rounded-xl p-2 lg:p-6 cursor-pointer flex items-center hover:shadow-lg"
      containerClassName="w-full mb-2 border-2"
    >
      <button
        className="absolute top-2 right-2 p-1 rounded-full text-gray-500 hover:text-gray-900"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteClick(_id);
        }}
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
  );
}

export default PatientListComponent;

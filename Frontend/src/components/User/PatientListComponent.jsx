import React from 'react'
import { Typography, Card, Button } from '@material-tailwind/react';

function PatientListComponent({ fullName, _id, age, gender, created_at, handleItemClick }) {
    return (
        <div
            className="bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer"
            onClick={() => { handleItemClick(_id) }}
        >
            <Typography variant="h5" className="font-bold" color="blue-gray">
                {fullName}
            </Typography>
            <div className="grid grid-cols-2 gap-x-2 text-[0.9rem]">
                <p className="text-gray-700"><strong>ID:</strong> {_id}</p>
                <p className="text-gray-700"><strong>Age:</strong> {age}</p>
                <p className="text-gray-700"><strong>Gender:</strong> {gender}</p>
            </div>
            <p className="text-gray-700 text-right text-[0.8rem]"><strong>Created At:</strong> {created_at}</p>
        </div>

    )
}

export default PatientListComponent;
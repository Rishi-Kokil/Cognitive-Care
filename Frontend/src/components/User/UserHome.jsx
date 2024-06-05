import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/authContext';
import { Spinner } from "@material-tailwind/react";

function UserHome() {
  const [data, setData] = useState(null);
  const { token } = useAuth();

  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:8080/user/home"
      try {
        const response = await axios.get(url, axiosConfig);
        setData(response.data.userStats);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData();
  }, []);

  const statsArray = [
    { key: "patientCreated", label: "Patients Created" },
    { key: "testsExecuted", label: "Tests Executed" },
    { key: "MMSEConducted", label: "MMSE Conducted" },
    { key: "patientDeleted", label: "Patients Deleted" },
    { key: "testsDeleted", label: "Tests Deleted" },
    { key: "userId", label: "User ID" }
  ];

  return (
    <>
      {!data && <Spinner />}
      {data && (
        <div className="w-full h-screen p-3">
          <div className="grid grid-cols-3 gap-3 p-2">
            {statsArray.map((stat, index) => (
              <div key={index} className="flex-1 bg-gray-300 rounded-lg shadow-md py-4 px-2 flex flex-col items-center justify-center">
                <div className="text-xl font-semibold mb-1 text-gray-800">{data[stat.key]}</div>
                <div className="text-sm font-medium text-gray-700 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default UserHome;

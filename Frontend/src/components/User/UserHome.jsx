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
        setData(response.data.userStats)
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData();

  }, [])

  return (
    <>

      {
        !data && <Spinner />
      }
      {
        data &&
        <div className="w-full h-screen p-3">
          <div className="flex flex-grow gap-4">
            {/* Box 1: Companies */}
            <div className="flex-1 bg-gray-300 rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
              <div className="text-2xl font-semibold mb-1 text-gray-800">{data.patientCreated}</div>
              {/* <div className="p-1 rounded bg-gray-300 text-gray-600 text-xs font-semibold leading-none">+30%</div> */}
              <div className="text-sm font-medium text-gray-700 mt-1">Patient Created</div>
            </div>

            {/* Box 2: Blogs */}
            <div className="flex-1 bg-gray-300 rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
              <div className="text-2xl font-semibold mb-1 text-gray-800">{data.testsExecuted}</div>
              <div className="text-sm font-medium text-gray-700">Test Executed</div>
            </div>

            {/* Box 3: Users */}
            <div className="flex-1 bg-gray-300 rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
              <div className="text-2xl font-semibold mb-1 text-gray-800">{data.MMSEConducted}</div>
              <div className="text-sm font-medium text-gray-700">MMSE Conducted</div>
            </div>
          </div>
        </div>
      }

    </>
  );
}

export default UserHome;

import React, { useEffect } from 'react'
import { UserSideNav } from '../components/User';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import axios from 'axios';

function UserDashBoard() {

  const { isAuthenticated, token, role , logout } = useAuth();
  const navigate = useNavigate();
  const Backend_URL = "http://localhost:8080"

  useEffect(() => {
    console.log(JSON.stringify({ isAuthenticated, token, role , logout }));
    const sendData = async () => {
      try {
        const response = await axios.post(`${Backend_URL}/authenticate`, {
          role: role,
          token: token, 
        });

        console.log(response.data);

        if(response.data.success === true){
          navigate("home");
        }

        else{
          // logout();
          navigate("/login");
        }
        
      } catch (error) {
        console.error('Error:', error);
      }
    };

    sendData();

  }, [isAuthenticated, token, navigate]);

  return (
    <>

      <div className="grid grid-cols-10 h-screen gap-2 bg-blue-gray-100 px-2 py-1">
        {/* UserSideNav occupies 2/10 of the viewport width */}
        <div className="col-span-2 ">
          <UserSideNav />
        </div>

        <div className="col-span-8 bg-white rounded-xl border border-black">
          <Outlet />
        </div>
      </div>


    </>
  )
}

export default UserDashBoard;
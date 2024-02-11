import React from 'react'
import { UserSideNav } from '../components/User';
import { Outlet } from 'react-router-dom';


function UserDashBoard() {
  return (
    <>
      <div className="grid grid-cols-10 h-screen gap-2 bg-gray-200 px-2 py-1">
        {/* UserSideNav occupies 2/10 of the viewport width */}
        <div className="col-span-2 ">
          <UserSideNav />
        </div>

        {/* Right side div occupies 8/10 of the viewport width */}
        <div className="col-span-8">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default UserDashBoard;
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
  Collapse
} from "@material-tailwind/react";
import navlinks from '../constants/navlinks';

function NavbarComponent() {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();

  const handleLoginClick = ()=>{
    navigate("/login");
  }
  const handleSignUpClick = ()=>{
    navigate("/signup");
  }

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  return (
    <div className="max-h-[768px] w-full">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 border-none">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="span"
            className="mr-4 cursor-pointer py-1.5 font-bold"
          >
            CognitiveCare
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{
              <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                {
                  navlinks.map((item) => (
                    <Typography
                      key={item.id}
                      as="li"
                      variant="paragraph"
                      color="blue-gray"
                      className="p-1 font-bold cursor-default hover:text-blue-300"
                      id={item.id}
                    >
                      <span>{item.title}</span>
                    </Typography>
                  ))
                }
              </ul>

            }</div>

            <div className="flex items-center gap-x-1">
              <Button
                variant="text"
                size="md"
                className="hidden lg:inline-block"
                onClick={handleLoginClick}
              >
                <span>Log In</span>
              </Button>
              
              <Button
                variant="gradient"
                size="md"
                className="hidden lg:inline-block"
                onClick={handleSignUpClick}
              >
                <span>SIGN UP</span>
              </Button>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>

        <Collapse open={openNav}>
          {
            navlinks.map((item) => (
              <Typography
                key={item.id}
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
                id={item.id}
              >
                <span>{item.title}</span>
              </Typography>
            ))
          }
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="" onClick={handleLoginClick}>
              <span>Log In</span>
            </Button>
            <Button fullWidth variant="gradient" size="sm" className="" onClick={handleSignUpClick}>
              <span>Sign in</span>
            </Button>
          </div>
        </Collapse>

      </Navbar>

    </div>
  );
}


export default NavbarComponent;

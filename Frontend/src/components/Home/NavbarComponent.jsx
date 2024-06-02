import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Navbar, MobileNav, Typography, Button, IconButton, Collapse } from "@material-tailwind/react";
import navlinks from '../../constants/navlinks';

function NavbarComponent() {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  }
  const handleSignUpClick = () => {
    navigate("/signup");
  }

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  

  return (
    <Navbar className="sticky top-0 h-[10vh] mx-auto w-full rounded-none px-4 lg:px-8 lg:py-4 bg-transparent shadow-none border-none z-30">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900 bg-transparent">
        <Typography as="a" href="#" className="mr-4 cursor-pointer py-1.5 font-bold">
          Cognitive Care
        </Typography>
        <div className="hidden lg:flex">
          <ul className="mb-0 mt-0 flex items-center gap-5">
            {navlinks.map((item) => (
              <Typography
                key={item.id}
                as="a"
                href={`#${item.url}`}
                variant="paragraph"
                className="flex items-center gap-2 font-medium hover:text-blue-500 transition-colors duration-300 scroll-smooth"
              >
                {item.title}
              </Typography>
            ))}
          </ul>
        </div>
        <div className="hidden lg:flex">
          <Button variant="text" className="mr-2" onClick={handleLoginClick}>
            Log In
          </Button>
          <Button variant="gradient" onClick={handleSignUpClick}>
            Sign Up
          </Button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-5 w-5 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </IconButton>
      </div>

      <Collapse open={openNav}>
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
          {navlinks.map((item) => (
            <Typography
              key={item.id}
              as="a"
              href="#"
              variant="small"
              className="flex items-center gap-2 font-normal text-gray-900 hover:text-blue-500 transition-colors duration-300"
            >
              {item.title}
            </Typography>
          ))}
        </ul>
        <Button fullWidth variant="text" size="sm" className="mb-2" onClick={handleLoginClick}>
          Log In
        </Button>
        <Button fullWidth variant="gradient" size="sm" className="mb-2" onClick={handleSignUpClick}>
          Sign Up
        </Button>
      </Collapse>
    </Navbar>
  );
}

export default NavbarComponent;

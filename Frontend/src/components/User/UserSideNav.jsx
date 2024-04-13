import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";

import {
  Home,
  Plus,
  UserRoundCog,
  BookCheck,
  Gamepad2,
  Users,
  CircleUserRound,
  Settings,
  LogOut,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function UserSideNav() {
  const [selected, setSelected] = useState(0); // Initialize with 0 (assuming Home is default)
  const navigate = useNavigate();
  const { logout } = useAuth();

  const sections = [
    {
      title: "Home",
      icon: <Home className="h-5 w-5" />,
      route: "home",
    },
    {
      title: "Create Patient",
      icon: <Plus className="h-5 w-5" />,
      route: "create-patient",
    },
    {
      title: "Manage Patient",
      icon: <UserRoundCog className="h-5 w-5" />,
      route: "manage-patient",
    },
    {
      title: "MMSE Test",
      icon: <BookCheck className="h-5 w-5" />,
      route: "mmse",
    },
    {
      title: "Cognitive Games",
      icon: <Gamepad2 className="h-5 w-5" />,
      route: "game",
    },
    {
      title: "Forum",
      icon: <Users className="h-5 w-5" />,
      route: "forum",
    },
  ];

  const section2 = [
    {
      title: "Profile",
      icon: <CircleUserRound className="h-5 w-5" />,
      route: "profile",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      route: "settings",
    },
  ];

  useEffect(() => {
    const currentRoute = window.location.pathname.split("/").pop(); // Get current route
    const foundIndex = sections.findIndex((item) => item.route === currentRoute);
    if (foundIndex !== -1) {
      setSelected(foundIndex);
    }
  }, [sections]);

  const handleItemClick = (index, route) => {
    setSelected(index);
    navigate(route);
  };

  return (
    <Card className="shadow-xl shadow-blue-gray-900/5 h-full border border-solid border-gray-600">
      <div className="mb-2 p-4 text-center">
        <Typography variant="h5" color="blue-gray">
          Cognitive Care
        </Typography>
      </div>
      <List className="w-auto">
        {sections.map((item, index) => (
          <ListItem
            key={index}
            selected={selected === index}
            onClick={() => handleItemClick(index, item.route)}
          >
            <ListItemPrefix>{item.icon}</ListItemPrefix>
            {item.title}
          </ListItem>
        ))}

        <hr className="my-4 border-t border-gray-400" />

        {section2.map((item, index) => (
          <ListItem
            key={index}
            selected={selected === sections.length + index}
            onClick={() => handleItemClick(sections.length + index, item.route)}
          >
            <ListItemPrefix>{item.icon}</ListItemPrefix>
            {item.title}
          </ListItem>
        ))}

        <ListItem
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <ListItemPrefix>
            <LogOut className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}

export default UserSideNav;

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";

// import Zap from "lucide-react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  HeartIcon,
  PlusCircleIcon,
  CogIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";

import { HomeIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function UserSideNav() {
  const [selected, setSelected] = useState(1);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const { logout } = useAuth();

  return (
    <Card className="shadow-xl shadow-blue-gray-900/5 h-full border border-solid border-gray-600 ">
      <div className="mb-2 p-4 text-center">
        <Typography variant="h5" color="blue-gray">
          Cognitive Care
        </Typography>
      </div>
      <List className="w-auto">
        <ListItem
          selected={selected === 1}
          onClick={() => {
            setSelected(1);
            navigate("home");
          }}
        >
          <ListItemPrefix>
            <HomeIcon className="h-5 w-5" />
          </ListItemPrefix>
          Home
        </ListItem>

        <ListItem selected={expanded} onClick={() => setExpanded(!expanded)}>
          <ListItemPrefix>
            <HeartIcon className="h-5 w-5" />
          </ListItemPrefix>
          Patients
        </ListItem>

        {expanded && (
          <div className="px-3">
            <ListItem
              selected={selected === 2}
              onClick={() => {
                setSelected(2);
                navigate("create-patient");
              }}
            >
              <ListItemPrefix>
                <PlusCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Create Patient
            </ListItem>
            <ListItem
              selected={selected === 3}
              onClick={() => {
                setSelected(3);
                // Handle manage patient action
                navigate("manage-patient");
              }}
            >
              <ListItemPrefix>
                <CogIcon className="h-5 w-5" />
              </ListItemPrefix>
              Manage Patient
            </ListItem>
          </div>
        )}

        {/* Here there is a Chip that can be used to mark the unread chats */}
        <ListItem
          selected={selected === 4}
          onClick={() => {
            setSelected(4);
            navigate("mmse");
          }}
        >
          <ListItemPrefix>
            <AcademicCapIcon className="h-5 w-5" />
          </ListItemPrefix>
          MMSE Test
        </ListItem>
        <ListItem
          selected={selected === 8}
          onClick={() => {
            setSelected(8);
            navigate("game");
          }}
        >
          <ListItemPrefix>
          <AcademicCapIcon className="h-5 w-5" />
          </ListItemPrefix>
          Cognitive Game
        </ListItem>

        {/* Here there is a Chip that can be used to mark the unread chats */}
        <ListItem
          selected={selected === 5}
          onClick={() => {
            setSelected(5);
            navigate("forum");
          }}
        >
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Forums
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>

        <hr class="my-4 border-t border-gray-400" />

        <ListItem
          selected={selected === 6}
          onClick={() => {
            setSelected(6);
            navigate("profile");
          }}
        >
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem
          selected={selected === 7}
          onClick={() => {
            setSelected(7);
            navigate("settings");
          }}
        >
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}

export default UserSideNav;

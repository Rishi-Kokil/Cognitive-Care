import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  HeartIcon,
  PlusCircleIcon,
  CogIcon
} from "@heroicons/react/24/solid";

import { HomeIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function UserSideNav() {
  const [selected, setSelected] = useState(1);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray" >
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
      
        <ListItem
          selected={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          <ListItemPrefix>
            <HeartIcon className="h-5 w-5" />
          </ListItemPrefix>
          Patients
        </ListItem>

        {expanded && (
          <div
            className="px-3"
          >
            <ListItem
              onClick={() => {
                // Handle create patient action
                navigate("create-patient");
              }}
            >
              <ListItemPrefix>
                <PlusCircleIcon className="h-5 w-5" />
              </ListItemPrefix>

              Create Patient
            </ListItem>
            <ListItem
              onClick={() => {
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
        <ListItem selected={selected === 3} onClick={() => {
          setSelected(3);
          navigate("chat")
        }}>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Chat
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <hr class="my-4 border-t border-gray-400" />
        <ListItem selected={selected === 4} onClick={() => {
          setSelected(4)
          navigate('profile')
        }}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem selected={selected === 5} onClick={() => {
          setSelected(5)
          navigate('settings')
        }}>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem onClick={() => {
          navigate("/");
        }}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  )
}

export default UserSideNav;



import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Menu, MenuItem } from "react-pro-sidebar";
import { SubMenu } from "react-pro-sidebar";
import { NavLink, Redirect } from "react-router-dom";
import Star from "@material-ui/icons/StarRounded";
import Person from "@material-ui/icons/PersonRounded";
import firebaseConfig from "../SSO/Config.js";
import { AuthContext, Admins } from "../SSO/Auth";
import api from "../../API/API";

export default function User({ handleToggleSidebar }) {
  const [users, setUsers] = useState([]);
  const [img, setimg] = useState(null);
  const intl = useIntl();
  const { currentUser } = useContext(AuthContext);
  const Admin = currentUser ? Admins(currentUser.email) : false;
  const user = users.find(
    (usr) =>
      usr["email"] === currentUser.email.toUpperCase() ||
      (usr["email"] === currentUser.email.toLowerCase() && usr["email"])
  );
  console.log(user);
  // const img = user && user["image"];
  console.log(img);

  const name = currentUser
    ? currentUser.displayName
    : intl.formatMessage({ id: "welcome" });

  useEffect(() => {
    return async () => {
      await api.getAllUsers().then((user) => {
        setUsers(user.data.data);
      });
    };
  }, []);

  // console.log(currentUser);
  function Userlog() {
    user && setimg(user["image"]);
    if (img !== "" && img !== null) {
      return (
        <img
          src={img}
          alt="User"
          style={{
            alignContent: "center",
            width: "100%",
            height: "100%",
            borderRadius: "55px",
          }}
        />
      );
    } else {
      return <Person className="userPhoto" />;
    }
  }

  return (
    <>
      <Menu iconShape="circle">
        <SubMenu title={name} icon={<Userlog />}>
          {!Admin && (
            <MenuItem icon={<Star />}>
              <NavLink to="/settings" onClick={handleToggleSidebar}>
                {intl.formatMessage({ id: "profile" })}
              </NavLink>
            </MenuItem>
          )}
          {/* <MenuItem>
            <NavLink to="/settings/mainSettings" onClick={handleToggleSidebar}>
              {intl.formatMessage({ id: "settings" })}
            </NavLink>
          </MenuItem> */}
          {/* <MenuItem>{intl.formatMessage({ id: "help" })}</MenuItem> */}
          <MenuItem icon={<Star />}>
            <NavLink to="/Favorites" onClick={handleToggleSidebar}>
              {intl.formatMessage({ id: "Favorites" })}
            </NavLink>
          </MenuItem>
          <MenuItem onClick={() => firebaseConfig.auth().signOut()}>
            {intl.formatMessage({ id: "disconnect" })}
          </MenuItem>
        </SubMenu>
      </Menu>
      {Admin && (
        <Menu iconShape="circle">
          <Menu title={intl.formatMessage({ id: "welcome" }) + name}>
            <MenuItem icon={<Star />}>
              <NavLink to="/Admin" onClick={handleToggleSidebar}>
                {intl.formatMessage({ id: "Stats & Admin" })}
              </NavLink>
            </MenuItem>
          </Menu>
        </Menu>
      )}
    </>
  );
}

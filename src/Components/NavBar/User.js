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
  const intl = useIntl();
  const [users, setUsers] = useState([]);
  const [user, setuser] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const Admin = currentUser ? Admins(currentUser.email) : false;

  useEffect(() => {
    return async () => {
      await api.getAllUsers().then((user) => {
        setUsers(user.data.data);
      });
    };
  });

  function Userlog() {
    const image =
      user && user["image"]
        ? user["image"]
        : currentUser && currentUser.photoURL
        ? currentUser.photoURL
        : "";
    if (image) {
      return (
        <img
          src={image}
          alt="User"
          style={{
            alignContent: "center",
            width: "100%",
            height: "100%",
            borderRadius: "55px",
          }}
        />
      );
    } else return <Person className="userPhoto" />;
  }

  return (
    <>
      <Menu iconShape="circle">
        <SubMenu
          title={currentUser ? currentUser.displayName : "User"}
          icon={<Userlog />}
        >
          {!Admin && (
            <MenuItem icon={<Star />}>
              <NavLink to="/settings" onClick={handleToggleSidebar}>
                {intl.formatMessage({ id: "profile" })}
              </NavLink>
            </MenuItem>
          )}
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
          <Menu title={intl.formatMessage({ id: "welcome" })}>
            <MenuItem icon={<Star />}>
              <NavLink to="/Admin" onClick={handleToggleSidebar}>
                {intl.formatMessage({ id: "Administrator" })}
              </NavLink>
            </MenuItem>
          </Menu>
        </Menu>
      )}
    </>
  );
}

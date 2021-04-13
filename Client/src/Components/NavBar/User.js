import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { Menu, MenuItem } from "react-pro-sidebar";
import { SubMenu } from "react-pro-sidebar";
import { NavLink, Redirect } from "react-router-dom";
import Star from "@material-ui/icons/StarRounded";
import Person from "@material-ui/icons/PersonRounded";
import firebaseConfig from "../SSO/Config.js";
import { AuthContext, Admins } from "../SSO/Auth";

export default function User({ handleToggleSidebar }) {
  const intl = useIntl();
  const { currentUser } = useContext(AuthContext);
  const Admin = currentUser ? Admins(currentUser.email) : false;
  const photo = currentUser ? currentUser.photoURL : "";
  const name = currentUser
    ? currentUser.displayName
    : intl.formatMessage({ id: "welcome" });

  console.log(currentUser);
  function Userlog() {
    if (photo !== "" && photo !== null) {
      return (
        <img
          src={photo}
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
              <NavLink
                to="/settings/userSettings"
                onClick={handleToggleSidebar}
              >
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
          <MenuItem onClick={() => firebaseConfig.auth().signOut()}>
            {intl.formatMessage({ id: "disconnect" })}
          </MenuItem>
        </SubMenu>
      </Menu>
      {Admin && (
        <Menu iconShape="circle">
          <Menu title={intl.formatMessage({ id: "welcome" }) + name}>
            <MenuItem icon={<Star />}>
              <NavLink
                to="/settings/userSettings"
                onClick={handleToggleSidebar}
              >
                {intl.formatMessage({ id: "Administrator" })}
              </NavLink>
            </MenuItem>
          </Menu>
        </Menu>
      )}
    </>
  );
}

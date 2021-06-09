import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { Menu, MenuItem } from "react-pro-sidebar";
import { SubMenu } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import Star from "@material-ui/icons/StarRounded";
import Person from "@material-ui/icons/PersonRounded";
import firebaseConfig from "../SSO/Config.js";
import { AuthContext, Admins } from "../SSO/Auth";
import Switch from "react-switch";

export default function User({
  handleToggleSidebar,
  setLocale,
  locale,
  user,
  setUser,
  name,
  setName,
  image,
  setImage,
}) {
  const intl = useIntl();
  const { currentUser } = useContext(AuthContext);
  const Admin = currentUser ? Admins(currentUser.email) : false;
  function UserLogo() {
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
          title={name ? name : currentUser?.displayName}
          icon={<UserLogo />}
        >
          {!Admin && (
            <>
              <MenuItem icon={<Star />}>
                <NavLink to="/settings" onClick={handleToggleSidebar}>
                  {intl.formatMessage({ id: "profile" })}
                </NavLink>
              </MenuItem>
              <MenuItem icon={<Star />}>
                <NavLink to="/Favorites" onClick={handleToggleSidebar}>
                  {intl.formatMessage({ id: "Favorites" })}
                </NavLink>
              </MenuItem>
            </>
          )}

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

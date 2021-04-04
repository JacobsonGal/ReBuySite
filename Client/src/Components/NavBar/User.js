import React from "react";
import { useIntl } from "react-intl";
import { Menu, MenuItem } from "react-pro-sidebar";
import { SubMenu } from "react-pro-sidebar";
import { NavLink, Redirect } from "react-router-dom";
import Star from "@material-ui/icons/StarRounded";
import Person from "@material-ui/icons/PersonRounded";
import firebaseConfig from "../SSO/Config.js";

export default function User({ handleToggleSidebar }) {
  const intl = useIntl();
  // const userData = useSelector((state) => state.airTableData.userData);
  const userData = null;
  const photo = userData
    ? userData[0]?.fields?.Picture[0].thumbnails.full.url
    : "";
  const name = userData ? userData[0]?.fields?.["First name"] : "";
  const Admin = userData ? userData["Admin"] : true;

  function Userlog() {
    if (photo !== "") {
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
        <SubMenu
          title={intl.formatMessage({ id: "welcome" }) + name}
          icon={<Userlog />}
        >
          <MenuItem icon={<Star />}>
            <NavLink to="/settings/userSettings" onClick={handleToggleSidebar}>
              {intl.formatMessage({ id: "profile" })}
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/settings/mainSettings" onClick={handleToggleSidebar}>
              {intl.formatMessage({ id: "settings" })}
            </NavLink>
          </MenuItem>
          <MenuItem>{intl.formatMessage({ id: "help" })}</MenuItem>
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

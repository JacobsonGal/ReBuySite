import React from "react";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { Menu, MenuItem } from "react-pro-sidebar";
import { SubMenu } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import Star from "@material-ui/icons/StarRounded";
import Person from "@material-ui/icons/PersonRounded";

export default function User({ handleToggleSidebar }) {
  const intl = useIntl();
  const userData = useSelector((state) => state.airTableData.userData);
  const photo = userData
    ? userData[0]?.fields?.Picture[0].thumbnails.full.url
    : "";
  const name = userData ? userData[0]?.fields?.["First name"] : "";

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
      //   return <img src={account} alt="User" className="userPhoto" />;
      return <Person className="userPhoto" />;
    }
  }

  return (
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
        <MenuItem>
          {/* <a href="https://yavo.app/contact-us/" onClick={handleToggleSidebar}> */}
          {intl.formatMessage({ id: "help" })} {/* </a> */}
        </MenuItem>
        <MenuItem>
          {/* <a href="https://yavo.app/" onClick={handleToggleSidebar}> */}
          {intl.formatMessage({ id: "disconnect" })} {/* </a> */}
        </MenuItem>
      </SubMenu>
    </Menu>
  );
}
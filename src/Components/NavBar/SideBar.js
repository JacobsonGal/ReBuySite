import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import sidebarBg from "../../Assets/bg1.jpg";
import { NavLink } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SubMenu,
} from "react-pro-sidebar";
import logo from "../../Assets/ReBuy.jpeg";
import Home from "@material-ui/icons/HomeRounded";
import Map from "@material-ui/icons/MapRounded";
import Category from "@material-ui/icons/CategoryRounded";
import Star from "@material-ui/icons/StarRounded";

import TopBar from "./TopBar";
import User from "./User";

export default function SideBar({
  image,
  collapsed,
  rtl,
  toggled,
  email,
  handleToggleSidebar,
  handleCollapsedChange,
  handleRtlChange,
  handleImageChange,
  setSeen,
  notificationCount,
  setNotificationCount,
  setLoading,
}) {
  const intl = useIntl();
  return (
    <div className="sideBar">
      <ProSidebar
        image={image ? sidebarBg : false}
        rtl={rtl}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <TopBar
            toggled={toggled}
            handleToggleSidebar={handleToggleSidebar}
            notificationCount={notificationCount}
            setNotificationCount={setNotificationCount}
            main={false}
          />
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<Home />}>
              <NavLink to="/" onClick={handleToggleSidebar}>
                {intl.formatMessage({ id: "Home" })}
              </NavLink>
            </MenuItem>
            <MenuItem icon={<Map />}>
              <NavLink to="/Map" onClick={handleToggleSidebar}>
                {intl.formatMessage({ id: "Map" })}
              </NavLink>
            </MenuItem>
            <MenuItem icon={<Star />}>
              <NavLink to="/Favorite" onClick={handleToggleSidebar}>
                {intl.formatMessage({ id: "Favorite" })}
              </NavLink>
            </MenuItem>
            <SubMenu
              title={intl.formatMessage({ id: "Catagories" })}
              icon={<Category />}
            >
              <MenuItem>Clothes</MenuItem>
              <MenuItem>Tech</MenuItem>
              <MenuItem>Music</MenuItem>
              <MenuItem>Gadgets</MenuItem>
            </SubMenu>
          </Menu>
          <User handleToggleSidebar={handleToggleSidebar} />
        </SidebarContent>
        <SidebarFooter className="sideBarFooter">
          <div className="sidebar-btn-wrapper">
            <a
              iconShape="circle"
              href="https://www.facebook.com/ReBuy"
              className="sidebar-btn"
            >
              <span>
                {"    ReBuy "} {new Date().getFullYear()}
                {"  "}
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    width: "1rem",
                    height: "1rem",
                    filter: "grayscale(100%)",
                    opacity: "0.9",
                  }}
                />
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
}

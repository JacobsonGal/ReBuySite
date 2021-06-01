import React from "react";
import { useIntl } from "react-intl";
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
import Upload from "@material-ui/icons/ArrowUpwardRounded";
import Instagram from "@material-ui/icons/Instagram";
import Facebook from "@material-ui/icons/Facebook";
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
        // image={image ? sidebarBg : false}
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
            <MenuItem icon={<Upload />}>
              <NavLink to="/Upload" onClick={handleToggleSidebar}>
                {intl.formatMessage({ id: "Upload" })}
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
              href="https://www.facebook.com/ReBuyPlatform"
              className="sidebar-btn"
            >
              <span>
                {"    ReBuy "} {new Date().getFullYear()}
                {"  "}
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    filter: "grayscale(100%)",
                    opacity: "0.9",
                  }}
                />
                <Facebook />
                <Instagram />
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
}

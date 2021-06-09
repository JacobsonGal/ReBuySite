import React from "react";
import { useIntl } from "react-intl";

import { useHistory, NavLink } from "react-router-dom";
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
import Upload from "@material-ui/icons/ArrowUpwardRounded";
import Facebook from "@material-ui/icons/Facebook";
import TopBar from "./TopBar";
import User from "./User";

export default function SideBar({
  sideBarImage,
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
  setLocale,
  locale,
  user,
  setUser,
  name,
  setName,
  image,
  setImage,
}) {
  const history = useHistory();
  const intl = useIntl();

  const categoryArray = [
    [intl.formatMessage({ id: "Sport" }), "Sport"],
    [intl.formatMessage({ id: "Clothing" }), "Clothing"],
    [intl.formatMessage({ id: "Electricity" }), "Electricity"],
    [intl.formatMessage({ id: "Underwear" }), "Underwear"],
    [intl.formatMessage({ id: "Swimwear" }), "Swimwear"],
    [intl.formatMessage({ id: "Homecare" }), "Homecare"],
    [intl.formatMessage({ id: "Plants" }), "Plants"],
    [intl.formatMessage({ id: "Activewear" }), "Activewear"],
    [intl.formatMessage({ id: "Jewlery" }), "Jewlery"],
    [intl.formatMessage({ id: "Other" }), "Other"],
  ];

  return (
    <div className="sideBar">
      <ProSidebar
        // image={sideBarImage ? sideBarImage : false}
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
              {categoryArray.map((cat) => (
                <MenuItem
                  onClick={() => {
                    history.push(`/categories/${cat[1]}`);
                    handleToggleSidebar();
                  }}
                >
                  {cat[0]}
                </MenuItem>
              ))}
            </SubMenu>
          </Menu>

          <User
            handleToggleSidebar={handleToggleSidebar}
            setLocale={setLocale}
            locale={locale}
            user={user}
            setUser={setUser}
            name={name}
            setName={setName}
            image={image}
            setImage={setImage}
          />
        </SidebarContent>
        <SidebarFooter className="sideBarFooter">
          <div
            className="sidebar-btn-wrapper"
            style={{ flexDirection: "column" }}
          >
            <Menu iconShape="circle" className="lng">
              <MenuItem
                icon={
                  locale === "he" ? (
                    <img
                      src="https://www.freeiconspng.com/uploads/israel-flag-icon-1.png"
                      alt="israel"
                      style={{ width: "80%" }}
                    />
                  ) : (
                    <img
                      src="https://www.freeiconspng.com/uploads/us-flag-icon-13.png"
                      alt="usa"
                      style={{ width: "100%" }}
                    />
                  )
                }
                onClick={() => setLocale(locale === "he" ? "en" : "he")}
              >
                {intl.formatMessage({ id: "Language" })}
              </MenuItem>
            </Menu>
            <a
              iconShape="circle"
              href="https://www.facebook.com/ReBuyPlatform"
              className="sidebar-btn"
            >
              <span>
                <Facebook />
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
                {/* <Instagram /> */}
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { fetchNotificationData } from "./Redux/actions/userDataActions";
import SideBar from "./Components/NavBar/SideBar";
import LoadingOverlay from "react-loading-overlay";
import Icon from "./Assets/Logo/ReBuyLogoTrans.png";

import Home from "./Components/Pages/Home/Home";
import Map from "./Components/Pages/Map/Map";
import Favorites from "./Components/Pages/Favorites/Favorites";
import MainSettings from "./Components/Pages/Settings/MainSettings";
import UserSettings from "./Components/Pages/Settings/ProfileSettings";
import ProductInsert from "./Components/Pages/Home/Create";
import ProductUpload from "./Components/Pages/Home/Update";

export default function Layout({ setLocale, setActive, isActive }) {
  const intl = useIntl();
  const [rtl, setRtl] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(false);
  const [toggled, setToggled] = useState(true);
  const [title, setTitle] = useState("ReBuy");
  const [notificationData, setnotificationData] = useState();
  const count = notificationData ? notificationData.length : 0;
  const [notificationCount, setNotificationCount] = useState(count);

  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const handleRtlChange = (checked) => {
    setRtl(checked);
    setLocale(checked ? "he" : "en");
  };
  const handleImageChange = (checked) => {
    setImage(checked);
  };

  const handleToggleSidebar = () => {
    setToggled(!toggled);
  };
  return (
    <LoadingOverlay
      active={false}
      fadeSpeed={10000}
      spinner={
        <div
          style={{
            animation: "spin 1.5s linear infinite",
          }}
        >
          <img src={Icon} alt={"Icon"} style={{ width: "30%" }} />
        </div>
      }
      styles={{
        wrapper: {},
        overlay: (base) => ({
          ...base,
          backgroundColor: "#f1f7fb",
          opacity: "0.9",
          height: "100%",
          position: "fixed",
        }),
      }}
    >
      <BrowserRouter>
        <Switch>
          <div
            className={`app ${rtl ? "rtl" : ""} ${toggled ? "toggled" : ""}`}
          >
            <div className="main-container">
              <div className="sideBar">
                <SideBar
                  image={image}
                  collapsed={collapsed}
                  rtl={rtl}
                  toggled={toggled}
                  handleToggleSidebar={handleToggleSidebar}
                  handleCollapsedChange={handleCollapsedChange}
                  handleRtlChange={handleRtlChange}
                  handleImageChange={handleImageChange}
                  notificationCount={notificationCount}
                  setNotificationCount={setNotificationCount}
                  setLoading={setActive}
                  loading={isActive}
                />
              </div>
              <MobileBar
                handleToggleSidebar={handleToggleSidebar}
                notificationCount={notificationCount}
                setNotificationCount={setNotificationCount}
              />
              <div className={`mainPage ${toggled ? "toggled" : ""}`}>
                <Route exact path="/">
                  <Home
                    title={intl.formatMessage({ id: "Home" })}
                    setTitle={setTitle}
                    setActive={setActive}
                  />
                </Route>
                <Route exact path="/Map">
                  <Map
                    title={intl.formatMessage({ id: "Map" })}
                    setTitle={setTitle}
                    setActive={setActive}
                  />
                </Route>
                <Route exact path="/Upload">
                  <ProductInsert
                    title={intl.formatMessage({ id: "Upload" })}
                    setTitle={setTitle}
                    setActive={setActive}
                  />
                </Route>
                <Route path="/Update/:id">
                  <ProductUpload
                    title={intl.formatMessage({ id: "Update" })}
                    setTitle={setTitle}
                    setActive={setActive}
                  />
                </Route>
                <Route exact path="/Favorites">
                  <Favorites
                    title={intl.formatMessage({ id: "Favorites" })}
                    setTitle={setTitle}
                    setActive={setActive}
                  />
                </Route>
                <Route exact path="/settings/userSettings">
                  <UserSettings
                    title={intl.formatMessage({ id: "profile" })}
                    setTitle={setTitle}
                  />
                </Route>
                <Route exact path="/settings/mainSettings">
                  <MainSettings
                    title={intl.formatMessage({ id: "settings" })}
                    setTitle={setTitle}
                  />
                </Route>
              </div>
            </div>
          </div>
        </Switch>
      </BrowserRouter>
      {setActive(false)}
    </LoadingOverlay>
  );
}

function MobileBar({
  handleToggleSidebar,
  notificationCount,
  setNotificationCount,
}) {
  function notificationHandle() {
    if (notificationCount > 0)
      return (
        <span
          class="notification-count"
          style={{
            backgroundColor: "red",
            borderRadius: "500px",
            padding: "2px 4px",
            fontSize: "10px",
            fontWeight: "700",
            lineHeight: "100%",
            right: "-15px",
            top: "5px",
          }}
        >
          {notificationCount}
        </span>
      );
  }

  return (
    <div className="toggledBar">
      <table width="100%">
        <tr width="100%">
          <td width="10%">
            <div className="btn-toggle" onClick={handleToggleSidebar}>
              <div class="wrapper-menu">
                <div class="line-menu half start" />
                <div class="line-menu" />
                <div class="line-menu half end" />
              </div>
            </div>
          </td>
          <td width="80%">
            <Link to="/">
              <div className="logodiv">
                <img className="yavologo" src={Icon} alt="logo" />
              </div>
            </Link>
          </td>
          <td width="10%">
            <Link to="/notification">
              <div class="notification notify">
                {notificationHandle}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ADAFDE"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </div>
            </Link>
          </td>
        </tr>
      </table>
    </div>
  );
}

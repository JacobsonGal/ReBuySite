import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useIntl } from "react-intl";
import SideBar from "./Components/NavBar/SideBar";
import MobileBar from "./Components/NavBar/MobileBar";
import LoadingOverlay from "react-loading-overlay";
import Icon from "./Assets/Images/ReBuyLogoTrans.png";
import Home from "./Components/Pages/Home/Home";
import Map from "./Components/Pages/Map/Map";
import Favorites from "./Components/Pages/Favorites/Favorites";
import MainSettings from "./Components/Pages/Settings/MainSettings";
import UserSettings from "./Components/Pages/Settings/ProfileSettings";
import ProductInsert from "./Components/Pages/Home/Create";
import ProductUpload from "./Components/Pages/Home/Update";
import Login from "./API/Firebase";
import firebase from "firebase/app";
import { isSignIn } from "./App";

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
                {!isSignIn() ? (
                  <Route exact path="/">
                    <Login />
                  </Route>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </Switch>
      </BrowserRouter>
      {setActive(false)}
    </LoadingOverlay>
  );
}

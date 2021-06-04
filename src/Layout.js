import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { useIntl } from "react-intl";
import SideBar from "./Components/NavBar/SideBar";
import MobileBar from "./Components/NavBar/MobileBar";
import LoadingOverlay from "react-loading-overlay";
import Icon from "./Assets/Images/ReBuyLogoTrans.png";
import Categories from "./Components/Pages/Categories/Categories";
import Home from "./Components/Pages/Home/Home";
import Notifications from "./Components/Pages/Chat/Notifications";
import Map from "./Components/Pages/Map/Map";
import Admin from "./Components/Pages/Admin/Admin";
import Favorites from "./Components/Pages/Favorites/Favorites";
import ProfileSettings from "./Components/Pages/Settings/ProfileSettings";
import ProductInsert from "./Components/Pages/Home/Create";
import ProductUpload from "./Components/Pages/Home/Update";
import { AuthContext } from "./Components/SSO/Auth";
import Registration from "./Components/SSO/Registration";
import api from "./API/API";
import Chat from "./Components/Pages/Chat/chat";
import SellerRoom from "./Components/Pages/Chat/SellerRoom";

export default function Layout({ locale, setLocale, setActive, isActive }) {
  const intl = useIntl();
  const [rtl, setRtl] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(false);
  const [toggled, setToggled] = useState(true);
  const [title, setTitle] = useState("ReBuy");
  const [notificationData, setnotificationData] = useState();
  const count = notificationData ? notificationData.length : 0;
  const [notificationCount, setNotificationCount] = useState(count);
  const { currentUser } = useContext(AuthContext);

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
      active={isActive}
      fadeSpeed={1000}
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
      {isActive || currentUser ? (
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
                    setLocale={setLocale}
                    locale={locale}
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
                      intl={intl}
                    />
                  </Route>
                  <Route exact path="/Notifications">
                    <Notifications
                      title={intl.formatMessage({ id: "Notifications" })}
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
                  {/* <Route exact path="/admin">
                    <Admin />
                  </Route> */}
                  <Route exact path="/Upload">
                    <ProductInsert
                      title={intl.formatMessage({ id: "Upload" })}
                      setTitle={setTitle}
                      setActive={setActive}
                      intl={intl}
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
                  <Route path="/Categories/:id">
                    <Categories
                      title={"Categories"}
                      setTitle={setTitle}
                      setActive={setActive}
                    />
                  </Route>
                  <Route exact path="/Admin">
                    <Admin
                      title={intl.formatMessage({ id: "profile" })}
                      setTitle={setTitle}
                    />
                  </Route>
                  <Route exact path="/settings">
                    <ProfileSettings
                      title={intl.formatMessage({ id: "profile" })}
                      setTitle={setTitle}
                    />
                  </Route>
                  <Route exact path="/:sellerId/:description/:secondaryId">
                    <Chat />
                  </Route>
                  <Route exact path="/chat/:sellerId/:product/:currentId">
                    <SellerRoom />
                  </Route>
                  {/* </>
                )} */}
                </div>
              </div>
            </div>
          </Switch>
        </BrowserRouter>
      ) : (
        <div className={`app ${rtl ? "rtl" : ""} ${toggled ? "toggled" : ""}`}>
          <div className="main-container">
            <div className={`mainPage ${toggled ? "toggled" : ""}`}>
              <Registration />
            </div>
          </div>
        </div>
      )}

      {setActive(false)}
    </LoadingOverlay>
  );
}

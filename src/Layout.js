import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
  const [sideBarImage, setSideBarImage] = useState(false);
  const [toggled, setToggled] = useState(true);
  const [title, setTitle] = useState("ReBuy");
  const [notificationCount, setNotificationCount] = useState(0);
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function use() {
      if (currentUser) {
        if (!user || user.uid !== currentUser.uid) {
          let response = await api.getUserById(
            currentUser?.email.toUpperCase()
          );
          if (!response)
            response = await api.getUserById(currentUser?.email.toLowerCase());
          setUser(response.data.data);
          setName(
            user
              ? user["name"]
              : currentUser && currentUser.displayName
              ? currentUser.displayName
              : intl.formatMessage({ id: "welcome" })
          );
          setImage(
            user
              ? user["image"]
              : currentUser && currentUser.photoURL
              ? currentUser.photoURL
              : null
          );
        } else {
          !name &&
            setName(
              user
                ? user["name"]
                : currentUser && currentUser.displayName
                ? currentUser.displayName
                : intl.formatMessage({ id: "welcome" })
            );
          !image &&
            setImage(
              user
                ? user["image"]
                : currentUser && currentUser.photoURL
                ? currentUser.photoURL
                : null
            );
        }
      }
    }
    use();
  }, [user, name, image, currentUser, intl]);

  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const handleRtlChange = (checked) => {
    setRtl(checked);
    setLocale(checked ? "he" : "en");
  };
  const handleImageChange = (checked) => {
    setSideBarImage(checked);
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
                    sideBarImage={sideBarImage}
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
                    user={user}
                    setUser={setUser}
                    name={name}
                    setName={setName}
                    image={image}
                    setImage={setImage}
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
                      user={user}
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
                      user={user}
                      setUser={setUser}
                      name={name}
                      setName={setName}
                      image={image}
                      setImage={setImage}
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

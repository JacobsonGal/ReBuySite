import React, { useEffect } from "react";
import { IoNotifications, IoLogoBuffer, IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";
import { css, jsx } from "@emotion/react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationData } from "../../Redux/actions/userDataActions";
import { FaBars } from "react-icons/fa";
import logo from "../../Assets/ReBuy.jpeg";

const TopBar = ({
  handleToggleSidebar,
  notificationCount,
  setNotificationCount,
}) => {
  const dispatch = useDispatch();
  const notificationData = useSelector(
    (state) => state.airTableData.Notification
  );
  useEffect(() => {
    if (!notificationData) {
      dispatch(fetchNotificationData());
    }
  });
  const count = notificationData ? notificationData.length : null;
  // setNotificationCount(count);
  function notificationHandler() {
    // if (count > 0 || notificationCount>0)
    console.log(notificationCount);
    if (notificationCount > 0)
      return <span class="notification-count">{notificationCount}</span>;
    else return null;
  }

  return (
    <div className="topBar" onLoad={handleToggleSidebar}>
      <div className="logodiv">
        <Link to="/" onClick={handleToggleSidebar}>
          <img className="yavologo" src={logo} alt="logo" />
        </Link>
      </div>

      <div className="tabs">
        <div className="icons">
          <Link to="/notification" onClick={handleToggleSidebar}>
            <div class="notification-box">
              {notificationHandler}
              <div class="notification-bell">
                <span class="bell-top"></span>
                <span class="bell-middle"></span>
                <span class="bell-bottom"></span>
                <span class="bell-rad"></span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

{
  /* <div className="title">
        <h1 className="titleh1">Yavo</h1>
        <Button to="/" className="titlefast" onClick={isCollapsed}>
          Yavo
        </Button>
      </div> */
}

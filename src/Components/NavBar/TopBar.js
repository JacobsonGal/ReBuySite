import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/ReBuy.jpeg";
import { FaInbox } from "react-icons/fa";

const TopBar = ({
  handleToggleSidebar,
  notificationCount,
  setNotificationCount,
}) => {
  // const dispatch = useDispatch();
  // const notificationData = useSelector(
  //   (state) => state.airTableData.Notification
  // );
  // useEffect(() => {
  //   if (!notificationData) {
  //     dispatch(fetchNotificationData());
  //   }
  // });
  // const count = notificationData ? notificationData.length : null;
  // setNotificationCount(count);
  function notificationHandler() {
    // if (count > 0 || notificationCount>0)
    // console.log(notificationCount);
    if (notificationCount > 0)
      return <span class="notification-count">{notificationCount}</span>;
    else return 0;
  }

  return (
    <div className="topBar" onLoad={handleToggleSidebar}>
      <div className="logodiv">
        <Link to="/" onClick={handleToggleSidebar}>
          <img className="yavologo" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="rebuy">ReBuy</div>
      <div className="tabs">
        <div className="icons">
          <Link
            to="/Notifications"
            //  to={`/${product["ownerId"]}/${product["description"]} / ${product["seconderyId"]}`}
            onClick={handleToggleSidebar}
          >
            <div class="notification-box">
              <FaInbox
                color="white"
                size="40px"
                style={{ curser: "pointer" }}
              />
              {notificationHandler}
              {/* <div class="notification-bell">
                <span class="bell-top"></span>
                <span class="bell-middle"></span>
                <span class="bell-bottom"></span>
                <span class="bell-rad"></span>
              </div> */}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

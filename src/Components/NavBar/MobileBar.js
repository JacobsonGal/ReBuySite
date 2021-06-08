import { Link } from "react-router-dom";
import Icon from "../../Assets/Images/ReBuyLogoTrans.png";
import { FaInbox } from "react-icons/fa";

export default function MobileBar({
  handleToggleSidebar,
  notificationCount,
  setNotificationCount,
}) {
  // function notificationHandle() {
  //   if (notificationCount > 0)
  //     return (
  //       <span
  //         class="notification-count"
  //         style={{
  //           backgroundColor: "red",
  //           borderRadius: "500px",
  //           padding: "2px 4px",
  //           fontSize: "10px",
  //           fontWeight: "700",
  //           lineHeight: "100%",
  //           right: "-15px",
  //           top: "5px",
  //         }}
  //       >
  //         {notificationCount}
  //       </span>
  //     );
  // }

  return (
    <div className="toggledBar">
      <div className="toggledBar-notch" />
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
            <Link to="/Notifications">
              <FaInbox color="#adafde" size="25px" />
              {/* <div class="notification notify">
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
              </div> */}
            </Link>
          </td>
        </tr>
      </table>
    </div>
  );
}

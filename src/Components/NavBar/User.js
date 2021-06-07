import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Menu, MenuItem } from "react-pro-sidebar";
import { SubMenu } from "react-pro-sidebar";
import { NavLink, Redirect } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import Star from "@material-ui/icons/StarRounded";
import Person from "@material-ui/icons/PersonRounded";
import firebaseConfig from "../SSO/Config.js";
import { AuthContext, Admins } from "../SSO/Auth";
import api from "../../API/API";
import Switch from "react-switch";

export default function User({
  handleToggleSidebar,
  setLocale,
  locale,
  user,
  setUser,
  name,
  setName,
  image,
  setImage,
}) {
  const intl = useIntl();
  const { currentUser } = useContext(AuthContext);
  const Admin = currentUser ? Admins(currentUser.email) : false;
  // const [user, setUser] = useState(null);
  // const [name, setName] = useState(null);
  // const [image, setImage] = useState(null);

  // useEffect(() => {
  //   async function use() {
  //     if (!user) {
  //       let response = await api.getUserById(currentUser?.email.toUpperCase());
  //       if (!response)
  //         response = await api.getUserById(currentUser?.email.toLowerCase());
  //       console.log(response.data.data);
  //       setUser(response.data.data);
  //     } else {
  //       console.log(user);
  //       !name &&
  //         setName(
  //           user
  //             ? user["name"]
  //             : currentUser && currentUser.displayName
  //             ? currentUser.displayName
  //             : intl.formatMessage({ id: "welcome" })
  //         );
  //       !image &&
  //         setImage(
  //           user
  //             ? user["image"]
  //             : currentUser && currentUser.photoURL
  //             ? currentUser.photoURL
  //             : null
  //         );
  //     }
  //   }
  //   use();
  // }, [user, setUser, name, setName, image, setImage, currentUser, intl]);

  function UserLogo() {
    if (image) {
      return (
        <img
          src={image}
          alt="User"
          style={{
            alignContent: "center",
            width: "100%",
            height: "100%",
            borderRadius: "55px",
          }}
        />
      );
    } else return <Person className="userPhoto" />;
  }

  return (
    <>
      <Menu iconShape="circle">
        <SubMenu
          title={name ? name : currentUser?.displayName}
          icon={<UserLogo />}
        >
          {!Admin && (
            <>
              <MenuItem icon={<Star />}>
                <NavLink to="/settings" onClick={handleToggleSidebar}>
                  {intl.formatMessage({ id: "profile" })}
                </NavLink>
              </MenuItem>
              <MenuItem icon={<Star />}>
                <NavLink to="/Favorites" onClick={handleToggleSidebar}>
                  {intl.formatMessage({ id: "Favorites" })}
                </NavLink>
              </MenuItem>
            </>
          )}
          <MenuItem icon={<Star />}>
            {intl.formatMessage({ id: "Language" })}
            {"    |  "}
            <Switch
              height={10}
              width={30}
              checkedIcon={true}
              uncheckedIcon={true}
              onChange={() => setLocale(locale === "he" ? "en" : "he")}
              checked={locale === "he" ? true : false}
              onColor="#219de9"
              offColor="#bbbbbb"
            />
          </MenuItem>
          <MenuItem onClick={() => firebaseConfig.auth().signOut()}>
            {intl.formatMessage({ id: "disconnect" })}
          </MenuItem>
        </SubMenu>
      </Menu>
      {Admin && (
        <Menu iconShape="circle">
          <Menu title={intl.formatMessage({ id: "welcome" })}>
            <MenuItem icon={<Star />}>
              <NavLink to="/Admin" onClick={handleToggleSidebar}>
                {intl.formatMessage({ id: "Administrator" })}
              </NavLink>
            </MenuItem>
          </Menu>
        </Menu>
      )}
    </>
  );
}

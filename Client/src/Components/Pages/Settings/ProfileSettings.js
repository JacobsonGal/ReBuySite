import React, { useState, useContext } from "react";
import { AuthContext, Admins } from "../../SSO/Auth";
import { useIntl } from "react-intl";
import MediaQuery from "react-responsive";
import { Form, Card, Dropdown } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import Person from "@material-ui/icons/PersonRounded";
import { Avatar } from "@material-ui/core";

export default function ProfileSetting({ title, setTitle }) {
  const { currentUser } = useContext(AuthContext);
  const Admin = currentUser ? Admins(currentUser.email) : false;
  const photo = currentUser ? currentUser.photoURL : Person;
  const name = currentUser ? currentUser.displayName : "User Name";
  const email = currentUser ? currentUser.email : "Email";

  return (
    <>
      {Admin ? (
        <iframe
          src="http://localhost:4200"
          title="Admin"
          style={{
            width: "102%",
            height: "102%",
            margin: "-5px",
            marginRight: "-1.5rem",
          }}
        />
      ) : (
        <Card className="userSettings">
          <Card.Header className="userHeader">
            {/* <Card.Img
              style={{
                alignSelf: window.screen.width <= 800 ? "right" : "center",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
              variant="top"
              src={<Person className="userPhoto" />}
            /> */}
            <Avatar
              style={{
                alignSelf: window.screen.width <= 800 ? "right" : "center",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
            />
            {/* <Person className="userPhoto" /> */}
            <Card.Title
              style={{
                margin: "1rem",
                width: "80%",
                color: "#147764",
                alignSelf: "center",
              }}
            >
              {name}
            </Card.Title>
            <Card.Subtitle>{email}</Card.Subtitle>
          </Card.Header>
          <Card.Body style={{ alignItems: "center" }}>
            <h1>My Products</h1>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

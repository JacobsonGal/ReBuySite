import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import Page from "../../Utils/Page";
import MediaQuery from "react-responsive";
import { Form, Card, Dropdown } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

export default function ProfileSetting({ title, setTitle }) {
  const [editMode, setEditMode] = useState(false);
  const intl = useIntl();
  const userData = useSelector((state) => state.airTableData.userData);
  const photo = userData
    ? userData[0].fields.Picture[0].thumbnails.full.url
    : "";
  const firstName = userData ? userData[0].fields["First name"] : "";
  const lastName = userData ? userData[0].fields["Last name"] : "";
  const fullName = userData ? userData[0].fields["Full Name"] : "";
  const email = userData ? userData[0].fields["Email"] : "";
  const phone = userData ? userData[0].fields["Phone"] : "";
  const address = userData ? userData[0].fields["Address"] : "";
  const id = userData ? userData[0].id : "";
  // const plan = userData ? userData[0].fields["Plan"] : "";
  const plan = userData ? (
    <div style={{ marginTop: "1rem" }}>
      <span
        className="page-btn"
        style={{
          backgroundColor: Color(userData[0].fields["Plan"]),
          margin: "5px",
          borderRadius: "15px",
          padding: "3px",
        }}
      >
        {`✨${userData[0].fields["Plan"]}✨`}
      </span>
    </div>
  ) : (
    ""
  );
  const dataArray = [
    { name: "אימייל", data: email, dontEdit: true, dataBase: "Email" },
    { name: "שם פרטי", data: firstName, dataBase: "First name" },
    { name: "שם משפחה", data: lastName, dataBase: "Last name" },
    { name: "טלפון", data: phone, dataBase: "Phone" },
    { name: "כתובת", data: address, dataBase: "Address" },
    // { name: "מסלול", data: plan, dontEdit: true, dataBase: "Plan" },
  ];
  function Color(p) {
    switch (p) {
      case "מסלול חינם":
        return "rgba(0, 230, 255, 1)";
      case "מסלול מנוהל":
        return "rgba(0, 230, 255, 0.5)";
      case "מסלול לעסקים":
        return "gold";
      default:
        return "transperent";
    }
  }
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{ flexDirection: "row" }}
    >
      <HiDotsVertical size="2rem" color="#848484" />
      {children}
    </a>
  ));
  return (
    <Card className="userSettings">
      <Card.Header className="userHeader">
        <Card.Img
          style={{
            alignSelf: window.screen.width <= 800 ? "right" : "center",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
          }}
          variant="top"
          src={photo}
        />
        <Card.Title
          style={{
            margin: "1rem",
            width: "80%",
            color: "#147764",
            alignSelf: "center",
          }}
        >
          {fullName}
          <Card.Subtitle>{plan}</Card.Subtitle>
          <MediaQuery minWidth={800}>
            <div
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              <a
                onClick={() => setEditMode((x) => !x)}
                // disabled={props.editdisabled}
                // onClick={editHandler}

                style={{
                  padding: "5px",
                  borderRadius: "35px",
                  fontSize: "15px",
                  backgroundColor: "#ececec",
                  // width: "100%",
                  textAlign: "center",
                  color: "black",
                }}
              >
                <FaPencilAlt style={{ padding: "2px" }} />
                ערוך
              </a>{" "}
            </div>
          </MediaQuery>
        </Card.Title>
        <MediaQuery maxWidth={800}>
          <Dropdown
            className="pageHeaderDrop"
            style={{ alignSelf: "center", float: "left" }}
          >
            <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>

            <Dropdown.Menu size="sm" title="">
              <Dropdown.Header>עוד</Dropdown.Header>
              <Dropdown.Item
                onClick={() => setEditMode((x) => !x)}
                // disabled={props.editdisabled}
                // onClick={editHandler}
                href=""
              >
                <FaPencilAlt style={{ padding: "2px" }} />
                ערוך
              </Dropdown.Item>
              {/* <Dropdown.Item onClick={shareHandler} href="">
                שתף
              </Dropdown.Item> */}
              {/* <Dropdown.Item href=''>
								<FaPrint style={{ padding: '2px' }} />
								הדפס
							</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </MediaQuery>
      </Card.Header>

      <Card.Body style={{ alignItems: "center" }}>
        {/* <Form>
          {dataArray.map((x) => (
            <UpdateFormComponent
              editMode={editMode}
              id={id}
              key={id}
              name={x.name}
              data={x.data}
              dataBase={x.dataBase}
              dontEdit={x.dontEdit || false}
            />
          ))}
        </Form> */}
      </Card.Body>
    </Card>
  );
}

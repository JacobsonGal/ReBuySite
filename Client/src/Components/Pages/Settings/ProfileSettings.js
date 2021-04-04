import React, { useState } from "react";
import { useIntl } from "react-intl";
import MediaQuery from "react-responsive";
import { Form, Card, Dropdown } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";

export default function ProfileSetting({ title, setTitle }) {
  const userData = null;
  const Admin = userData ? userData["Admin"] : true;

  return (
    <>
      {Admin ? (
        <iframe
          src="http://localhost:4200"
          title="Admin"
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <Card className="userSettings">
          {/* <Card.Header className="userHeader">
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
							</Dropdown.Item> 
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
        </Form> 
          </Card.Body>
        */}
        </Card>
      )}
    </>
  );
}

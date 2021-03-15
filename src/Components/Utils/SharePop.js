import React, { useEffect, useState } from "react";
import { Container, Accordion, Button, Card, Form } from "react-bootstrap";

import Row from "react-bootstrap/Row";
import Column from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";

import MediaQuery from "react-responsive";
import { addContact, shereContact } from "../Database/Airtable";
import { ImWhatsapp, ImMail2 } from "react-icons/im";
import { TiMessages } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../Redux/actions/userDataActions";
import Spinner from "react-bootstrap/Spinner";
import Avatar from "@material-ui/core/Avatar";
import AvatarIcon from "../Assets/Yavo App avatar.png";
import backIcon from "../Assets/down-arrow-black.svg";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
export default function Share({ family, quitPopUp }) {
  const [contactState, setContactState] = useState({});
  const [asyncMessage, setAsyncMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shareRecords, setShareRecords] = useState([]);
  const userData = useSelector((state) => state.airTableData.userData);
  const recordsToShere = useSelector((state) => state.general.addShere);
  const [share, setShare] = useState(false);
  const [error, setError] = useState(false);
  const contacts = userData ? userData[0].fields["Contacts"] : "";
  const cName = userData ? userData[0].fields["cName"] : "";
  const cEmail = userData ? userData[0].fields["cEmail"] : "";
  const cPhone = userData ? userData[0].fields["cPhone"] : "";
  const [color, setColor] = useState("#bdbdbd");
  const [isPlatformLoading, setIsPlatformLoading] = useState(false);
  const [sendShereHandlerError, setSendShereHandlerError] = useState(false);
  const [newShare, setNewShare] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (shareRecords.length) {
      setShare(true);
    } else {
      setShare(false);
    }
  }, [shareRecords]);

  const sendShereHandler = async (platform) => {
    if (isPlatformLoading !== false) return;
    setIsPlatformLoading(platform);
    let body = {
      table:
        Object.keys(recordsToShere)[0] === "Symptoms"
          ? "Symptom"
          : Object.keys(recordsToShere)[0],
      contact: shareRecords[0],
      shereArray: Object.values(recordsToShere)[0],
    };
    const res = await shereContact(body);
    console.log(res);
    setIsPlatformLoading(false);
    if (!res.id) {
      setSendShereHandlerError(true);
      return;
    }
    const link = res.id["result_url"];
    if (platform === "wa") {
      const contactPhone = cPhone[contacts.indexOf(shareRecords[0])];
      window.location.href = `https://wa.me/972${contactPhone}?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%A8%D7%A6%D7%99%D7%AA%D7%99%20%D7%9C%D7%A9%D7%AA%D7%A3%20%D7%90%D7%95%D7%AA%D7%9A%20%D7%91%D7%9E%D7%99%D7%93%D7%A2%20%D7%94%D7%90%D7%99%D7%A9%D7%99%20%D7%A9%D7%9C%D7%99%20%D7%A9%D7%99%D7%A9%20%D7%9C%D7%99%20%D7%91%20YAVO%20%3A%0A${link}`;
    } else if (platform === "email") {
      const contactEmail = cEmail[contacts.indexOf(shareRecords[0])];

      window.location.href = `mailto:${contactEmail}?subject=YAVO&body=text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%A8%D7%A6%D7%99%D7%AA%D7%99%20%D7%9C%D7%A9%D7%AA%D7%A3%20%D7%90%D7%95%D7%AA%D7%9A%20%D7%91%D7%9E%D7%99%D7%93%D7%A2%20%D7%94%D7%90%D7%99%D7%A9%D7%99%20%D7%A9%D7%9C%D7%99%20%D7%A9%D7%99%D7%A9%20%D7%9C%D7%99%20%D7%91%20YAVO%20%3A%0A${link}`;
    } else if (platform === "sms") {
      const contactPhone = cPhone[contacts.indexOf(shareRecords[0])];
      window.open(
        `sms:972${contactPhone}&body=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%A8%D7%A6%D7%99%D7%AA%D7%99%20%D7%9C%D7%A9%D7%AA%D7%A3%20%D7%90%D7%95%D7%AA%D7%9A%20%D7%91%D7%9E%D7%99%D7%93%D7%A2%20%D7%94%D7%90%D7%99%D7%A9%D7%99%20%D7%A9%D7%9C%D7%99%20%D7%A9%D7%99%D7%A9%20%D7%9C%D7%99%20%D7%91%20YAVO%20%3A%0A${link}`
      );
    }
  };

  return (
    <Container
      style={{
        textAlign: "center",
        alignItems: "center",
        width: "100%",
        overflow: "scroll",
        maxHeight: "90vh",
      }}
    >
      {!newShare && !family && (
        <React.Fragment>
          <div
            style={{
              position: "absolute",
              transform: "rotate(\n-90deg\n)",
              top: "25px",
              right: "25px",
            }}
            onClick={() => quitPopUp()}
          >
            <CloseIcon style={{ cursor: "pointer", fontSize: "2rem" }} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              marginBottom: "3rem",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: "1.5rem",
                paddingTop: "30px",
              }}
            >
              שתפו עם איש קשר
            </span>
            <span>עדכנו גורם מטפל או בן משפחה במידע</span>
          </div>
          <div
            style={{
              color: "gray",
              textAlign: "right",
              opacity: "0.8",
              marginBottom: "10px",
              marginRight: "25px",
            }}
          >
            <span>את מי תרצו לשתף?</span>
          </div>
          <Row
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginBottom: "20px",
              width: "100%",
              marginRight: "0",
              marginLeft: "0",
              alignItems: "center",
              textAlign: "center",
              overflowX: "scroll",
            }}
          >
            {cName &&
              cName.map((x, i) => (
                <div>
                  <MediaQuery maxWidth={800}>
                    <Avatar
                      style={{ margin: "auto" }}
                      onClick={(e) => {
                        if (shareRecords.length < 1) {
                          if (!shareRecords.includes(contacts[i])) {
                            setShareRecords((previousState) => [
                              ...previousState,
                              contacts[i],
                            ]);
                            {
                              shareRecords.length > 0
                                ? setShare(true)
                                : setShare(false);
                            }

                            e.target.style.backgroundColor = "#336699";
                          }
                        } else {
                          if (shareRecords.length == 1) {
                            setError(true);
                          }
                          if (shareRecords.includes(contacts[i])) {
                            setError(false);
                          }

                          const newshareRecords = shareRecords.filter(
                            (y) => y !== contacts[i]
                          );
                          setShareRecords(newshareRecords);
                          e.target.style.backgroundColor = color;
                          {
                            shareRecords.length > 0
                              ? setShare(true)
                              : setShare(false);
                          }
                          if (shareRecords.length == 0) {
                            setError(false);
                          }
                        }

                        return;
                      }}
                    >
                      {x.split(" ")[0][0]}
                      {x.split(" ")[1][0]}
                    </Avatar>
                    <div>{x}</div>
                  </MediaQuery>
                  <MediaQuery minWidth={800}>
                    <Avatar
                      style={{ margin: "auto", cursor: "pointer" }}
                      onClick={(e) => {
                        if (shareRecords.length < 1) {
                          if (!shareRecords.includes(contacts[i])) {
                            setShareRecords((previousState) => [
                              ...previousState,
                              contacts[i],
                            ]);
                            {
                              shareRecords.length > 0
                                ? setShare(true)
                                : setShare(false);
                            }

                            e.target.style.backgroundColor = "#336699";
                          }
                        } else {
                          if (shareRecords.length == 1) {
                            setError(true);
                          }
                          if (shareRecords.includes(contacts[i])) {
                            setError(false);
                          }

                          const newshareRecords = shareRecords.filter(
                            (y) => y !== contacts[i]
                          );
                          setShareRecords(newshareRecords);
                          e.target.style.backgroundColor = color;
                          {
                            shareRecords.length > 0
                              ? setShare(true)
                              : setShare(false);
                          }
                          if (shareRecords.length == 0) {
                            setError(false);
                          }
                        }

                        return;
                      }}
                    >
                      <img
                        src={AvatarIcon}
                        alt="avatar"
                        style={{ width: "100%", padding: "3px" }}
                      />
                    </Avatar>
                    <div>{x.split(" ")[0].toUpperCase()}</div>
                  </MediaQuery>
                </div>
              ))}
          </Row>{" "}
          {error && (
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <span style={{ color: "red" }}>
                *ניתן לשתף רק איש קשר אחד בכל פעם{" "}
              </span>
            </Row>
          )}
          {sendShereHandlerError && (
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <span style={{ color: "red" }}>קרת שגיאה</span>
            </Row>
          )}
          {share && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* <span style={{ width: "100%", textAlign: "right" }}>
                שתף באמצעות{" "}
              </span> */}
              <div
                style={{
                  color: "gray",
                  textAlign: "right",
                  opacity: "0.8",
                  marginBottom: "10px",
                  width: "85%",
                  // marginRight: "25px",
                }}
              >
                <span style={{ width: "100%", textAlign: "right" }}>
                  שתף באמצעות
                </span>
              </div>
              <Row
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Column>
                  <a onClick={() => sendShereHandler("wa")}>
                    <MediaQuery maxWidth={800}>
                      {" "}
                      <div
                        style={{
                          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                          borderRadius: "100px",
                          // padding: "10px",
                          color: "green",
                          margin: "0px",
                          width: "2rem",
                          height: "2rem",
                        }}
                      >
                        {isPlatformLoading !== "wa" ? (
                          <ImWhatsapp size="2rem" color="green" />
                        ) : (
                          <Spinner
                            style={{ fontSize: "1rem" }}
                            as="span"
                            animation="border"
                            role="status"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </MediaQuery>
                    <MediaQuery minWidth={800}>
                      <div
                        style={{
                          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                          borderRadius: "100px",
                          padding: "10px",
                          // width: "fit-content",
                          color: "green",
                          margin: "0px",
                        }}
                      >
                        {isPlatformLoading !== "wa" ? (
                          <ImWhatsapp size="2rem" color="green" />
                        ) : (
                          <Spinner
                            style={{ fontSize: "1rem" }}
                            as="span"
                            animation="border"
                            role="status"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </MediaQuery>
                  </a>
                </Column>
                <Column>
                  <MediaQuery maxWidth={800}>
                    <div
                      style={{
                        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                        borderRadius: "100px",
                        // padding: "10px",
                        color: "green",
                        margin: "0px",
                        width: "2rem",
                        height: "2rem",
                      }}
                    >
                      {isPlatformLoading !== "email" ? (
                        <ImMail2 size="2rem" color="blue" />
                      ) : (
                        <Spinner
                          style={{ fontSize: "1rem" }}
                          as="span"
                          animation="border"
                          role="status"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </MediaQuery>
                  <MediaQuery minWidth={800}>
                    <div
                      style={{
                        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                        borderRadius: "100px",
                        padding: "10px",
                        // width: "fit-content",
                        color: "blue",
                        margin: "0px",
                      }}
                    >
                      {isPlatformLoading !== "email" ? (
                        <ImMail2 size="2rem" color="blue" />
                      ) : (
                        <Spinner
                          style={{ fontSize: "1rem" }}
                          as="span"
                          animation="border"
                          role="status"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </MediaQuery>
                </Column>
                <Column>
                  <MediaQuery maxWidth={800}>
                    <div
                      style={{
                        // boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                        borderRadius: "100px",
                        // padding: "10px",
                        color: "green",
                        margin: "0px",
                        width: "2rem",
                        height: "2rem",
                      }}
                    >
                      {isPlatformLoading !== "sms" ? (
                        <TiMessages size="2rem" color="red" />
                      ) : (
                        <Spinner
                          style={{ fontSize: "1rem" }}
                          as="span"
                          animation="border"
                          role="status"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </MediaQuery>
                  <MediaQuery minWidth={800}>
                    <div
                      style={{
                        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                        borderRadius: "100px",
                        padding: "10px",
                        // width: "fit-content",
                        color: "red",
                        margin: "0px",
                      }}
                    >
                      {isPlatformLoading !== "sms" ? (
                        <TiMessages size="2rem" color="red" />
                      ) : (
                        <Spinner
                          style={{ fontSize: "1rem" }}
                          as="span"
                          animation="border"
                          role="status"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </MediaQuery>
                </Column>
              </Row>{" "}
            </div>
          )}
          <Row
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyConent: "center",
              margin: "30px",
            }}
          >
            <h2 style={{ fontSize: "3rem" }}>- או -</h2>
            <span
              onClick={() => setNewShare((prev) => !prev)}
              style={{
                cursor: "pointer",
                width: "60px",
                height: "60px",
                backgroundColor: "#DDDDDD",
                color: "#626F7A",
                borderRadius: "50%",
                fontSize: "2.5rem",
              }}
            >
              +
            </span>
            <span>הוסף איש קשר חדש</span>
          </Row>
        </React.Fragment>
      )}
      {(family || newShare) && (
        <React.Fragment>
          <div
            style={{
              position: "absolute",
              transform: "rotate(\n-90deg\n)",
              top: "25px",
              right: "25px",
            }}
            onClick={() => setNewShare(false)}
          >
            <ArrowBackIosIcon
              style={{
                transform: "rotate(-90deg)",
                fontSize: "2rem",
              }}
            />
          </div>
          <Row
            style={{
              width: "100%",
              marginBottom: "10px",
              marginTop: "15px",
              marginRight: "0",
              marginLeft: "0",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                marginBottom: "3rem",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "1.5rem",
                  paddingTop: "30px",
                }}
              >
                הוספת איש קשר חדש
              </span>
              <span
                style={{ textAlign: "center", color: "gray", opacity: "0.8" }}
              >
                הוסיפו גורם מטפל או איש משפחה מלווה ושתפו אותו במידע חשוב בלחיצת
                כפתור
              </span>
            </div>

            <Form
              onSubmit={(e) => {
                e.preventDefault();

                (async () => {
                  setIsLoading(true);
                  const respAddContact = await addContact({
                    contactData: {
                      ...contactState,
                    },
                  });

                  setIsLoading(false);
                  if (respAddContact.id) {
                    dispatch(fetchUserData());
                    const url = new URL(window.location.href);
                    window.location.href = url.searchParams.get("sherepop")
                      ? "window.location.href"
                      : `${window.location.href}?sherepop=true`;
                    setAsyncMessage("הפרטים עודכנו בהצלחה");
                    setContactState({});
                    setAsyncMessage("");
                    //	setNewShare((prev) => !prev);
                  } else {
                    setAsyncMessage("קרתה שגיאה");
                  }
                })();
              }}
              style={{ margin: "auto", width: "90%" }}
            >
              <Form.Group>
                <Form.Control
                  style={{ padding: "1.7rem 0.75rem" }}
                  required
                  onChange={(e) => {
                    setContactState((x) => {
                      return x === ""
                        ? null
                        : { ...x, "First Name": e.target.value };
                    });
                  }}
                  type="name"
                  placeholder="שם פרטי"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  style={{ padding: "1.7rem 0.75rem" }}
                  required
                  onChange={(e) => {
                    setContactState((x) => {
                      return x === ""
                        ? null
                        : { ...x, "Last Name": e.target.value };
                    });
                  }}
                  type="name"
                  placeholder="שם משפחה"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  style={{ padding: "1.7rem 0.75rem" }}
                  required
                  type="email"
                  placeholder="אימייל"
                  onChange={(e) => {
                    setContactState((x) => {
                      return x === "" ? null : { ...x, Email: e.target.value };
                    });
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  style={{ padding: "1.7rem 0.75rem" }}
                  required
                  placeholder="מספר טלפון "
                  onChange={(e) => {
                    setContactState((x) => {
                      return x === "" ? null : { ...x, Phone: e.target.value };
                    });
                  }}
                />
              </Form.Group>
              <Button
                style={{
                  backgroundColor: "#270458",
                  width: "100%",
                  borderColor: "none",
                  padding: "20px",
                }}
                type="submit"
              >
                {!isLoading ? (
                  "הוסף איש קשר "
                ) : (
                  <Spinner
                    style={{ fontSize: "1rem" }}
                    as="span"
                    animation="border"
                    role="status"
                    aria-hidden="true"
                  />
                )}
              </Button>
              {asyncMessage ? (
                <p
                  style={{
                    color:
                      asyncMessage === "הפרטים עודכנו בהצלחה" ? "green" : "red",
                  }}
                >
                  {asyncMessage}
                </p>
              ) : null}
            </Form>
          </Row>
        </React.Fragment>
      )}
    </Container>
  );
}

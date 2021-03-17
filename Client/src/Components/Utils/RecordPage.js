import React, { useState, useParams, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../Redux/actions/userDataActions";
import backIcon from "../Assets/back.svg";
import Dropdown from "react-bootstrap/Dropdown";
import { HiDotsVertical } from "react-icons/hi";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { updateData } from "../Database/Airtable";
import {
  updateSnackbar,
  updateAddShere,
} from "../Redux/actions/generalActions";
import { reduxUpdateData } from "../Redux/actions/userDataActions";
import Avatar from "@material-ui/core/Avatar";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import arrow from "../Assets/down-arrow-black.svg";
import Share from "./Share";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ShareIcon from "@material-ui/icons/Share";
import { css, cx } from "@emotion/css";
import remindersLogo from "../Assets/SVG/check.svg";
import symptomLogo from "../Assets/SVG/pain.svg";
import medicalCaseLogo from "../Assets/SVG/medicine.svg";
import expensesLogo from "../Assets/SVG/account.svg";
import appointmentsLogo from "../Assets/SVG/calendar.svg";
import medicalCenters from "../Components/Pages/Appointments/medicalCenters";
import AvatarIcon from "../Assets/Yavo App avatar.png";
import Plus from "../Assets/plus copy.svg";

import _ from "lodash";

const RecordPage = ({ type }) => {
  const [json] = useState(typeToJson(type));
  const [record, setRecord] = useState(false);
  const [inputRecord, setInputRecord] = useState(false);
  const [popEdit, setPopEdit] = useState(false);
  const [filesModal, setFilesModal] = useState(false);
  const [imageData, setImageData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [shareRecords, setShareRecords] = useState([]);
  const dispatch = useDispatch();
  const updateAddShereHandler = (arr) => {
    dispatch(updateAddShere(arr));
  };

  useEffect(() => {
    let obj = {};
    obj[type] = shareRecords;
    updateAddShereHandler(obj);
  }, [shareRecords]);
  const history = useHistory();
  const [id, setId] = useState(
    !window.location.href.includes("?")
      ? window.location.href.split(
          `${type.toLowerCase().replaceAll(" ", "")}/record/`
        )[1]
      : window.location.href
          .split(`${type.toLowerCase().replaceAll(" ", "")}/record/`)[1]
          .split("?")[0]
  );
  const typeData = useSelector((state) => state.airTableData[type]);
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("sherepop")) {
      setModalIsOpen(true);
    }
  }, []);
  useEffect(() => {
    if (!typeData) {
      dispatch(fetchData(type));
    } else {
      setRecord(
        typeData.find((x) => {
          return x.id === id;
        })?.fields
      );
    }
    if (record) {
      setShareRecords([record.ID]);
      setInputRecord(record);
      if (
        window.location.href.includes("?") &&
        !window.location.href.includes("?sherepop")
      ) {
        setPopEdit(
          window.location.href.split("reminders/record/")[1].split("?")[0]
        );
      }
    }
  }, [dispatch, fetchData, record, typeData]);

  const FirstspanCss = {
    display: "inline-block",
    fontWeight: "500",
    textAlign: "right",
    width: "30%",
  };
  const SecSpanCss = {
    display: "inline-block",
    width: "70%",
    textAlign: "center",
  };
  const filesHandler = () => {
    setFilesModal(true);
  };
  const quitFilesPopUp = () => {
    setFilesModal(false);
  };
  const editHandler = () => {
    setPopEdit((prev) => !prev);
  };
  const updateHandler = async () => {
    setIsLoading(true);
    if (_.isEqual(record, inputRecord)) {
      setIsLoading(false);
      dispatch(updateSnackbar("noChange"));
      return;
    }
    const inputRecordfilterd = _.pickBy(inputRecord, function (value, key) {
      return (
        /* בודק האם האם השדה באובייקט של הרשומה ניתנת לעדכון*/ key ===
          json.title ||
        json.fields.some((x) => x.key === key && !x.noEdit) ||
        key === "Comments"
      );
    });
    const res = await updateData(type, inputRecordfilterd, record.ID);
    if (res.id) {
      setRecord(res.fields);
      setIsLoading(false);
      //success
      dispatch(updateSnackbar("success"));

      dispatch(reduxUpdateData(type, res));
      setPopEdit(false);
    } else {
      setIsLoading(false);
      dispatch(updateSnackbar("error"));
    }
  };
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{ marginLeft: "10px" }}
    >
      <HiDotsVertical size="2rem" color="#848484" />
      {children}
    </a>
  ));

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "5px",
          backgroundColor: "#e7fcfc",
          height: "80px",
        }}
      >
        <div style={{ alignSelf: "center" }} onClick={() => history.goBack()}>
          <img
            style={{ marginRight: "20px", cursor: "pointer", width: "1rem" }}
            src={backIcon}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "70%",
            margin: "auto",
          }}
        >
          <img
            src={json.logo}
            alt="img"
            style={{
              width: "3rem",
              height: "3rem",
            }}
          />
        </div>
        <Dropdown style={{ alignSelf: "center" }} className="pageHeaderDrop">
          <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
          <Dropdown.Menu size="lg" title="">
            <Dropdown.Item
              className={css`
                ${CssDropdownItem()}
              `}
              onClick={editHandler}
            >
              עריכה
            </Dropdown.Item>
            <Dropdown.Item
              className={css`
                ${CssDropdownItem()}
              `}
              onClick={() => setModalIsOpen(true)}
            >
              שתף
            </Dropdown.Item>

            <Dropdown.Item
              className={css`
                ${CssDropdownItem()}
              `}
              style={{ textAlign: "center" }}
            >
              הדפס
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {record ? (
        <div style={{ margin: "0 15px" }}>
          {popEdit ? (
            <div
              className={css`
                ${CssTitle()}
              `}
            >
              <Button
                onClick={() => setPopEdit(false)}
                variant="outline-danger"
              >
                ביטול
              </Button>{" "}
              <Button onClick={updateHandler} variant="outline-success">
                {!isLoading ? (
                  "עדכן"
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
            </div>
          ) : null}
          {!popEdit ? (
            <span
              className={css`
                ${CssTitle()}
              `}
            >
              {record[json.title]}
            </span>
          ) : (
            <div
              className={css`
                ${CssTitle()}
              `}
            >
              <input
                onChange={(e) => {
                  let obj = {};
                  obj[json.title] = e.target.value;
                  setInputRecord((prev) => ({ ...prev, ...obj }));
                }}
                value={inputRecord[json.title]}
                className={css`
                  width: 15rem;
                  text-align: center;
                `}
              />
            </div>
          )}
          {json.fields.map((x, i) =>
            !popEdit ||
            x.noEdit /*בודק האם זה לא במצב עריכה או שלא נועד לעריכה */ ? (
              <div style={{ display: "block", marginBottom: "15px" }}>
                <span style={FirstspanCss}>{x.label}:</span>
                <span style={SecSpanCss}>{fromatingDataCheck(x, record)}</span>
              </div>
            ) : x.type !==
              "DateAndTime" /* בודק שזה לא מצב עריכה שצריך להתפצל לשתי שדות של זמן ותאריך*/ ? (
              !x.options /*בודק שאין אפשרויות*/ ? (
                <div style={{ display: "block", marginBottom: "15px" }}>
                  <span style={FirstspanCss}>{x.label}:</span>
                  <input
                    onChange={(e) => {
                      let obj = {};
                      obj[x.key] = e.target.value;
                      setInputRecord((prev) => ({ ...prev, ...obj }));
                    }}
                    type={x.inputType}
                    style={SecSpanCss}
                    value={inputRecord[x.key]}
                  ></input>
                </div>
              ) : (
                /* יש אפשרויות*/
                <div style={{ display: "block", marginBottom: "15px" }}>
                  <span style={FirstspanCss}>{x.label}:</span>
                  <select
                    onChange={(e) => {
                      let obj = {};
                      obj[x.key] = e.target.value;
                      setInputRecord((prev) => ({ ...prev, ...obj }));
                    }}
                    style={SecSpanCss}
                    value={inputRecord[x.key]}
                    name="options"
                  >
                    {x.options.map((x) => (
                      <option value={x}>{x}</option>
                    ))}
                  </select>
                </div>
              )
            ) : (
              /* במצב שהשדה תאריך וצריך לפצל אותו לתאריך ושעה*/
              <div style={{ display: "block", marginBottom: "15px" }}>
                <span style={FirstspanCss}>{x.label}:</span>
                <input
                  onChange={(e) => {
                    let obj = {};
                    obj[x.key] =
                      inputRecord[x.key].split("T")[0] + "T" + e.target.value;
                    setInputRecord((prev) => ({ ...prev, ...obj }));
                  }}
                  type={`time`}
                  className={css`
                    width: 25%;
                    text-align: center;
                  `}
                  value={inputRecord[x.key].split("T")[1].split("0Z")[0]}
                ></input>
                <input
                  onChange={(e) => {
                    let obj = {};
                    obj[x.key] =
                      e.target.value + "T" + inputRecord[x.key].split("T")[1];
                    setInputRecord((prev) => ({ ...prev, ...obj }));
                  }}
                  type={`date`}
                  className={css`
                    width: 45%;
                    text-align: center;
                  `}
                  value={inputRecord[x.key].split("T")[0]}
                ></input>
              </div>
            )
          )}

          <div style={{ display: "block", marginBottom: "15px" }}>
            <span
              style={{
                display: "inline-block",
                fontWeight: "500",
                textAlign: "right",
                width: "100%",
                marginBottom: "10px",
              }}
            >
              קבצים מצורפים:
            </span>
            <span
              style={{
                backgroundColor: "white",
                padding: "20px 40px",
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              {record.Files
                ? record.Files.map((file) => (
                    <img
                      onClick={() => {
                        filesHandler();
                        setImageData(file.url);
                      }}
                      style={{
                        width: "70px",
                        height: "70px",
                        border: "1px solid gray",
                        cursor: "pointer",
                      }}
                      src={file.url}
                    />
                  ))
                : "לא הועלו עדיין קבצים"}
              <Modal
                isOpen={filesModal}
                onRequestClose={quitFilesPopUp}
                style={{
                  overlay: {},
                  content: {
                    background: "rgb(255,255,255)",
                    overflow: "scroll",
                    height: "fit-content",
                    // width: "60%",
                    padding: "0",
                    margin: "50px auto",
                    borderRadius: "15px",
                    boxShadow: "1px 1px 10px 1px #e5eefa",
                  },
                }}
              >
                <ShareIcon
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "0.5rem",
                    top: "0.4rem",
                  }}
                  onClick={() => {
                    setModalIsOpen(true);
                    quitFilesPopUp();
                  }}
                />
                <CloseIcon
                  className="quit-icon"
                  fontSize="large"
                  onClick={() => {
                    quitFilesPopUp();
                  }}
                />
                <img
                  src={imageData}
                  style={{
                    width: "100%",
                    // height: "100%",
                    paddingRight: "25px",
                    paddingLeft: "25px",
                    paddingBottom: "25px",
                  }}
                />
              </Modal>
            </span>
          </div>
          <div style={{ display: "block", marginBottom: "15px" }}>
            <span
              style={{
                float: "right",
                display: "inline-block",
                fontWeight: "500",
                textAlign: "right",
                marginBottom: "10px",
                width: "30%",
              }}
            >
              הערות:
            </span>
            {!popEdit ? (
              <span style={SecSpanCss}>
                {record.Comments && "לא הוספת הערות"}
              </span>
            ) : (
              <textarea
                onChange={(e) => {
                  setInputRecord((prev) => ({
                    ...prev,
                    Comments: e.target.value,
                  }));
                }}
                value={inputRecord.Comments}
                style={{
                  display: "inline-block",
                  width: "100%",
                  height: "150px",
                  textAlign: "right",
                }}
              ></textarea>
            )}
          </div>
          {/*  <div style={{ display: "block", marginBottom: "15px" }}>
            <span
              style={{
                display: "inline-block",
                fontWeight: "500",
                textAlign: "right",
                width: "100%",
                marginBottom: "10px",
              }}
            >
              שותף עם:
            </span>
            <span
              style={
                (SecSpanCss,
                {
                  textAlign: "right",
                })
              }
            >
              {record["Full Name (from Contacts)"]
                ? record["Full Name (from Contacts)"].map((contact) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <div>{contact}</div>
                      <Avatar style={{ marginBottom: "5px" }}>
                        {contact.split(" ")[0][0]}
                        {contact.split(" ")[1][0]}
                      </Avatar>
                    </div>
                  ))
                : "הרשומה לא שותפה עם אחרים"}
            </span>
          </div> */}

          <Card style={{ width: "100%" }}>
            <Card.Body>
              {record["Created (from Contacts Comments)"] ? (
                <Card.Title>
                  {" "}
                  אנשי קשר משותפים({record["Contacts"].length})
                </Card.Title>
              ) : (
                <Card.Title> אין אנשי קשר משותפים</Card.Title>
              )}

              {record["Full Name (from Contacts)"]
                ? record["Full Name (from Contacts)"].map((x, i) => (
                    <Accordion>
                      <React.Fragment>
                        <Accordion.Toggle
                          as={Card.Body}
                          onClick={() => {
                            setRotate((prev) =>
                              prev === false ? i : prev === i ? false : i
                            );
                          }}
                          eventKey={i + 1}
                          style={{ width: "100%" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <Avatar style={{ marginBottom: "5px" }}>
                                {x.split(" ")[0][0]}
                                {x.split(" ")[1][0]}
                              </Avatar>
                              <div style={{ flexDirection: "column" }}>
                                <Card.Subtitle
                                  className="mb-2"
                                  style={{ color: "black !imporant" }}
                                >
                                  {x.split(" ")[0]} {x.split(" ")[1]}
                                </Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">
                                  {/* <small>
																		{record[
																			'Created (from Contacts Comments)'
																		] &&
																			formatTimeHour(
																				record[
																					'Created (from Contacts Comments)'
																				][i]
																			)}
																	</small>{' '}
																	{record['Comment (from Contacts Comments)'][
																		i
																	] && (
																		<small
																			style={{ color: 'rgba(0,0,255,0.4)' }}
																		>
																			(View)
																		</small>
																	)} */}
                                </Card.Subtitle>
                              </div>
                            </div>

                            <img
                              src={arrow}
                              alt="arrow"
                              style={{
                                width: "20px",
                                height: "20px",

                                transform:
                                  rotate === false
                                    ? false
                                    : rotate === i
                                    ? "rotate(180deg)"
                                    : false,
                              }}
                            />
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={i + 1}>
                          <Card.Body>
                            <Card.Text
                              style={{
                                borderBottom: "rgba(0, 0, 0, 0.3) 1px solid",
                                padding: "3px",
                              }}
                            >
                              {record["Comment (from Contacts Comments)"] &&
                                record["Comment (from Contacts Comments)"][i]}
                            </Card.Text>
                            <TextField
                              id="outlined-primary"
                              placeholder="הוסף תגובה"
                              fullWidth
                              // onSubmit={(e) => {
                              //   e.preventDefault();
                              //   clickHandler();
                              // }}
                              size="small"
                              // onChange={changeHandler}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment
                                    className="search_icon"
                                    // onClick={clickHandler}
                                    size="small"
                                    style={{
                                      color: "#fff",
                                      padding: "20px",
                                      margin: "0",
                                      backgroundColor: "#14E6BE",
                                      borderRadius: "5px 0px 0px 5px",
                                    }}
                                    position="end"
                                  >
                                    שלח
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              // className={classes.TextField}
                            />
                          </Card.Body>
                        </Accordion.Collapse>
                      </React.Fragment>
                    </Accordion>
                  ))
                : null}
              {/* <Button
                onClick={() => setModalIsOpen(true)}
                styles={{
                  backgroundColor: "#343799",
                  alignSelf: "center",
                  borderRadius: "35px",
                }}
                variant="secondary"
              > */}
              {/* <FaPlus color="white" size="1rem" /> */}
              <div style={{ width: "100%", textAlign: "center" }}>
                <img
                  src={Plus}
                  alt="plus"
                  onClick={() => setModalIsOpen(true)}
                  style={{
                    width: "4rem",
                    height: "4rem",
                    color: "white",
                    // backgroundColor: "#cccccc",
                    padding: "10px",
                    borderRadius: "35px",
                  }}
                />
              </div>
              {/* </Button> */}
            </Card.Body>
          </Card>
        </div>
      ) : null}
      <Share modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </React.Fragment>
  );
};

export default RecordPage;

// css style utils
function CssDropdownItem() {
  return `
	width: 250px;
	height: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover {
		background-color: #007bff;
		color: white;
	}
`;
}

function CssTitle() {
  return `
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;
	margin-top: 7px;
`;
}

// utils functions
function formatTime(name) {
  if (name) {
    return name.split("T")[0].split("-").reverse().join("-");
  } else {
    return name;
  }
}
function formatTimeHour(name) {
  if (name) {
    return (
      name.split("T")[0].split("-").reverse().join("-") +
      " | " +
      name.match(/\d+:\d+/)[0]
    );
  } else {
    return name;
  }
}

function fromatingDataCheck(x, record) {
  // בודק האם צריך להציג את הדאטה באופן מיוחד
  if (x.type === "Date") {
    return formatTime(record[x.key]);
  } else if (x.type === "DateAndTime") {
    return formatTimeHour(record[x.key]);
  } else {
    return record[x.key];
  }
}

function typeToJson(type) {
  if (type === "Reminders") {
    return {
      logo: remindersLogo,
      title: "Reminder Name",
      fields: [
        {
          label: "תאריך יצירה",
          key: "Created2",
          type: "Date",
          inputType: "date",
          noEdit: true,
        },
        {
          label: "תזכורת",
          key: "Reminder Date",
          type: "DateAndTime",
          inputType: "date",
        },
        {
          label: "עדיפות",
          key: "Priority",
          options: [
            "ללא עדיפות",
            "עדיפות נמוכה 🔥",
            "עדיפות בינונית 🔥🔥",
            "עדיפות גבוהה 🔥🔥🔥",
          ],
        },
        {
          label: "זמן עד לתזכורת",
          key: "Time lefts",
          type: "text",
          noEdit: true,
        },
      ],
    };
  }
  if (type === "Appointments") {
    return {
      logo: appointmentsLogo,
      title: "Appointments Type",
      fields: [
        {
          label: "תאריך בקשה",
          key: "Created2",
          type: "Date",
          inputType: "date",
          noEdit: true,
        },
        {
          label: "מרכז רפואי",
          key: "Medical Center",
          options: medicalCenters,
        },
        {
          label: "מחלקה",
          key: "Medical Unit",
          type: "text",
          inputType: "text",
        },
        {
          label: "שם רופא",
          key: "Dr name",
          type: "text",
          inputType: "text",
        },
        {
          label: "זימון עבור",
          key: "Appointments Type",
          type: "text",
        },
      ],
    };
  }
  if (type === "Medical Case") {
    return {
      logo: medicalCaseLogo,
      title: "Doc title",
      fields: [
        {
          label: "תאריך בקשה",
          key: "Created2",
          type: "Date",
          inputType: "date",
          noEdit: true,
        },
        {
          label: "יוצר המסמך",
          key: "Doc creator",
          type: "text",
          inputType: "text",
        },
        {
          label: "סוג המסמך",
          key: "Doc Type",
          options: [
            "סיכום מומחה מטפל",
            "אבחנה רפואית",
            "תרופות ומרשמים",
            "בדיקת דם",
            "אולטראסאוד",
            "MRI",
            "א.ק.ג",
            "CT/PT CT",
            "תותאות ביופסיה",
            "אחר",
          ],
        },
      ],
    };
  }
  if (type === "Medical expenses") {
    return {
      logo: expensesLogo,
      title: "Expense title",
      fields: [
        {
          label: "תאריך יצירה",
          key: "Created2",
          type: "Date",
          inputType: "date",
          noEdit: true,
        },
        {
          label: "סוג הוצאה",
          key: "Expense type",
          options: [
            "אחר",
            "מכשור וציוד רפואי",
            "הבראה לאחר ניתוח",
            "השתתפות בתשלום על הסעה באמבולנס",
            "תרופות ומרשמים",
            "בדיקה גנטית",
            "ייעוץ רפואי",
            "חוות דעת שניה",
          ],
        },
        {
          label: "סכום הוצאה",
          key: "Expense sum",
          type: "Text",
          inputType: "text",
        },
      ],
    };
  }

  if (type === "Symptom") {
    return {
      logo: symptomLogo,
      title: "title",
      fields: [
        {
          label: "תאריך יצירה",
          key: "Created2",
          type: "Date",
          inputType: "date",
          noEdit: true,
        },
        {
          label: "מתי התחיל",
          key: "time",
          type: "Date",
          inputType: "date",
        },
        {
          label: "זמן ביום",
          key: "זמן ביום",
          options: ["בוקר", "צהריים", "ערב", "לילה", "אחר הצהריים"],
        },
        {
          label: "תדירות",
          key: "Frequency",
          type: "number",
          inputType: "number",
        },
      ],
    };
  }
}

<<<<<<< HEAD
import React, { useState, useContext, useEffect } from "react";
import { AuthContext, Admins } from "../../SSO/Auth";
=======
import React, { useState } from "react";
>>>>>>> parent of 150183014 ()
import { useIntl } from "react-intl";
import MediaQuery from "react-responsive";
import { Form, Card, Dropdown } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
<<<<<<< HEAD
import Person from "@material-ui/icons/PersonRounded";
import { Avatar } from "@material-ui/core";
import api from "../../../API/API";
import CardList from "../Home/CardList";

export default function ProfileSetting({ title, setTitle }) {
  const [users, setUsers] = useState([]);
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    return async () => {
      await api.getAllUsers().then((user) => {
        setUsers(user.data.data);
      });
      await api.getAllImages().then((img) => {
        setImages(img.data.data);
      });
      await api.getAllProducts().then((products) => {
        setProducts(products.data.data);
      });
    };
  }, []);

  const intl = useIntl();
  const { currentUser } = useContext(AuthContext);
  const Admin = currentUser ? Admins(currentUser.email) : false;
  const user = users.find(
    (usr) => usr["email"] === currentUser.email.toUpperCase() && usr["image"]
  );
  const img = images.find((img) => img._id === user["image"]);
  const photo = img
    ? `data:${img["contentType"]};base64,${img["imageBase64"]}`
    : "";
  const name = currentUser
    ? currentUser.displayName
    : intl.formatMessage({ id: "welcome" });
  const email = currentUser ? currentUser.email : "Email";
=======

export default function ProfileSetting({ title, setTitle }) {
  const userData = null;
  const Admin = userData ? userData["Admin"] : true;
>>>>>>> parent of 150183014 ()

  // user && user["products"] && setUserProducts(user["products"].find((prodId) => prodId === products["image"] user["products"]);

  user &&
    user["products"] &&
    user["products"].map((id) =>
      setUserProducts((oldArray) => [
        ...oldArray,
        products.find((prod) => prod._id === id),
      ])
    );

  console.log(userProducts);
  const deleteHandler = (productId) => {
    setProducts(
      products.filter((product) => {
        return product._id !== productId.data._id;
      })
    );
  };

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
<<<<<<< HEAD
          <Card.Header className="userHeader">
            {photo ? (
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
            ) : (
              <Avatar
                style={{
                  alignSelf: window.screen.width <= 800 ? "right" : "center",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
              />
            )}
            {/* <Person className="userPhoto" /> */}
=======
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
>>>>>>> parent of 150183014 ()
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
<<<<<<< HEAD
            <h1>My Products</h1>
            {userProducts && (
              <CardList
                products={userProducts}
                images={images}
                users={users}
                from={0}
                to={products.length}
                deleteHandler={deleteHandler}
              />
            )}
=======
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
>>>>>>> parent of 150183014 ()
          </Card.Body>
        */}
        </Card>
      )}
    </>
  );
}

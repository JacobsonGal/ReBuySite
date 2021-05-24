import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import reBuy from "../../Assets/Images/ReBuyLogoBig.png";
import Modal from "react-modal";
import { IoPinOutline } from "react-icons/io5";
import Carousel from "react-bootstrap/Carousel";
import Person from "@material-ui/icons/PersonRounded";
import Pin from "@material-ui/icons/PinDropRounded";
import Phone from "@material-ui/icons/Phone";
import Chat from "@material-ui/icons/Chat";
import WhatsApp from "@material-ui/icons/WhatsApp";
import ReactWhatsapp from "react-whatsapp";
import { Link } from "react-router-dom";
import PayPal from "./PayPal";

export default function Marker({
  product,
  users,
  setIsModelOpen,
  isModelOpen,
  navigate,
}) {
  let img =
    product && product["image"]
      ? `http://localhost:3000/${product["images"][0]}`
      : reBuy;

  return (
    <div>
      {product && (
        <Modal
          style={{
            overlay: {
              zIndex: "999",
              margin: "auto",
            },
            content: {
              inset: "0px",
              height: "90%",
              width: "60%",
              direction: "rtl",
              // padding: "10px",
              margin: "auto",
              padding: "1rem",
              borderRadius: "15px",
              boxShadow: "1px 1px 5px 1px #e5eefa",
            },
          }}
          isOpen={isModelOpen}
          onRequestClose={() => setIsModelOpen(false)}
        >
          {product && (
            <Card
              style={{
                // margin: "1rem",
                // maxWidth: 300,
                // minWidth: 100,
                width: "100%",
                height: "100%",
                border: "1px solid #ececec",
                borderRadius: "15px",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              {product["photo"] && (
                <Carousel
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {product["photo"]
                    .toString()
                    .split(",")
                    .map((Image) => (
                      <Carousel.Item
                        style={{
                          width: "100%",
                          height: "20rem",
                        }}
                      >
                        <img
                          className="d-block w-100"
                          // style={{ width: "100%", height: "100%" }}
                          src={Image}
                          alt={Image}
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
              )}{" "}
              <CardActionArea
                // onClick={(e) => cardOnClickHandler(e, product["_id"])}
                // onClick={() => setIsModelOpen(true)}
                disableTouchRipple={true}
                disableRipple={true}
                // disabled={true}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {/* <p>{product["name"]}</p>    */}
                    <p
                      style={{
                        height: "3rem",
                        overflow: "scroll",
                        justifyContent: "center",
                      }}
                    >
                      {product["name"].toUpperCase()}
                    </p>
                    <p>{product["price"]}₪</p>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {users.some((user) => user._id === product["owner"]) && (
                      <div
                        style={{
                          backgroundColor: "#ececec",
                          borderRadius: "15px",
                        }}
                      >
                        <p>
                          {users
                            .find((user) => user._id === product["owner"])
                            ["name"].toUpperCase()}
                          <Person />
                        </p>

                        <p>
                          <Button>
                            <Link to="/chat" style={{ color: "blue" }}>
                              <Chat style={{ color: "#496c9e" }} />
                            </Link>
                          </Button>
                          <ReactWhatsapp
                            number={
                              "+972" +
                              users.find(
                                (user) => user._id === product["owner"]
                              )["phone"]
                            }
                            message={`היי ! הגעתי אליך דרך ReBuy ואני רוצה את המוצר הזה: ${product["name"]}`}
                            element={Button}
                          >
                            <WhatsApp style={{ color: "#128c7e" }} />
                          </ReactWhatsapp>
                          {/* <WhatsApp /> */}
                          <Button
                            href={`tel:${
                              users.find(
                                (user) => user._id === product["owner"]
                              )["phone"]
                            }`}
                          >
                            <Phone style={{ color: "#496c9e" }} />
                          </Button>
                        </p>
                      </div>
                    )}
                    <p>
                      <PayPal />
                    </p>
                    <p>Description: {product["description"]}</p>
                    <p>Condition: {product["condition"]}</p>
                    <p>Category: {product["category"]}</p>
                    <p>Address: {product["address"]}</p>
                  </Typography>
                  {navigate && (
                    <Button
                      onClick={() => {
                        navigate(product["address"], product["photo"]);
                        setIsModelOpen(false);
                      }}
                    >
                      Navigate to the Seller
                      <Pin />
                    </Button>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>

            // <Card
            //   style={{
            //     width: "20rem",
            //     height: "fit-content",
            //     border: "1px solid #ececec",
            //     borderRadius: "15px",
            //     justifyContent: "center",
            //     alignItems: "center",
            //     textAlign: "center",
            //   }}
            // >
            //   <CardActionArea>
            //     {product["images"] && images && (
            //       <Carousel>
            //         {images.map(
            //           (Image) =>
            //             product["images"].some((id) => id === Image._id) && (
            //               <Carousel.Item>
            //                 <img
            //                   style={{ width: "100%", height: "10%" }}
            //                   src={`data:${Image["contentType"]};base64,${Image["imageBase64"]}`}
            //                   alt={Image["fileName"]}
            //                 />
            //               </Carousel.Item>
            //             )
            //         )}
            //       </Carousel>
            //     )}
            //     <CardContent>
            //       <Typography gutterBottom variant="h5" component="h2">
            //         <p>{product["name"]}</p>
            //         <p>{product["price"]}</p>
            //       </Typography>
            //       <Typography variant="body2" color="textSecondary" component="p">
            //         <p>Seller:{product["ownerId"]}</p>
            //         <p>Description:{product["description"]}</p>
            //         <p>Condition:{product["condition"]}</p>
            //       </Typography>
            //     </CardContent>
            //   </CardActionArea>
            // </Card>
          )}
        </Modal>
      )}
    </div>
  );
}

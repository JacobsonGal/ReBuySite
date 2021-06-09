import React from "react";
import { Card, CardContent, Typography, Button } from "@material-ui/core";
import reBuy from "../../Assets/Images/ReBuyLogoBig.png";
import Modal from "react-modal";
import { IoPinOutline } from "react-icons/io5";
import Carousel from "react-bootstrap/Carousel";
import Person from "@material-ui/icons/PersonRounded";
import Phone from "@material-ui/icons/Phone";
import Chat from "@material-ui/icons/Chat";
import { IoClose } from "react-icons/io5";
import WhatsApp from "@material-ui/icons/WhatsApp";
import ReactWhatsapp from "react-whatsapp";
import { Link } from "react-router-dom";
import PayPal from "./PayPal";
import rebuyProduct from "../../Assets/Images/ReBuy.png";
import OpenApp from "react-open-app";
import MediaQuery from "react-responsive";

export default function Marker({
  product,
  users,
  setIsModelOpen,
  isModelOpen,
  navigate,
  wazeNavigate,
  lat,
  lng,
}) {
  let img =
    product && product["image"]
      ? `http://localhost:3000/${product["images"][0]}`
      : reBuy;

  return (
    <div>
      <MediaQuery maxWidth={800}>
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
                width: "90%",
                direction: "rtl",
                margin: "auto",
                padding: "1rem",
                borderRadius: "15px",
                boxShadow: "1px 1px 5px 1px #e5eefa",
              },
            }}
            isOpen={isModelOpen}
            onRequestClose={() => setIsModelOpen(false)}
            ariaHideApp={false}
          >
            <Button
              style={{ left: 25, zIndex: 950, position: "fixed" }}
              onClick={() => setIsModelOpen(false)}
            >
              <IoClose size="2rem" />
            </Button>
            {product && (
              <Card
                style={{
                  width: "100%",
                  height: "100%",
                  border: "1pxsolid#ececec",
                  borderRadius: "15px",
                  textAlign: "center",
                  alignItems: "center",
                  overflow: "scroll",
                }}
              >
                {product["photo"] ? (
                  <Carousel>
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
                            style={{ width: "100%", height: "100%" }}
                            src={Image}
                            alt={Image}
                          />
                        </Carousel.Item>
                      ))}
                  </Carousel>
                ) : (
                  <img
                    style={{ width: "100%", height: 200 }}
                    src={rebuyProduct}
                    alt={"rebuyProduct"}
                  />
                )}{" "}
                <CardContent>
                  <Typography>
                    <h4 style={{ font: "bold" }}>
                      {product["name"].toUpperCase()}
                    </h4>
                    <h5 style={{ color: "dodgerblue" }}>{product["price"]}₪</h5>
                    <p>{product["description"]}</p>
                    <p>
                      {product["address"]} <IoPinOutline />
                    </p>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {users &&
                      users.some((user) => user.uid === product.ownerId) && (
                        <div
                          style={{
                            backgroundColor: "#ececec",
                            borderRadius: "15px",
                          }}
                        >
                          <p>
                            {users &&
                              users
                                .find((user) => user._id === product["owner"])
                                ["name"].toUpperCase()}
                            <Person />
                          </p>

                          <p>
                            <Button>
                              <Link
                                to={`/${product["ownerId"]}/${product["description"]} / ${product["seconderyId"]}`}
                                style={{ color: "blue" }}
                              >
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
                  </Typography>
                  {navigate && (
                    <div>
                      <h4> Navigate to the Seller</h4>
                      <Button
                        onClick={() => {
                          navigate(product["address"], product["photo"]);
                          setIsModelOpen(false);
                        }}
                      >
                        <img
                          src="https://i.pinimg.com/originals/72/bd/cc/72bdccc73e35cdce6fc49a31b4f593ca.png"
                          alt="googlemap"
                          style={{ width: "7rem", height: "7rem" }}
                        />
                      </Button>
                      <OpenApp
                        href={`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`}
                        android={`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`}
                        ios={`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`}
                      >
                        <img
                          src="https://cdn-images-1.medium.com/max/1200/1*3kS1iOOTBrvtkecae3u2aA.png"
                          alt="waze"
                          style={{
                            width: "5.5rem",
                            height: "5.5rem",
                            borderRadius: "15px",
                          }}
                        />
                      </OpenApp>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </Modal>
        )}{" "}
      </MediaQuery>

      <MediaQuery minWidth={800}>
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
                width: "50%",
                direction: "rtl",
                margin: "auto",
                padding: "1rem",
                borderRadius: "15px",
                boxShadow: "1px 1px 5px 1px #e5eefa",
              },
            }}
            isOpen={isModelOpen}
            onRequestClose={() => setIsModelOpen(false)}
            ariaHideApp={false}
          >
            {product && (
              <Card
                style={{
                  width: "100%",
                  height: "100%",
                  border: "1pxsolid#ececec",
                  borderRadius: "15px",
                  textAlign: "center",
                  alignItems: "center",
                  overflow: "scroll",
                }}
              >
                {product["photo"] ? (
                  <Carousel>
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
                            style={{ width: "100%", height: "100%" }}
                            src={Image}
                            alt={Image}
                          />
                        </Carousel.Item>
                      ))}
                  </Carousel>
                ) : (
                  <img
                    style={{ width: "100%", height: 200 }}
                    src={rebuyProduct}
                    alt={"rebuyProduct"}
                  />
                )}{" "}
                <CardContent>
                  <Typography>
                    <h4 style={{ font: "bold" }}>
                      {product["name"].toUpperCase()}
                    </h4>
                    <h5 style={{ color: "dodgerblue" }}>{product["price"]}₪</h5>
                    <p>{product["description"]}</p>
                    <p>
                      {product["address"]} <IoPinOutline />
                    </p>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {users &&
                      users.some((user) => user.uid === product.ownerId) && (
                        <div
                          style={{
                            backgroundColor: "#ececec",
                            borderRadius: "15px",
                          }}
                        >
                          <p>
                            {users &&
                              users
                                .find((user) => user._id === product["owner"])
                                ["name"].toUpperCase()}
                            <Person />
                          </p>

                          <p>
                            <Button>
                              <Link
                                to={`/${product["ownerId"]}/${product["description"]} / ${product["seconderyId"]}`}
                                style={{ color: "blue" }}
                              >
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
                  </Typography>
                  {navigate && (
                    <div>
                      <h4> Navigate to the Seller</h4>
                      <Button
                        onClick={() => {
                          navigate(product["address"], product["photo"]);
                          setIsModelOpen(false);
                        }}
                      >
                        <img
                          src="https://i.pinimg.com/originals/72/bd/cc/72bdccc73e35cdce6fc49a31b4f593ca.png"
                          alt="googlemap"
                          style={{ width: "7rem", height: "7rem" }}
                        />
                      </Button>

                      <OpenApp
                        href={`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`}
                        android={`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`}
                        ios={`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`}
                      >
                        <img
                          src="https://cdn-images-1.medium.com/max/1200/1*3kS1iOOTBrvtkecae3u2aA.png"
                          alt="waze"
                          style={{
                            width: "5.5rem",
                            height: "5.5rem",
                            borderRadius: "15px",
                          }}
                        />
                      </OpenApp>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </Modal>
        )}{" "}
      </MediaQuery>
    </div>
  );
}

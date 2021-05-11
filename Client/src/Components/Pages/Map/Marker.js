import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import reBuy from "../../../Assets/Images/ReBuyLogoBig.png";
import Modal from "react-modal";
import { IoPinOutline } from "react-icons/io5";
import Carousel from "react-bootstrap/Carousel";
import PopUp from "../../Utils/PopUp";

export default function Marker({
  product,
  images,
  users,
  setIsModelOpen,
  setData,
  $hover,
}) {
  function setProduct(product) {
    setData(product);
    setIsModelOpen(true);
  }

  return (
    <div>
      <Button size="small" onClick={() => setProduct(product)}>
        {product["photo"] && images ? (
          <Carousel style={{ width: "3rem", height: "3rem" }}>
            {product["photo"]
              .toString()
              .split(",")
              .map((Image) => (
                <Carousel.Item style={{ width: "3rem", height: "3rem" }}>
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
          <img src={reBuy} alt="marker" className={"circleImg"} />
        )}
      </Button>
    </div>
  );
}
